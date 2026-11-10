import { useEffect, useState } from "react";
import { validateUser } from "../userValidation";

export default function UserForm({
  onSaveUser,
  editingUser,
  onCancelEdit,
  saving = false,
}) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setName(editingUser?.name ?? "");
    setAge(editingUser ? String(editingUser.age) : "");
    setErrors({});
  }, [editingUser]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (saving) return;

    const result = validateUser({ name, age });

    if (Object.keys(result.errors).length > 0) {
      setErrors(result.errors);
      return;
    }

    try {
      // Aguarda a operação de cadastro ou edição
      const success = await onSaveUser({
        name: result.values.name,
        age: Number(result.values.age),
      });

      // Limpa o formulário apenas após sucesso
      if (success) {
        setName("");
        setAge("");
        setErrors({});
      }
    } catch {
      // O componente App.jsx exibirá o erro da API
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="user-name" className="mb-2 block text-sm font-medium">
          Nome do usuário
        </label>

        <input
          id="user-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Ex.: Maria Silva"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "user-name-error" : undefined}
          disabled={saving}
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />

        {errors.name && (
          <p
            id="user-name-error"
            role="alert"
            className="mt-2 text-sm text-red-600"
          >
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="user-age" className="mb-2 block text-sm font-medium">
          Idade
        </label>

        <input
          id="user-age"
          type="number"
          min="0"
          step="1"
          value={age}
          onChange={(event) => setAge(event.target.value)}
          placeholder="Ex.: 25"
          aria-invalid={Boolean(errors.age)}
          aria-describedby={errors.age ? "user-age-error" : undefined}
          disabled={saving}
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />

        {errors.age && (
          <p
            id="user-age-error"
            role="alert"
            className="mt-2 text-sm text-red-600"
          >
            {errors.age}
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={saving}
          className="flex-1 rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving
            ? "Salvando..."
            : editingUser
              ? "Salvar alterações"
              : "Cadastrar usuário"}
        </button>

        {editingUser && (
          <button
            type="button"
            onClick={onCancelEdit}
            disabled={saving}
            className="rounded-lg border border-slate-300 px-4 py-3 font-medium hover:bg-slate-50 disabled:opacity-50"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

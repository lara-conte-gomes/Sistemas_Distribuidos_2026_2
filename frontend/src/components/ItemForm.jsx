import { useState } from "react";
import { validateItem } from "../validation";

export default function ItemForm({ onAddItem, saving = false }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [errors, setErrors] = useState({});

  async function handleSubmit(event) {
    event.preventDefault();

    if (saving) return;

    const result = validateItem({ name, description, quantity });

    if (Object.keys(result.errors).length > 0) {
      setErrors(result.errors);
      return;
    }

    try {
      const success = await onAddItem(result.values);

      if (success !== false) {
        setName("");
        setDescription("");
        setQuantity("1");
        setErrors({});
      }
    } catch {
      // O App.jsx é responsável por exibir erros da API.
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium">
          Nome
        </label>

        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Ex.: Notebook"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />

        {errors.name && (
          <p id="name-error" role="alert" className="mt-2 text-sm text-red-600">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="mb-2 block text-sm font-medium">
          Descrição (opcional)
        </label>

        <textarea
          id="description"
          rows={4}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Descreva o item que deseja cadastrar..."
          className="w-full resize-y rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      <div>
        <label htmlFor="quantity" className="mb-2 block text-sm font-medium">
          Quantidade
        </label>

        <input
          id="quantity"
          type="number"
          min="1"
          step="1"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
          aria-invalid={Boolean(errors.quantity)}
          aria-describedby={errors.quantity ? "quantity-error" : undefined}
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />

        {errors.quantity && (
          <p
            id="quantity-error"
            role="alert"
            className="mt-2 text-sm text-red-600"
          >
            {errors.quantity}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={saving}
        className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {saving ? "Salvando o item..." : "Adicionar item"}
      </button>
    </form>
  );
}

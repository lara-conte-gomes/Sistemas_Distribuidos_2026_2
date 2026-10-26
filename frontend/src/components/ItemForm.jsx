import { useState } from "react";
import { validateItem } from "../validation";

export default function ItemForm({ onAddItem }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  function handleSubmit(event) {
    event.preventDefault();

    const result = validateItem({ name, description });

    if (Object.keys(result.errors).length > 0) {
      setErrors(result.errors);
      return;
    }

    onAddItem(result.values);
    setName("");
    setDescription("");
    setErrors({});
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
          placeholder="Descreva o item..."
          className="w-full resize-y rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700"
      >
        Adicionar item
      </button>
    </form>
  );
}

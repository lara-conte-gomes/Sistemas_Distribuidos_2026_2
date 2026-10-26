export default function ItemList({ items, onDeleteItem }) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-12 text-center">
        <p className="font-medium text-slate-700">Nenhum item cadastrado.</p>
        <p className="mt-1 text-sm text-slate-500">
          Adicione um item para começar.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-600">
          <tr>
            <th scope="col" className="px-4 py-3 font-semibold">
              Nome
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">
              Descrição
            </th>
            <th scope="col" className="px-4 py-3 text-right font-semibold">
              Ações
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {items.map((item) => (
            <tr key={item.id}>
              <td className="px-4 py-4 font-medium">{item.name}</td>
              <td className="px-4 py-4 text-slate-500">
                {item.description || "—"}
              </td>
              <td className="px-4 py-4 text-right">
                <button
                  type="button"
                  onClick={() => onDeleteItem(item.id)}
                  aria-label={`Excluir item ${item.name}`}
                  className="rounded-lg px-3 py-2 font-medium text-red-600 hover:bg-red-50"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

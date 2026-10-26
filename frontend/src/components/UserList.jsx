export default function UserList({ users, onEditUser, onDeleteUser }) {
  if (users.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-12 text-center">
        <p className="font-medium text-slate-700">Nenhum usuário cadastrado.</p>
        <p className="mt-1 text-sm text-slate-500">
          Cadastre um usuário para começar.
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
              Idade
            </th>
            <th scope="col" className="px-4 py-3 text-right font-semibold">
              Ações
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-4 py-4 font-medium">{user.name}</td>
              <td className="px-4 py-4 text-slate-500">Idade: {user.age}</td>
              <td className="px-4 py-4">
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => onEditUser(user)}
                    aria-label={`Editar ${user.name}`}
                    className="rounded-lg px-3 py-2 font-medium text-indigo-600 hover:bg-indigo-50"
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    onClick={() => onDeleteUser(user.id)}
                    aria-label={`Excluir ${user.name}`}
                    className="rounded-lg px-3 py-2 font-medium text-red-600 hover:bg-red-50"
                  >
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import { useState } from "react";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

export default function App() {
  const [activeTab, setActiveTab] = useState("items");
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [nextUserId, setNextUserId] = useState(1);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  function showMessage(text) {
    setMessage(text);
  }

  function changeTab(tab) {
    setActiveTab(tab);
    setSearch("");
    setMessage("");
  }

  function addItem(item) {
    setItems((previous) => [...previous, { ...item, id: crypto.randomUUID() }]);
    showMessage("Item cadastrado com sucesso.");
  }

  function deleteItem(id) {
    if (!window.confirm("Deseja realmente excluir este item?")) {
      return;
    }

    setItems((previous) => previous.filter((item) => item.id !== id));
    showMessage("Item excluído com sucesso.");
  }

  function saveUser(values) {
    if (editingUser) {
      setUsers((previous) =>
        previous.map((user) =>
          user.id === editingUser.id ? { ...user, ...values } : user,
        ),
      );
      setEditingUser(null);
      showMessage("Usuário atualizado com sucesso.");
      return;
    }

    setUsers((previous) => [...previous, { id: nextUserId, ...values }]);
    setNextUserId((previous) => previous + 1);
    showMessage("Usuário cadastrado com sucesso.");
  }

  function deleteUser(id) {
    if (!window.confirm("Deseja realmente excluir este usuário?")) {
      return;
    }

    setUsers((previous) => previous.filter((user) => user.id !== id));

    if (editingUser?.id === id) {
      setEditingUser(null);
    }

    showMessage("Usuário excluído com sucesso.");
  }

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-xl font-bold text-white">
              G
            </div>
            <div>
              <p className="text-lg font-bold">Gestor</p>
              <p className="text-xs text-slate-500">Painel administrativo</p>
            </div>
          </div>

          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
            Ambiente local
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold text-indigo-600">
            VISÃO GERAL
          </p>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="mt-2 text-slate-500">
            Gerencie itens e usuários em um único lugar.
          </p>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Itens cadastrados</p>
            <p className="mt-3 text-4xl font-bold">{items.length}</p>
            <p className="mt-2 text-xs text-slate-400">
              Registros nesta sessão
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Usuários cadastrados</p>
            <p className="mt-3 text-4xl font-bold">{users.length}</p>
            <p className="mt-2 text-xs text-slate-400">
              Registros nesta sessão
            </p>
          </div>
        </div>

        <div className="mb-6 flex gap-2 border-b border-slate-200">
          <button
            type="button"
            onClick={() => changeTab("items")}
            aria-pressed={activeTab === "items"}
            className={`border-b-2 px-5 py-3 font-medium transition ${
              activeTab === "items"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            Itens
          </button>

          <button
            type="button"
            onClick={() => changeTab("users")}
            aria-pressed={activeTab === "users"}
            className={`border-b-2 px-5 py-3 font-medium transition ${
              activeTab === "users"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            Usuários
          </button>
        </div>

        {message && (
          <div
            role="status"
            className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
          >
            {message}
          </div>
        )}

        {activeTab === "items" ? (
          <section aria-label="Gerenciamento de itens">
            <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
              <div className="self-start rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-2 text-xl font-bold">Cadastro de itens</h2>
                <p className="mb-6 text-sm text-slate-500">
                  Preencha os campos para adicionar um item.
                </p>
                <ItemForm onAddItem={addItem} />
              </div>

              <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-2 text-xl font-bold">Lista de itens</h2>
                <p className="mb-5 text-sm text-slate-500">
                  Consulte e gerencie os itens cadastrados.
                </p>

                <label
                  htmlFor="item-search"
                  className="mb-2 block text-sm font-medium"
                >
                  Buscar itens
                </label>
                <input
                  id="item-search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Pesquisar pelo nome..."
                  className="mb-5 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />

                <ItemList items={filteredItems} onDeleteItem={deleteItem} />
              </div>
            </div>
          </section>
        ) : (
          <section aria-label="Gerenciamento de usuários">
            <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
              <div className="self-start rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-2 text-xl font-bold">
                  Gerenciamento de usuários
                </h2>
                <p className="mb-6 text-sm text-slate-500">
                  Cadastre ou edite um usuário.
                </p>

                <UserForm
                  onSaveUser={saveUser}
                  editingUser={editingUser}
                  onCancelEdit={() => setEditingUser(null)}
                />
              </div>

              <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-2 text-xl font-bold">Usuários cadastrados</h2>
                <p className="mb-5 text-sm text-slate-500">
                  Visualize, edite e exclua usuários.
                </p>

                <label
                  htmlFor="user-search"
                  className="mb-2 block text-sm font-medium"
                >
                  Buscar usuários
                </label>
                <input
                  id="user-search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Pesquisar pelo nome..."
                  className="mb-5 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />

                <UserList
                  users={filteredUsers}
                  onEditUser={setEditingUser}
                  onDeleteUser={deleteUser}
                />
              </div>
            </div>
          </section>
        )}

        <footer className="mt-12 border-t border-slate-200 pt-5 text-center text-xs text-slate-400">
          Sistemas Distribuídos — Prática 6 | Dados armazenados temporariamente
          no navegador
        </footer>
      </main>
    </div>
  );
}

import { useEffect, useState } from "react";

import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

import {
  createItem,
  deleteItem as deleteItemApi,
  listItems,
  updateItem,
} from "./services/items";

import {
  createUser,
  deleteUser as deleteUserApi,
  listUsers,
  updateUser,
} from "./services/users";

export default function App() {
  const [activeTab, setActiveTab] = useState("items");

  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);

  const [editingItem, setEditingItem] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const [savingItem, setSavingItem] = useState(false);
  const [savingUser, setSavingUser] = useState(false);

  const [error, setError] = useState("");
  const [userError, setUserError] = useState("");

  // Carrega os itens da API
  useEffect(() => {
    let active = true;

    async function loadItems() {
      try {
        const data = await listItems();

        if (active) {
          setItems(data);
          setError("");
        }
      } catch {
        if (active) {
          setError("Não foi possível carregar os itens.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadItems();

    return () => {
      active = false;
    };
  }, []);

  // Carrega os usuários da API
  useEffect(() => {
    let active = true;

    async function loadUsers() {
      try {
        const data = await listUsers();

        if (active) {
          setUsers(data);
          setUserError("");
        }
      } catch {
        if (active) {
          setUserError("Não foi possível carregar os usuários.");
        }
      } finally {
        if (active) {
          setLoadingUsers(false);
        }
      }
    }

    loadUsers();

    return () => {
      active = false;
    };
  }, []);

  function showMessage(text) {
    setMessage(text);
  }

  function changeTab(tab) {
    setActiveTab(tab);
    setSearch("");
    setMessage("");
  }

  // Cadastra ou atualiza um item no backend
  async function saveItem(values) {
    if (savingItem) return false;

    setSavingItem(true);
    setError("");
    setMessage("");

    try {
      const itemData = {
        name: values.name,
        description: values.description,
        quantity: Number(values.quantity),
      };

      if (editingItem) {
        await updateItem(editingItem.id, itemData);

        const updatedItems = await listItems();
        setItems(updatedItems);

        setEditingItem(null);
        showMessage("Item atualizado com sucesso.");
      } else {
        await createItem(itemData);

        const updatedItems = await listItems();
        setItems(updatedItems);

        showMessage("Item cadastrado com sucesso.");
      }

      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Não foi possível salvar o item.",
      );

      return false;
    } finally {
      setSavingItem(false);
    }
  }

  // Exclui um item do backend
  async function deleteItem(id) {
    if (savingItem) return;

    if (!window.confirm("Deseja realmente excluir este item?")) {
      return;
    }

    setSavingItem(true);
    setError("");
    setMessage("");

    try {
      await deleteItemApi(id);

      const updatedItems = await listItems();
      setItems(updatedItems);

      if (editingItem?.id === id) {
        setEditingItem(null);
      }

      showMessage("Item excluído com sucesso.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Não foi possível excluir o item.",
      );
    } finally {
      setSavingItem(false);
    }
  }

  // Cadastra ou atualiza um usuário no backend
  async function saveUser(values) {
    if (savingUser) return false;

    setSavingUser(true);
    setUserError("");
    setMessage("");

    try {
      const userData = {
        name: values.name,
        age: Number(values.age),
      };

      if (editingUser) {
        await updateUser(editingUser.id, userData);

        const updatedUsers = await listUsers();
        setUsers(updatedUsers);

        setEditingUser(null);
        showMessage("Usuário atualizado com sucesso.");
      } else {
        await createUser(userData);

        const updatedUsers = await listUsers();
        setUsers(updatedUsers);

        showMessage("Usuário cadastrado com sucesso.");
      }

      return true;
    } catch (err) {
      setUserError(
        err instanceof Error
          ? err.message
          : "Não foi possível salvar o usuário.",
      );

      return false;
    } finally {
      setSavingUser(false);
    }
  }

  // Exclui um usuário do backend
  async function deleteUser(id) {
    if (savingUser) return;

    if (!window.confirm("Deseja realmente excluir este usuário?")) {
      return;
    }

    setSavingUser(true);
    setUserError("");
    setMessage("");

    try {
      await deleteUserApi(id);

      const updatedUsers = await listUsers();
      setUsers(updatedUsers);

      if (editingUser?.id === id) {
        setEditingUser(null);
      }

      showMessage("Usuário excluído com sucesso.");
    } catch (err) {
      setUserError(
        err instanceof Error
          ? err.message
          : "Não foi possível excluir o usuário.",
      );
    } finally {
      setSavingUser(false);
    }
  }

  // Filtra os registros pelo nome
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

        {/* Indicadores */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Itens cadastrados</p>

            <p className="mt-3 text-4xl font-bold">{items.length}</p>

            <p className="mt-2 text-xs text-slate-400">
              Registros carregados da API
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Usuários cadastrados</p>

            <p className="mt-3 text-4xl font-bold">{users.length}</p>

            <p className="mt-2 text-xs text-slate-400">
              Registros carregados da API
            </p>
          </div>
        </div>

        {/* Navegação */}
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

        {/* Mensagens de sucesso */}
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
            {error && (
              <div
                role="alert"
                className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
              <div className="self-start rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-2 text-xl font-bold">
                  {editingItem ? "Editar item" : "Cadastro de itens"}
                </h2>

                <p className="mb-6 text-sm text-slate-500">
                  {editingItem
                    ? "Altere os campos para atualizar o item."
                    : "Preencha os campos para adicionar um item."}
                </p>

                <ItemForm
                  onSaveItem={saveItem}
                  editingItem={editingItem}
                  onCancelEdit={() => setEditingItem(null)}
                  saving={savingItem}
                />
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

                {loading ? (
                  <p role="status" className="text-sm text-slate-500">
                    Carregando itens...
                  </p>
                ) : (
                  <ItemList
                    items={filteredItems}
                    onEditItem={setEditingItem}
                    onDeleteItem={deleteItem}
                    saving={savingItem}
                  />
                )}
              </div>
            </div>
          </section>
        ) : (
          <section aria-label="Gerenciamento de usuários">
            {userError && (
              <div
                role="alert"
                className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {userError}
              </div>
            )}

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
                  saving={savingUser}
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

                {loadingUsers ? (
                  <p role="status" className="text-sm text-slate-500">
                    Carregando usuários...
                  </p>
                ) : (
                  <UserList
                    users={filteredUsers}
                    onEditUser={setEditingUser}
                    onDeleteUser={deleteUser}
                    saving={savingUser}
                  />
                )}
              </div>
            </div>
          </section>
        )}

        <footer className="mt-12 border-t border-slate-200 pt-5 text-center text-xs text-slate-400">
          Sistemas Distribuídos — Prática 7 | Itens e usuários integrados ao
          backend
        </footer>
      </main>
    </div>
  );
}

//imports
import { useState, useEffect } from "react";
import { LivroForm } from "./components/LivroForm";
import { RevistaForm } from "./components/RevistaForm";
import { FuncionarioForm } from "./components/FuncionarioForm";
import { LivroEstante } from "./components/LivroEstante";
import { RevistaEstante } from "./components/RevistaEstante";
import { FuncionarioCard } from "./components/FuncionarioCard";
import { listLivros, createLivro, updateLivro, deleteLivro } from "./services/livrosService";
import { listRevistas, createRevista, updateRevista, deleteRevista } from "./services/revistasService";
import { listFuncionarios, createFuncionario, updateFuncionario, deleteFuncionario } from "./services/funcionariosService";

export default function App() {
  // Definição de qual aba será selecionada
  const [tab, setTab] = useState("livros");

  // Armazenando os registros cadastrados
  const [livros, setLivros] = useState([]);
  const [revistas, setRevistas] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);

  // Guardando o texto digitado na pesquisa
  const [search, setSearch] = useState("");

  // Registro que está sendo alterado
  const [editando, setEditando] = useState(null);

  // Carregando os registros da API
  async function carregarLivros() {
    const dados = await listLivros();
    setLivros(dados);
  }

  async function carregarRevistas() {
    const dados = await listRevistas();
    setRevistas(dados);
  }

  async function carregarFuncionarios() {
    const dados = await listFuncionarios();
    setFuncionarios(dados);
  }

  // Buscando os registros ao carregar a página
  useEffect(() => {
    carregarLivros().catch(console.error);
    carregarRevistas().catch(console.error);
    carregarFuncionarios().catch(console.error);
  }, []);

  // Adicionando ou alterando um livro
  async function addLivro(livro) {
    if (editando) {
      await updateLivro(editando.id, livro);
    } else {
      await createLivro(livro);
    }

    await carregarLivros();
    setEditando(null);
  }

  // Adicionando ou alterando uma revista
  async function addRevista(revista) {
    if (editando) {
      await updateRevista(editando.id, revista);
    } else {
      await createRevista(revista);
    }

    await carregarRevistas();
    setEditando(null);
  }

  // Adicionando ou alterando um funcionário
  async function addFuncionario(funcionario) {
    if (editando) {
      await updateFuncionario(editando.id, funcionario);
    } else {
      await createFuncionario(funcionario);
    }

    await carregarFuncionarios();
    setEditando(null);
  }

  // Selecionando os registros da aba atual
  const lista =
    tab === "livros"
      ? livros
      : tab === "revistas"
        ? revistas
        : funcionarios;

  // Filtrando os registros pelo título ou nome
  const filtrados = lista.filter((item) => {
    const nome = item.titulo || item.nome || "";

    return nome
      .toLowerCase()
      .includes(search.trim().toLowerCase());
  });

  // Selecionando um registro para alteração
  function editRecord(item) {
    setEditando(item);
  }

  // Excluindo um registro da lista
  async function deleteRecord(id) {
    if (!window.confirm("Deseja excluir este registro?")) return;

    try {
      if (tab === "livros") {
        await deleteLivro(id);
        await carregarLivros();
      } else if (tab === "revistas") {
        await deleteRevista(id);
        await carregarRevistas();
      } else {
        await deleteFuncionario(id);
        await carregarFuncionarios();
      }

      if (editando?.id === id) {
        setEditando(null);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  // Trocando de aba
  function changeTab(novaTab) {
    setTab(novaTab);
    setEditando(null);
    setSearch("");
  }

  return (
    <main className="layout">
      {/* Contadores na lateral esquerda */}
      <aside className="contadores">
        <h2>Resumo</h2>

        <div className="contador">
          <h3>Livros</h3>
          <p>{livros.length}</p>
        </div>

        <div className="contador">
          <h3>Revistas</h3>
          <p>{revistas.length}</p>
        </div>

        <div className="contador">
          <h3>Funcionários</h3>
          <p>{funcionarios.length}</p>
        </div>
      </aside>

      {/* Conteúdo principal */}
      <div className="conteudo">
        <h1>Seja muito bem-vindo(a) à BookStore!</h1>

        {/* Botões para trocar de aba */}
        <nav>
          <button type="button" onClick={() => changeTab("livros")}>
            Livros
          </button>

          <button type="button" onClick={() => changeTab("revistas")}>
            Revistas
          </button>

          <button type="button" onClick={() => changeTab("funcionarios")}>
            Funcionários
          </button>
        </nav>

        {/* Formulário da aba selecionada */}
        <section>
          <h2>
            {editando
              ? `Alterar ${tab === "livros" ? "livro" : tab === "revistas" ? "revista" : "funcionário"}`
              : `Cadastrar ${tab === "livros" ? "livro" : tab === "revistas" ? "revista" : "funcionário"}`}
          </h2>

          {tab === "livros" && (
            <LivroForm
              onAdd={addLivro}
              editando={editando}
              onCancel={() => setEditando(null)}
            />
          )}

          {tab === "revistas" && (
            <RevistaForm
              onAdd={addRevista}
              editando={editando}
              onCancel={() => setEditando(null)}
            />
          )}

          {tab === "funcionarios" && (
            <FuncionarioForm
              onAdd={addFuncionario}
              editando={editando}
              onCancel={() => setEditando(null)}
            />
          )}
        </section>

        {/* Pesquisa */}
        <h2>Lista de {tab}</h2>

        <input
          placeholder="Pesquisar..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        {/* Exibindo os registros cadastrados */}
        {tab === "livros" ? (
          <section>
            <h2>Minha estante</h2>
            <LivroEstante
              livros={filtrados}
              onDelete={deleteRecord}
              onEdit={editRecord}
            />
          </section>
        ) : tab === "revistas" ? (
          <section>
            <h2>Minhas revistas</h2>
            <RevistaEstante
              revistas={filtrados}
              onDelete={deleteRecord}
              onEdit={editRecord}
            />
          </section>
        ) : (
          <section>
            <h2>Funcionários cadastrados</h2>
            <FuncionarioCard
              funcionarios={filtrados}
              onDelete={deleteRecord}
              onEdit={editRecord}
            />
          </section>
        )}
      </div>
    </main>
  );
}

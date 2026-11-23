//imports
import { useState } from "react";
import { LivroForm } from "./components/LivroForm";
import { RevistaForm } from "./components/RevistaForm";
import { FuncionarioForm } from "./components/FuncionarioForm";
import { LivroEstante } from "./components/LivroEstante";
import { RevistaEstante } from "./components/RevistaEstante";
import { FuncionarioCard } from "./components/FuncionarioCard";

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

  // Adicionando ou alterando um livro
  function addLivro(livro) {
    if (editando) {
      setLivros(livros.map((item) =>
        item.id === editando.id ? { ...livro, id: item.id } : item
      ));
    } else {
      setLivros([...livros, { ...livro, id: crypto.randomUUID() }]);
    }
    setEditando(null);
  }

  // Adicionando ou alterando uma revista
  function addRevista(revista) {
    if (editando) {
      setRevistas(revistas.map((item) =>
        item.id === editando.id ? { ...revista, id: item.id } : item
      ));
    } else {
      setRevistas([...revistas, { ...revista, id: crypto.randomUUID() }]);
    }
    setEditando(null);
  }

  // Adicionando ou alterando um funcionário
  function addFuncionario(funcionario) {
    if (editando) {
      setFuncionarios(funcionarios.map((item) =>
        item.id === editando.id ? { ...funcionario, id: item.id } : item
      ));
    } else {
      setFuncionarios([
        ...funcionarios,
        { ...funcionario, id: crypto.randomUUID() },
      ]);
    }
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
  function deleteRecord(id) {
    if (!window.confirm("Deseja excluir este registro?")) return;

    if (tab === "livros") {
      setLivros(livros.filter((livro) => livro.id !== id));
    } else if (tab === "revistas") {
      setRevistas(revistas.filter((revista) => revista.id !== id));
    } else {
      setFuncionarios(
        funcionarios.filter((funcionario) => funcionario.id !== id)
      );
    }

    if (editando?.id === id) {
      setEditando(null);
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

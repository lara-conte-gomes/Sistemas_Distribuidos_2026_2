//imports
import { useState } from "react";
import { LivroForm } from "./components/LivroForm";
import { RevistaForm } from "./components/RevistaForm";
import { FuncionarioForm } from "./components/FuncionarioForm";
import { LivroEstante } from "./components/LivroEstante";

export default function App() {
  //Definição de qual aba será selecionada
  const [tab, setTab] = useState("livros");

  //Armazenando os registros cadastrados
  const [livros, setLivros] = useState([]);
  const [revistas, setRevistas] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);

  //Guardando o texto digitado na pesquisa
  const [search, setSearch] = useState("");

  //Adicionando um livro à lista
  function addLivro(livro) {
    setLivros([...livros, { ...livro, id: crypto.randomUUID() }]);
  }

  //Adicionando uma revista à lista
  function addRevista(revista) {
    setRevistas([...revistas, { ...revista, id: crypto.randomUUID() }]);
  }

  //Adicionando um funcionário à lista
  function addFuncionario(funcionario) {
    setFuncionarios([
      ...funcionarios,
      { ...funcionario, id: crypto.randomUUID() },
    ]);
  }

  //Selecionando os registros na aba atual da página
  const lista =
    tab === "livros"
      ? livros
      : tab === "revistas"
        ? revistas
        : funcionarios;

  //Filtrando os registros pelo título ou nome
  const filtrados = lista.filter((item) =>
    (item.titulo || item.nome)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  //Excluindo um registro da lista 
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
  }

  return (
    <main>
      {/* Título da aplicação */}
      <h1>BookStore</h1>

      {/* Mostrando a quantidade de registros */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg bg-teal-50 p-5">
          <h3>Livros</h3>
          <p className="text-3xl font-bold">{livros.length}</p>
        </div>

        <div className="rounded-lg bg-teal-50 p-5">
          <h3>Revistas</h3>
          <p className="text-3xl font-bold">{revistas.length}</p>
        </div>

        <div className="rounded-lg bg-teal-50 p-5">
          <h3>Funcionários</h3>
          <p className="text-3xl font-bold">{funcionarios.length}</p>
        </div>
      </div>

      {/* Botões para realizar a troca de aba */}
      <nav>
        <button type="button" onClick={() => setTab("livros")}>
          Livros
        </button>

        <button type="button" onClick={() => setTab("revistas")}>
          Revistas
        </button>

        <button type="button" onClick={() => setTab("funcionarios")}>
          Funcionários
        </button>
      </nav>

      {/* Exibindo o formulário da aba selecionada */}
      {tab === "livros" && <LivroForm onAdd={addLivro} />}

      {tab === "revistas" && <RevistaForm onAdd={addRevista} />}

      {tab === "funcionarios" && (
        <FuncionarioForm onAdd={addFuncionario} />
      )}

      {/* Campo para pesquisar os registros */}
      <h2>Lista de {tab}</h2>

      <input
        placeholder="Pesquisar..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      
      {/* Exibindo os livros na estante */}
      {tab === "livros" ? (
        <section>
          <h2>Minha estante</h2>
          <LivroEstante 
            livros={filtrados} 
            onDelete={deleteRecord}
          />
        </section>
      ) : (
        // Listagem de revistas e funcionários
        filtrados.map((item) => (
          <div key={item.id}>
            <p>
              {Object.entries(item)
                .filter(([campo]) => campo !== "id")
                .map(([campo, valor]) => (
                  <span key={campo}>
                    {campo}: {valor}{" "}
                  </span>
                ))}
            </p>

            <button
              type="button"
              onClick={() => deleteRecord(item.id)}
            >
              Excluir
            </button>
          </div>
        ))
      )}
    </main>
  );
}

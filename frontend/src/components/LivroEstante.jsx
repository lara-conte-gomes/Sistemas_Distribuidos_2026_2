
export function LivroEstante({ livros, onDelete, onEdit}) {
  const cores = [
    "#247E7A",
    "#C9593E",
    "#E7AE46",
    "#36629A",
    "#744D85",
    "#6A9658",
  ];

  return (
    <div className="estante">
      {livros.length === 0 && (
        <p>Nenhum livro cadastrado.</p>
      )}

      {livros.map((livro, index) => (
        <div key={livro.id}>
          <div
            className="livro"
            style={{
              backgroundColor: cores[index % cores.length],
            }}
            title={livro.titulo}
          >
            <span>{livro.titulo}</span>
          </div>

          <button 
            type="button" 
            onClick={() => onEdit(livro)}
            aria-label={`Editar livro ${livro.titulo}`}
          >
            Alterar
          </button>

          <button
            type="button"
            onClick={() => onDelete(livro.id)}
            aria-label={`Excluir livro ${livro.titulo}`}
          >
            Excluir
          </button>
        </div>
      ))}
    </div>
  );
}

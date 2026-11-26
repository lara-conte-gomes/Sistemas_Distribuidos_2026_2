
export function RevistaEstante({ revistas, onDelete, onEdit }) {
  const cores = [
    "#507D76",
    "#B65C48",
    "#C99A50",
    "#52718D",
    "#9A654D",
  ];

  return (
    <div className="revistas-estante">
      {revistas.length === 0 && (
        <p>Nenhuma revista cadastrada.</p>
      )}

      {revistas.map((revista, index) => (
        <div className="revista-item" key={revista.id}>
          <div
            className="revista"
            style={{
              backgroundColor: cores[index % cores.length],
              transform: `rotate(${(index % 5 - 2) * 8}deg)`,
            }}
          >
            <h3>{revista.titulo}</h3>
            <p>{revista.genero}</p>
            <small>{revista.edicao}</small>
          </div>

          <button 
            type="button" 
            onClick={() => onEdit(revista)}
            aria-label={`Editar revista ${revista.titulo}`}
          >
            Alterar
          </button>

          <button
            type="button"
            onClick={() => onDelete(revista.id)}
            aria-label={`Excluir revista ${revista.titulo}`}
          >
            Excluir
          </button>
        </div>
      ))}
    </div>
  );
}

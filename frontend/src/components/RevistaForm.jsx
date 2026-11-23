
import { useState, useEffect } from "react";
import { validateRevista } from "../revistaValidation";

export function RevistaForm({ onAdd, editando, onCancel }) {
  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("");
  const [edicao, setEdicao] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [errors, setErrors] = useState({});

  // Preenche os campos quando uma revista é selecionada
  useEffect(() => {
    setTitulo(editando?.titulo ?? "");
    setGenero(editando?.genero ?? "");
    setEdicao(editando?.edicao ?? "");
    setQuantidade(editando?.quantidade ?? "");
    setErrors({});
  }, [editando]);

  function handleSubmit(event) {
    event.preventDefault();

    const result = validateRevista({
      titulo,
      genero,
      edicao,
      quantidade,
    });

    setErrors(result.errors);

    if (Object.keys(result.errors).length > 0) return;

    onAdd(result.values);

    setTitulo("");
    setGenero("");
    setEdicao("");
    setQuantidade("");
    setErrors({});
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor="revista-titulo">Título da revista</label>
      <input
        id="revista-titulo"
        value={titulo}
        onChange={(event) => setTitulo(event.target.value)}
        placeholder="Título da Revista"
      />
      {errors.titulo && <p role="alert">{errors.titulo}</p>}

      <label htmlFor="revista-genero">Gênero da revista</label>
      <input
        id="revista-genero"
        value={genero}
        onChange={(event) => setGenero(event.target.value)}
        placeholder="Gênero da Revista"
      />
      {errors.genero && <p role="alert">{errors.genero}</p>}

      <label htmlFor="revista-edicao">Edição da revista</label>
      <input
        id="revista-edicao"
        value={edicao}
        onChange={(event) => setEdicao(event.target.value)}
        placeholder="Edição da Revista"
      />
      {errors.edicao && <p role="alert">{errors.edicao}</p>}

      <label htmlFor="revista-quantidade">Quantidade de revistas</label>
      <input
        id="revista-quantidade"
        type="number"
        value={quantidade}
        onChange={(event) => setQuantidade(event.target.value)}
        placeholder="Quantidade de Revistas"
      />
      {errors.quantidade && <p role="alert">{errors.quantidade}</p>}

      <button type="submit">
        {editando ? "Salvar alterações" : "Cadastrar uma revista"}
      </button>

      {editando && (
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
      )}
      
    </form>
  );
}

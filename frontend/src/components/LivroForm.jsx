
import { useState } from "react";
import { validateLivro } from "../livroValidation";

export function LivroForm({ onAdd }) {
  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("");
  const [publicoAlvo, setPublicoAlvo] = useState("");
  const [qtd, setQtd] = useState("");
  const [errors, setErrors] = useState({});

  function handleSubmit(event) {
    event.preventDefault();

    const result = validateLivro({ titulo, genero, publicoAlvo, qtd });
    setErrors(result.errors);

    if (Object.keys(result.errors).length > 0) return;

    onAdd(result.values);

    setTitulo("");
    setGenero("");
    setPublicoAlvo("");
    setQtd("");
    setErrors({});
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor="livro-titulo">Título do livro</label>
      <input
        id="livro-titulo"
        value={titulo}
        onChange={(event) => setTitulo(event.target.value)}
        placeholder="Título do livro"
      />
      {errors.titulo && <p role="alert">{errors.titulo}</p>}

      <label htmlFor="livro-genero">Gênero do livro</label>
      <input
        id="livro-genero"
        value={genero}
        onChange={(event) => setGenero(event.target.value)}
        placeholder="Gênero do livro"
      />
      {errors.genero && <p role="alert">{errors.genero}</p>}

      <label htmlFor="livro-publico">Público-alvo</label>
      <input
        id="livro-publico"
        value={publicoAlvo}
        onChange={(event) => setPublicoAlvo(event.target.value)}
        placeholder="Exemplo: Infantil, Infanto-juvenil ou adulto"
      />
      {errors.publicoAlvo && <p role="alert">{errors.publicoAlvo}</p>}

      <label htmlFor="livro-qtd">Quantidade de livros</label>
      <input
        id="livro-qtd"
        type="number"
        value={qtd}
        onChange={(event) => setQtd(event.target.value)}
        placeholder="Quantidade"
      />
      {errors.qtd && <p role="alert">{errors.qtd}</p>}

      <button type="submit">Cadastrar um livro</button>
    </form>
  );
}

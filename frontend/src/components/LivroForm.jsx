import { useEffect, useState } from "react";
import { validateLivro } from "../livroValidation";

export function LivroForm({ onAdd, editando, onCancel }) {
	const [titulo, setTitulo] = useState("");
	const [genero, setGenero] = useState("");
	const [publicoAlvo, setPublicoAlvo] = useState("");
	const [qtd, setQtd] = useState("");
	const [errors, setErrors] = useState({});

	// Preenche os campos quando um livro é selecionado
	useEffect(() => {
		setTitulo(editando?.titulo ?? "");
		setGenero(editando?.genero ?? "");
		setPublicoAlvo(editando?.publicoAlvo ?? "");
		setQtd(editando?.qtd ?? "");
		setErrors({});
	}, [editando]);

	async function handleSubmit(event) {
		event.preventDefault();

		const result = validateLivro({ titulo, genero, publicoAlvo, qtd });
		setErrors(result.errors);

		if (Object.keys(result.errors).length > 0) return;

		try {
			await onAdd(result.values);

			setTitulo("");
			setGenero("");
			setPublicoAlvo("");
			setQtd("");
			setErrors({});
		} catch (error) {
			alert(error.message);
		}
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

			<button type="submit">
				{editando ? "Salvar alterações" : "Cadastrar um livro"}
			</button>

			{editando && (
				<button type="button" onClick={onCancel}>
					Cancelar
				</button>
			)}
		</form>
	);
}

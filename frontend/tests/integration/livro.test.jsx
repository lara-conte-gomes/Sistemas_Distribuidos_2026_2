//imports
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect, it, vi } from "vitest";

import App from "../../src/App";

import {
	createLivro,
	deleteLivro,
	listLivros,
	updateLivro,
} from "../../src/services/livrosService";

//simulando os services
vi.mock("../../src/services/livrosService");
vi.mock("../../src/services/revistasService");
vi.mock("../../src/services/funcionariosService");

import { listFuncionarios } from "../../src/services/funcionariosService";
import { listRevistas } from "../../src/services/revistasService";

const livro = {
	id: 1,
	titulo: "Dom Casmurro",
	genero: "Romance",
	publicoAlvo: "Adulto",
	qtd: 5,
};

beforeEach(() => {
	vi.resetAllMocks();

	listLivros.mockResolvedValue([livro]);
	listRevistas.mockResolvedValue([]);
	listFuncionarios.mockResolvedValue([]);

	createLivro.mockResolvedValue(livro);
	updateLivro.mockResolvedValue(livro);
	deleteLivro.mockResolvedValue(null);
});

//testando a listagem dos livros
it("listagem dos livros cadastrados", async () => {
	render(<App />);

	expect(await screen.findByText("Dom Casmurro")).toBeInTheDocument();

	expect(listLivros).toHaveBeenCalled();
});

//testando o cadastro de um livro novo
it("cadastra um livro novo", async () => {
	const user = userEvent.setup();

	listLivros.mockResolvedValueOnce([]).mockResolvedValue([livro]);

	render(<App />);

	await user.type(screen.getByLabelText("Título do livro"), "Dom Casmurro");

	await user.type(screen.getByLabelText("Gênero do livro"), "Romance");

	await user.type(screen.getByLabelText("Público-alvo"), "Adulto");

	await user.clear(screen.getByLabelText("Quantidade de livros"));
	await user.type(screen.getByLabelText("Quantidade de livros"), "5");

	await user.click(screen.getByRole("button", { name: "Cadastrar um livro" }));

	await waitFor(() => {
		expect(createLivro).toHaveBeenCalled();
	});

	expect(await screen.findByText("Dom Casmurro")).toBeInTheDocument();
});

//testando a alteracao de um livro ja cadastrado
it("altera um livro já cadastrado", async () => {
	const user = userEvent.setup();

	listLivros
		.mockResolvedValueOnce([livro])
		.mockResolvedValue([{ ...livro, titulo: "Memórias Póstumas" }]);

	render(<App />);

	await screen.findByText("Dom Casmurro");

	await user.click(
		screen.getByRole("button", {
			name: "Editar livro Dom Casmurro",
		}),
	);

	const titulo = screen.getByLabelText("Título do livro");

	await user.clear(titulo);
	await user.type(titulo, "Memórias Póstumas");

	await user.click(screen.getByRole("button", { name: "Salvar alterações" }));

	await waitFor(() => {
		expect(updateLivro).toHaveBeenCalled();
	});

	expect(await screen.findByText("Memórias Póstumas")).toBeInTheDocument();
});

//testando a exclusao de um livro
it("exclui um livro cadastrado", async () => {
	const user = userEvent.setup();

	listLivros.mockResolvedValueOnce([livro]).mockResolvedValue([]);

	const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(true);

	try {
		render(<App />);

		await screen.findByText("Dom Casmurro");

		await user.click(
			screen.getByRole("button", {
				name: "Excluir livro Dom Casmurro",
			}),
		);

		await waitFor(() => {
			expect(deleteLivro).toHaveBeenCalledWith(1);

			expect(screen.queryByText("Dom Casmurro")).not.toBeInTheDocument();
		});
	} finally {
		confirmSpy.mockRestore();
	}
});

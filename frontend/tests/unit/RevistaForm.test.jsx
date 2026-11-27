//imports
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";

import { RevistaForm } from "../../src/components/RevistaForm";

const revista = {
	id: 1,
	titulo: "Superinteressante",
	genero: "Tecnologia",
	edicao: "10",
	quantidade: 5,
};

//testando o cadastro com campos vazios
it("não cadastra uma revista com campos vazios", async () => {
	const user = userEvent.setup();
	const onAdd = vi.fn();

	render(<RevistaForm onAdd={onAdd} />);

	await user.click(
		screen.getByRole("button", { name: "Cadastrar uma revista" }),
	);

	expect(onAdd).not.toHaveBeenCalled();
});

//testando o cadastro com dados validos
it("cadastra uma revista com dados válidos", async () => {
	const user = userEvent.setup();
	const onAdd = vi.fn().mockResolvedValue(undefined);

	render(<RevistaForm onAdd={onAdd} />);

	await user.type(
		screen.getByLabelText("Título da revista"),
		"Superinteressante",
	);

	await user.type(screen.getByLabelText("Gênero da revista"), "Tecnologia");

	await user.type(screen.getByLabelText("Edição da revista"), "10");

	await user.clear(screen.getByLabelText("Quantidade de revistas"));

	await user.type(screen.getByLabelText("Quantidade de revistas"), "5");

	await user.click(
		screen.getByRole("button", { name: "Cadastrar uma revista" }),
	);

	expect(onAdd).toHaveBeenCalledWith({
		titulo: "Superinteressante",
		genero: "Tecnologia",
		edicao: "10",
		quantidade: 5,
	});
});

//testando o preenchimento dos campos durante a edicao
it("preenche os campos ao editar uma revista", () => {
	render(<RevistaForm editando={revista} onAdd={vi.fn()} onCancel={vi.fn()} />);

	expect(screen.getByLabelText("Título da revista")).toHaveValue(
		"Superinteressante",
	);

	expect(screen.getByLabelText("Gênero da revista")).toHaveValue("Tecnologia");

	expect(screen.getByLabelText("Edição da revista")).toHaveValue("10");

	expect(screen.getByLabelText("Quantidade de revistas")).toHaveValue(5);

	expect(
		screen.getByRole("button", { name: "Salvar alterações" }),
	).toBeInTheDocument();
});

//testando a alteracao de uma revista
it("envia os dados atualizados de uma revista", async () => {
	const user = userEvent.setup();
	const onAdd = vi.fn().mockResolvedValue(undefined);

	render(<RevistaForm editando={revista} onAdd={onAdd} onCancel={vi.fn()} />);

	const titulo = screen.getByLabelText("Título da revista");

	await user.clear(titulo);
	await user.type(titulo, "Galileu");

	await user.click(screen.getByRole("button", { name: "Salvar alterações" }));

	expect(onAdd).toHaveBeenCalledWith({
		titulo: "Galileu",
		genero: "Tecnologia",
		edicao: "10",
		quantidade: 5,
	});
});

//testando o cancelamento da edicao
it("cancela a edição sem alterar a revista", async () => {
	const user = userEvent.setup();
	const onAdd = vi.fn();
	const onCancel = vi.fn();

	render(<RevistaForm editando={revista} onAdd={onAdd} onCancel={onCancel} />);

	await user.click(screen.getByRole("button", { name: "Cancelar" }));

	expect(onCancel).toHaveBeenCalledTimes(1);
	expect(onAdd).not.toHaveBeenCalled();
});

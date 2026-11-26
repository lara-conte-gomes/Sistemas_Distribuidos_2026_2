//imports
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";

import {LivroForm} from "../../src/components/LivroForm";

const livro = {
  id: 1,
  titulo: "Dom Casmurro",
  genero: "Romance",
  publicoAlvo: "Adulto",
  qtd: 5,
};

//testando o cadastro com campos vazios
it("não cadastra um livro com campos vazios", async () => {
  const user = userEvent.setup();
  const onAdd = vi.fn();

  render(<LivroForm onAdd={onAdd} />);

  await user.click(
    screen.getByRole("button", { name: "Cadastrar um livro" }),
  );

  expect(onAdd).not.toHaveBeenCalled();
});

//testando o cadastro com dados validos
it("cadastra um livro com dados válidos", async () => {
  const user = userEvent.setup();
  const onAdd = vi.fn().mockResolvedValue(undefined);

  render(<LivroForm onAdd={onAdd} />);

  await user.type(
    screen.getByLabelText("Título do livro"),
    "Dom Casmurro",
  );

  await user.type(
    screen.getByLabelText("Gênero do livro"),
    "Romance",
  );

  await user.type(
    screen.getByLabelText("Público-alvo"),
    "Adulto",
  );

  await user.clear(
    screen.getByLabelText("Quantidade de livros"),
  );

  await user.type(
    screen.getByLabelText("Quantidade de livros"),
    "5",
  );

  await user.click(
    screen.getByRole("button", { name: "Cadastrar um livro" }),
  );

  expect(onAdd).toHaveBeenCalledWith({
    titulo: "Dom Casmurro",
    genero: "Romance",
    publicoAlvo: "Adulto",
    qtd: 5,
  });
});

//testando o preenchimento dos campos durante a edicao
it("preenche os campos ao editar um livro", () => {
  render(
    <LivroForm
      editando={livro}
      onAdd={vi.fn()}
      onCancel={vi.fn()}
    />,
  );

  expect(
    screen.getByLabelText("Título do livro"),
  ).toHaveValue("Dom Casmurro");

  expect(
    screen.getByLabelText("Gênero do livro"),
  ).toHaveValue("Romance");

  expect(
    screen.getByLabelText("Público-alvo"),
  ).toHaveValue("Adulto");

  expect(
    screen.getByLabelText("Quantidade de livros"),
  ).toHaveValue(5);

  expect(
    screen.getByRole("button", { name: "Salvar alterações" }),
  ).toBeInTheDocument();
});

//testando a alteracao de um livro
it("envia os dados atualizados de um livro", async () => {
  const user = userEvent.setup();
  const onAdd = vi.fn().mockResolvedValue(undefined);

  render(
    <LivroForm
      editando={livro}
      onAdd={onAdd}
      onCancel={vi.fn()}
    />,
  );

  const titulo = screen.getByLabelText("Título do livro");

  await user.clear(titulo);
  await user.type(titulo, "Memórias Póstumas");

  await user.click(
    screen.getByRole("button", { name: "Salvar alterações" }),
  );

  expect(onAdd).toHaveBeenCalledWith({
    titulo: "Memórias Póstumas",
    genero: "Romance",
    publicoAlvo: "Adulto",
    qtd: 5,
  });
});

//testando o cancelamento da edicao
it("cancela a edição sem alterar o livro", async () => {
  const user = userEvent.setup();
  const onAdd = vi.fn();
  const onCancel = vi.fn();

  render(
    <LivroForm
      editando={livro}
      onAdd={onAdd}
      onCancel={onCancel}
    />,
  );

  await user.click(
    screen.getByRole("button", { name: "Cancelar" }),
  );

  expect(onCancel).toHaveBeenCalledTimes(1);
  expect(onAdd).not.toHaveBeenCalled();
});
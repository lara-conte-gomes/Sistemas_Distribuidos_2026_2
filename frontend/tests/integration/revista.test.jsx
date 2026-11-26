//imports
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect, it, vi } from "vitest";

import App from "../../src/App";

import {
  listRevistas,
  createRevista,
  updateRevista,
  deleteRevista,
} from "../../src/services/revistasService";

import { listLivros } from "../../src/services/livrosService";
import { listFuncionarios } from "../../src/services/funcionariosService";

//simulando os services
vi.mock("../../src/services/livrosService");
vi.mock("../../src/services/revistasService");
vi.mock("../../src/services/funcionariosService");

const revista = {
  id: 1,
  titulo: "Superinteressante",
  genero: "Tecnologia",
  edicao: "10",
  quantidade: 5,
};

beforeEach(() => {
  vi.resetAllMocks();

  listLivros.mockResolvedValue([]);
  listRevistas.mockResolvedValue([revista]);
  listFuncionarios.mockResolvedValue([]);

  createRevista.mockResolvedValue(revista);
  updateRevista.mockResolvedValue(revista);
  deleteRevista.mockResolvedValue(null);
});

//testando a listagem de revistas cadastradas
it("listagem das revistas cadastradas", async () => {
  const user = userEvent.setup();

  render(<App />);

  await user.click(
    screen.getByRole("button", { name: "Revistas", exact: true }),
  );

  expect(
    await screen.findByText("Superinteressante"),
  ).toBeInTheDocument();

  expect(listRevistas).toHaveBeenCalled();
});

//testando o cadastro de uma revista
it("cadastra uma revista nova", async () => {
  const user = userEvent.setup();

  listRevistas
    .mockResolvedValueOnce([])
    .mockResolvedValue([revista]);

  render(<App />);

  await user.click(
    screen.getByRole("button", { name: "Revistas", exact: true }),
  );

  await user.type(
    screen.getByLabelText("Título da revista"),
    "Superinteressante",
  );

  await user.type(
    screen.getByLabelText("Gênero da revista"),
    "Tecnologia",
  );

  await user.type(
    screen.getByLabelText("Edição da revista"),
    "10",
  );

  await user.clear(
    screen.getByLabelText("Quantidade de revistas"),
  );

  await user.type(
    screen.getByLabelText("Quantidade de revistas"),
    "5",
  );

  await user.click(
    screen.getByRole("button", { name: "Cadastrar uma revista" }),
  );

  await waitFor(() => {
    expect(createRevista).toHaveBeenCalled();
  });

  expect(
    await screen.findByText("Superinteressante"),
  ).toBeInTheDocument();
});

//testando a alteracao de uma revista
it("altera uma revista já cadastrada", async () => {
  const user = userEvent.setup();

  listRevistas
    .mockResolvedValueOnce([revista])
    .mockResolvedValue([
      { ...revista, titulo: "Galileu" },
    ]);

  render(<App />);

  await user.click(
    screen.getByRole("button", { name: "Revistas", exact: true }),
  );

  await screen.findByText("Superinteressante");

  await user.click(
    screen.getByRole("button", {
      name: "Editar revista Superinteressante",
    }),
  );

  const titulo = screen.getByLabelText("Título da revista");

  await user.clear(titulo);
  await user.type(titulo, "Galileu");

  await user.click(
    screen.getByRole("button", { name: "Salvar alterações" }),
  );

  await waitFor(() => {
    expect(updateRevista).toHaveBeenCalled();
  });

  expect(
    await screen.findByText("Galileu"),
  ).toBeInTheDocument();
});

//testando a exclusao de uma revista
it("exclui uma revista cadastrada", async () => {
  const user = userEvent.setup();

  listRevistas
    .mockResolvedValueOnce([revista])
    .mockResolvedValue([]);

  const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(true);

  try {
    render(<App />);

    await user.click(
      screen.getByRole("button", { name: "Revistas", exact: true }),
    );

    await screen.findByText("Superinteressante");

    await user.click(
      screen.getByRole("button", {
        name: "Excluir revista Superinteressante",
      }),
    );

    await waitFor(() => {
      expect(deleteRevista).toHaveBeenCalledWith(1);

      expect(
        screen.queryByText("Superinteressante"),
      ).not.toBeInTheDocument();
    });
  } finally {
    confirmSpy.mockRestore();
  }
});
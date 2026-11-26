//imports
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect, it, vi } from "vitest";

import App from "../../src/App";

import {
  listFuncionarios,
  createFuncionario,
  updateFuncionario,
  deleteFuncionario,
} from "../../src/services/funcionariosService";

import { listLivros } from "../../src/services/livrosService";
import { listRevistas } from "../../src/services/revistasService";

//simulando os services
vi.mock("../../src/services/livrosService");
vi.mock("../../src/services/revistasService");
vi.mock("../../src/services/funcionariosService");

const funcionario = {
  id: 1,
  nome: "João",
  idade: 25,
  cargo: "Atendente",
};

beforeEach(() => {
  vi.resetAllMocks();

  listLivros.mockResolvedValue([]);
  listRevistas.mockResolvedValue([]);
  listFuncionarios.mockResolvedValue([funcionario]);

  createFuncionario.mockResolvedValue(funcionario);
  updateFuncionario.mockResolvedValue(funcionario);
  deleteFuncionario.mockResolvedValue(null);
});

//testando a listagem de funcionarios ja cadastrados
it("listagem dos funcionários cadastrados", async () => {
  const user = userEvent.setup();

  render(<App />);

  await user.click(
    screen.getByRole("button", { name: "Funcionários", exact: true }),
  );

  expect(await screen.findByText("João")).toBeInTheDocument();

  expect(listFuncionarios).toHaveBeenCalled();
});

//testando o cadastro de um funcionario novo
it("cadastra um funcionário novo", async () => {
  const user = userEvent.setup();

  listFuncionarios
    .mockResolvedValueOnce([])
    .mockResolvedValue([funcionario]);

  render(<App />);

  await user.click(
    screen.getByRole("button", { name: "Funcionários", exact: true }),
  );

  await user.type(
    screen.getByLabelText("Nome do funcionário"),
    "João",
  );

  await user.clear(
    screen.getByLabelText("Idade do funcionário"),
  );

  await user.type(
    screen.getByLabelText("Idade do funcionário"),
    "25",
  );

  await user.type(
    screen.getByLabelText("Cargo do funcionário"),
    "Atendente",
  );

  await user.click(
    screen.getByRole("button", { name: "Cadastrar um funcionário" }),
  );

  await waitFor(() => {
    expect(createFuncionario).toHaveBeenCalled();
  });

  expect(await screen.findByText("João")).toBeInTheDocument();
});

//testando a alteracao de um funcionario ja cadastrado
it("altera um funcionário já cadastrado", async () => {
  const user = userEvent.setup();

  listFuncionarios
    .mockResolvedValueOnce([funcionario])
    .mockResolvedValue([
      { ...funcionario, nome: "Pedro" },
    ]);

  render(<App />);

  await user.click(
    screen.getByRole("button", { name: "Funcionários", exact: true }),
  );

  await screen.findByText("João");

  await user.click(
    screen.getByRole("button", {
      name: "Editar funcionário João",
    }),
  );

  const nome = screen.getByLabelText("Nome do funcionário");

  await user.clear(nome);
  await user.type(nome, "Pedro");

  await user.click(
    screen.getByRole("button", { name: "Salvar alterações" }),
  );

  await waitFor(() => {
    expect(updateFuncionario).toHaveBeenCalled();
  });

  expect(await screen.findByText("Pedro")).toBeInTheDocument();
});

//testando a exclusao de um funcionario
it("exclui um funcionário já cadastrado", async () => {
  const user = userEvent.setup();

  listFuncionarios
    .mockResolvedValueOnce([funcionario])
    .mockResolvedValue([]);

  const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(true);

  try {
    render(<App />);

    await user.click(
      screen.getByRole("button", { name: "Funcionários", exact: true }),
    );

    await screen.findByText("João");

    await user.click(
      screen.getByRole("button", {
        name: "Excluir funcionário João",
      }),
    );

    await waitFor(() => {
      expect(deleteFuncionario).toHaveBeenCalledWith(1);

      expect(
        screen.queryByText("João"),
      ).not.toBeInTheDocument();
    });
  } finally {
    confirmSpy.mockRestore();
  }
});
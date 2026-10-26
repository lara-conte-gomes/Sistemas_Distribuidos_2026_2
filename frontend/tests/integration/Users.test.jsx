import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import App from "../../src/App";

async function openUsers(user) {
  await user.click(screen.getByRole("button", { name: "Usuários" }));
}

async function createUser(user, name = "Maria", age = "25") {
  await user.type(screen.getByLabelText("Nome do usuário"), name);
  await user.type(screen.getByLabelText("Idade"), age);
  await user.click(screen.getByRole("button", { name: "Cadastrar usuário" }));
}

it("cadastra e exibe um usuário", async () => {
  const user = userEvent.setup();
  render(<App />);

  await openUsers(user);
  await createUser(user);

  expect(screen.getByText("Maria")).toBeInTheDocument();
  expect(screen.getByText("Idade: 25")).toBeInTheDocument();
});

it("edita um usuário", async () => {
  const user = userEvent.setup();
  render(<App />);

  await openUsers(user);
  await createUser(user);

  await user.click(screen.getByRole("button", { name: "Editar Maria" }));

  await user.clear(screen.getByLabelText("Nome do usuário"));
  await user.type(screen.getByLabelText("Nome do usuário"), "Ana");

  await user.click(screen.getByRole("button", { name: "Salvar alterações" }));

  expect(screen.getByText("Ana")).toBeInTheDocument();
  expect(screen.queryByText("Maria")).not.toBeInTheDocument();
});

it("exclui um usuário após confirmação", async () => {
  const user = userEvent.setup();
  const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(true);

  try {
    render(<App />);
    await openUsers(user);
    await createUser(user);

    await user.click(screen.getByRole("button", { name: "Excluir Maria" }));

    expect(screen.queryByText("Maria")).not.toBeInTheDocument();
    expect(screen.getByText("Nenhum usuário cadastrado.")).toBeInTheDocument();
  } finally {
    confirmSpy.mockRestore();
  }
});

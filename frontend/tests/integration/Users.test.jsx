import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect, it, vi } from "vitest";

import App from "../../src/App";

import {
  createUser as createUserApi,
  deleteUser as deleteUserApi,
  listUsers,
  updateUser,
} from "../../src/services/users";

// Simula os serviços de itens para evitar chamadas reais à API
vi.mock("../../src/services/items", () => ({
  listItems: vi.fn(async () => []),
  createItem: vi.fn(),
}));

// Simula os serviços de usuários
vi.mock("../../src/services/users", () => ({
  listUsers: vi.fn(),
  createUser: vi.fn(),
  updateUser: vi.fn(),
  deleteUser: vi.fn(),
}));

let savedUsers = [];
let nextUserId = 1;

// Reinicia o banco simulado antes de cada teste
beforeEach(() => {
  vi.resetAllMocks();

  savedUsers = [];
  nextUserId = 1;

  listUsers.mockImplementation(async () => [...savedUsers]);

  createUserApi.mockImplementation(async (values) => {
    const newUser = {
      id: nextUserId++,
      name: values.name,
      age: Number(values.age),
    };

    savedUsers.push(newUser);

    return newUser;
  });

  updateUser.mockImplementation(async (id, values) => {
    const index = savedUsers.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new Error("Usuário não foi encontrado.");
    }

    savedUsers[index] = {
      ...savedUsers[index],
      ...values,
    };

    return savedUsers[index];
  });

  deleteUserApi.mockImplementation(async (id) => {
    const index = savedUsers.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new Error("Usuário não foi encontrado.");
    }

    savedUsers.splice(index, 1);

    return null;
  });
});

// Abre a aba de usuários
async function openUsers(user) {
  await user.click(screen.getByRole("button", { name: "Usuários" }));

  await screen.findByRole("heading", {
    name: "Gerenciamento de usuários",
  });

  await waitFor(() => {
    expect(
      screen.queryByText("Carregando usuários..."),
    ).not.toBeInTheDocument();
  });
}

// Preenche e cadastra um usuário
async function registerUser(user, name = "Maria", age = "25") {
  await user.type(screen.getByLabelText("Nome do usuário"), name);

  await user.type(screen.getByLabelText("Idade"), age);

  await user.click(
    screen.getByRole("button", {
      name: "Cadastrar usuário",
    }),
  );

  // Aguarda a operação assíncrona terminar
  await waitFor(() => {
    expect(
      screen.getByRole("button", {
        name: "Cadastrar usuário",
      }),
    ).toBeEnabled();
  });
}

it("cadastra e exibe um usuário", async () => {
  const user = userEvent.setup();

  render(<App />);

  await openUsers(user);
  await registerUser(user);

  expect(
    await screen.findByRole("cell", { name: "Maria" }),
  ).toBeInTheDocument();

  expect(screen.getByRole("cell", { name: "Idade: 25" })).toBeInTheDocument();

  expect(createUserApi).toHaveBeenCalledWith({
    name: "Maria",
    age: 25,
  });

  expect(listUsers).toHaveBeenCalledTimes(2);

  expect(screen.getAllByRole("cell", { name: "Maria" })).toHaveLength(1);
});

it("edita um usuário", async () => {
  const user = userEvent.setup();

  render(<App />);

  await openUsers(user);
  await registerUser(user);

  const editButton = await screen.findByRole("button", {
    name: "Editar Maria",
  });

  await waitFor(() => {
    expect(editButton).toBeEnabled();
  });

  await user.click(editButton);

  const nameInput = screen.getByLabelText("Nome do usuário");

  await user.clear(nameInput);
  await user.type(nameInput, "Ana");

  await user.click(
    screen.getByRole("button", {
      name: "Salvar alterações",
    }),
  );

  await waitFor(() => {
    expect(screen.getByRole("cell", { name: "Ana" })).toBeInTheDocument();
  });

  expect(screen.queryByRole("cell", { name: "Maria" })).not.toBeInTheDocument();

  expect(updateUser).toHaveBeenCalledWith(1, {
    name: "Ana",
    age: 25,
  });

  expect(
    screen.getByText("Usuário atualizado com sucesso."),
  ).toBeInTheDocument();
});

it("exclui um usuário após confirmação", async () => {
  const user = userEvent.setup();

  const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(true);

  try {
    render(<App />);

    await openUsers(user);
    await registerUser(user);

    const deleteButton = await screen.findByRole("button", {
      name: "Excluir Maria",
    });

    await waitFor(() => {
      expect(deleteButton).toBeEnabled();
    });

    await user.click(deleteButton);

    await waitFor(() => {
      expect(
        screen.queryByRole("cell", {
          name: "Maria",
        }),
      ).not.toBeInTheDocument();
    });

    expect(screen.getByText("Nenhum usuário cadastrado.")).toBeInTheDocument();

    expect(deleteUserApi).toHaveBeenCalledWith(1);
    expect(confirmSpy).toHaveBeenCalledTimes(1);

    expect(
      screen.getByText("Usuário excluído com sucesso."),
    ).toBeInTheDocument();
  } finally {
    confirmSpy.mockRestore();
  }
});

it("mantém o usuário após consultar novamente a API", async () => {
  const user = userEvent.setup();

  render(<App />);

  await openUsers(user);
  await registerUser(user, "Luíza", "22");

  await waitFor(() => {
    expect(
      screen.getByRole("cell", {
        name: "Luíza",
      }),
    ).toBeInTheDocument();
  });

  // Simula uma nova consulta ao banco
  const usersFromApi = await listUsers();

  expect(usersFromApi).toEqual([
    {
      id: 1,
      name: "Luíza",
      age: 22,
    },
  ]);

  expect(
    screen.getByRole("cell", {
      name: "Idade: 22",
    }),
  ).toBeInTheDocument();
});

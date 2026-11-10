import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect, it, vi } from "vitest";

import App from "../../src/App";

import {
  createItem,
  deleteItem,
  listItems,
  updateItem,
} from "../../src/services/items";

vi.mock("../../src/services/items", () => ({
  listItems: vi.fn(),
  createItem: vi.fn(),
  updateItem: vi.fn(),
  deleteItem: vi.fn(),
}));

// Simula o serviço de usuários utilizado pelo App
vi.mock("../../src/services/users", () => ({
  listUsers: vi.fn(async () => []),
  createUser: vi.fn(),
  updateUser: vi.fn(),
  deleteUser: vi.fn(),
}));

let savedItems = [];
let nextId = 1;

beforeEach(() => {
  vi.resetAllMocks();

  savedItems = [];
  nextId = 1;

  // Simula a listagem persistida no backend
  listItems.mockImplementation(async () => [...savedItems]);

  // Simula o cadastro no banco de dados
  createItem.mockImplementation(async (item) => {
    const newItem = {
      id: nextId++,
      ...item,
    };

    savedItems = [...savedItems, newItem];

    return newItem;
  });

  // Simula a atualização de um item
  updateItem.mockImplementation(async (id, values) => {
    const index = savedItems.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new Error("Item não encontrado.");
    }

    const updatedItem = {
      ...savedItems[index],
      ...values,
    };

    savedItems = savedItems.map((item) =>
      item.id === id ? updatedItem : item,
    );

    return updatedItem;
  });

  // Simula a exclusão de um item
  deleteItem.mockImplementation(async (id) => {
    const exists = savedItems.some((item) => item.id === id);

    if (!exists) {
      throw new Error("Item não encontrado.");
    }

    savedItems = savedItems.filter((item) => item.id !== id);

    return null;
  });
});

it("cadastra um item e o exibe na tabela", async () => {
  const user = userEvent.setup();

  render(<App />);

  // Aguarda a listagem inicial da API
  await waitFor(() => {
    expect(listItems).toHaveBeenCalledTimes(1);
  });

  // Preenche o formulário
  await user.type(
    screen.getByRole("textbox", {
      name: "Nome",
      exact: true,
    }),
    "Notebook",
  );

  await user.type(
    screen.getByRole("textbox", {
      name: "Descrição (opcional)",
    }),
    "14 polegadas",
  );

  // Envia o cadastro
  await user.click(
    screen.getByRole("button", {
      name: "Adicionar item",
    }),
  );

  // Verifica se o item aparece na tabela
  expect(await screen.findByText("Notebook")).toBeInTheDocument();

  expect(screen.getByText("14 polegadas")).toBeInTheDocument();

  // Verifica os dados enviados à API
  expect(createItem).toHaveBeenCalledWith({
    name: "Notebook",
    description: "14 polegadas",
    quantity: 1,
  });

  // Verifica a atualização da listagem
  expect(listItems).toHaveBeenCalledTimes(2);

  // Confirma que não houve duplicação
  expect(screen.getAllByText("Notebook")).toHaveLength(1);
});

it("edita um item existente e atualiza a tabela", async () => {
  const user = userEvent.setup();

  savedItems = [
    {
      id: 1,
      name: "Notebook",
      description: "14 polegadas",
      quantity: 1,
    },
  ];

  render(<App />);

  // Aguarda o carregamento do item
  expect(await screen.findByText("Notebook")).toBeInTheDocument();

  // Seleciona o item para edição
  await user.click(
    screen.getByRole("button", {
      name: "Editar item Notebook",
    }),
  );

  // Verifica se os campos foram preenchidos
  const nameInput = screen.getByRole("textbox", {
    name: "Nome",
    exact: true,
  });

  const descriptionInput = screen.getByRole("textbox", {
    name: "Descrição (opcional)",
  });

  expect(nameInput).toHaveValue("Notebook");
  expect(descriptionInput).toHaveValue("14 polegadas");

  // Altera os dados
  await user.clear(nameInput);
  await user.type(nameInput, "Notebook Gamer");

  await user.clear(descriptionInput);
  await user.type(descriptionInput, "16 polegadas");

  // Salva a edição
  await user.click(
    screen.getByRole("button", {
      name: "Salvar alterações",
    }),
  );

  // Verifica a chamada à API
  await waitFor(() => {
    expect(updateItem).toHaveBeenCalledWith(1, {
      name: "Notebook Gamer",
      description: "16 polegadas",
      quantity: 1,
    });
  });

  // Verifica a atualização da interface
  expect(await screen.findByText("Notebook Gamer")).toBeInTheDocument();

  expect(screen.getByText("16 polegadas")).toBeInTheDocument();

  expect(screen.queryByText("14 polegadas")).not.toBeInTheDocument();

  expect(
    await screen.findByText("Item atualizado com sucesso."),
  ).toBeInTheDocument();
});

it("cancela a edição sem alterar o item", async () => {
  const user = userEvent.setup();

  savedItems = [
    {
      id: 1,
      name: "Mouse",
      description: "Sem fio",
      quantity: 2,
    },
  ];

  render(<App />);

  expect(await screen.findByText("Mouse")).toBeInTheDocument();

  await user.click(
    screen.getByRole("button", {
      name: "Editar item Mouse",
    }),
  );

  const nameInput = screen.getByRole("textbox", {
    name: "Nome",
    exact: true,
  });

  await user.clear(nameInput);
  await user.type(nameInput, "Teclado");

  // Cancela a operação
  await user.click(
    screen.getByRole("button", {
      name: "Cancelar",
    }),
  );

  // O formulário retorna ao modo de cadastro
  expect(
    screen.getByRole("button", {
      name: "Adicionar item",
    }),
  ).toBeInTheDocument();

  expect(nameInput).toHaveValue("");

  // Nenhuma atualização foi enviada à API
  expect(updateItem).not.toHaveBeenCalled();

  // O item original permanece na tabela
  expect(screen.getByText("Mouse")).toBeInTheDocument();
});

it("exclui um item utilizando a API", async () => {
  const user = userEvent.setup();

  savedItems = [
    {
      id: 1,
      name: "Monitor",
      description: "24 polegadas",
      quantity: 1,
    },
  ];

  // Simula a confirmação do navegador
  const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(true);

  try {
    render(<App />);

    expect(await screen.findByText("Monitor")).toBeInTheDocument();

    // Solicita a exclusão
    await user.click(
      screen.getByRole("button", {
        name: "Excluir item Monitor",
      }),
    );

    // Verifica se a API foi chamada
    await waitFor(() => {
      expect(deleteItem).toHaveBeenCalledWith(1);
    });

    // Confirma que o item desapareceu da tabela
    await waitFor(() => {
      expect(screen.queryByText("Monitor")).not.toBeInTheDocument();
    });

    expect(screen.getByText("Nenhum item cadastrado.")).toBeInTheDocument();

    expect(screen.getByText("Item excluído com sucesso.")).toBeInTheDocument();

    // Confirma que a lista foi consultada novamente
    expect(listItems).toHaveBeenCalledTimes(2);
  } finally {
    confirmSpy.mockRestore();
  }
});

it("não exclui um item quando o usuário cancela a confirmação", async () => {
  const user = userEvent.setup();

  savedItems = [
    {
      id: 1,
      name: "Teclado",
      description: "Mecânico",
      quantity: 1,
    },
  ];

  const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(false);

  try {
    render(<App />);

    expect(await screen.findByText("Teclado")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: "Excluir item Teclado",
      }),
    );

    // Nenhuma requisição DELETE deve ser realizada
    expect(deleteItem).not.toHaveBeenCalled();

    // O item continua na tabela
    expect(screen.getByText("Teclado")).toBeInTheDocument();
  } finally {
    confirmSpy.mockRestore();
  }
});

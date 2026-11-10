import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect, it, vi } from "vitest";

import App from "../../src/App";
import { createItem, listItems } from "../../src/services/items";

vi.mock("../../src/services/items", () => ({
  listItems: vi.fn(),
  createItem: vi.fn(),
}));

beforeEach(() => {
  vi.resetAllMocks();

  // Simula os itens armazenados no backend
  let savedItems = [];

  // Retorna os itens cadastrados
  listItems.mockImplementation(async () => [...savedItems]);

  // Simula o cadastro de um item na API
  createItem.mockImplementation(async (item) => {
    const newItem = {
      id: savedItems.length + 1,
      ...item,
    };

    savedItems = [...savedItems, newItem];

    return newItem;
  });
});

it("cadastra um item e o exibe na tabela", async () => {
  const user = userEvent.setup();

  render(<App />);

  // Aguarda a listagem inicial da API
  expect(await screen.findByText("Itens cadastrados")).toBeInTheDocument();

  // Preenche o formulário
  await user.type(
    screen.getByRole("textbox", { name: "Nome", exact: true }),
    "Notebook",
  );

  await user.type(
    screen.getByRole("textbox", { name: "Descrição (opcional)" }),
    "14 polegadas",
  );

  // Envia o cadastro
  await user.click(screen.getByRole("button", { name: "Adicionar item" }));

  // Aguarda a atualização assíncrona da tabela
  expect(await screen.findByText("Notebook")).toBeInTheDocument();
  expect(screen.getByText("14 polegadas")).toBeInTheDocument();

  // Verifica os dados enviados ao backend
  expect(createItem).toHaveBeenCalledWith({
    name: "Notebook",
    description: "14 polegadas",
    quantity: 1,
  });

  // Verifica que a lista foi consultada novamente após o cadastro
  expect(listItems).toHaveBeenCalledTimes(2);

  // Confirma que o item aparece apenas uma vez
  expect(screen.getAllByText("Notebook")).toHaveLength(1);
});

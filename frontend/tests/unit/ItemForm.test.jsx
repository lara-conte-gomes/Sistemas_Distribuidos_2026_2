import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";

import ItemForm from "../../src/components/ItemForm";

it("mostra erro e não cadastra item com nome vazio", async () => {
  const user = userEvent.setup();
  const onSaveItem = vi.fn();

  render(<ItemForm onSaveItem={onSaveItem} />);

  await user.click(screen.getByRole("button", { name: "Adicionar item" }));

  expect(screen.getByRole("alert")).toHaveTextContent("O nome é obrigatório.");

  expect(onSaveItem).not.toHaveBeenCalled();
});

it("cadastra um item com dados válidos", async () => {
  const user = userEvent.setup();
  const onSaveItem = vi.fn().mockResolvedValue(true);

  render(<ItemForm onSaveItem={onSaveItem} />);

  await user.type(
    screen.getByRole("textbox", { name: "Nome", exact: true }),
    "Notebook",
  );

  await user.type(
    screen.getByRole("textbox", { name: "Descrição (opcional)" }),
    "14 polegadas",
  );

  await user.clear(screen.getByRole("spinbutton", { name: "Quantidade" }));
  await user.type(screen.getByRole("spinbutton", { name: "Quantidade" }), "2");

  await user.click(screen.getByRole("button", { name: "Adicionar item" }));

  expect(onSaveItem).toHaveBeenCalledWith({
    name: "Notebook",
    description: "14 polegadas",
    quantity: 2,
  });

  expect(
    screen.getByRole("textbox", { name: "Nome", exact: true }),
  ).toHaveValue("");
});

it("preenche os campos ao editar um item", () => {
  const editingItem = {
    id: 1,
    name: "Mouse",
    description: "Sem fio",
    quantity: 3,
  };

  render(
    <ItemForm
      editingItem={editingItem}
      onSaveItem={vi.fn()}
      onCancelEdit={vi.fn()}
    />,
  );

  expect(
    screen.getByRole("textbox", { name: "Nome", exact: true }),
  ).toHaveValue("Mouse");

  expect(
    screen.getByRole("textbox", { name: "Descrição (opcional)" }),
  ).toHaveValue("Sem fio");

  expect(screen.getByRole("spinbutton", { name: "Quantidade" })).toHaveValue(3);

  expect(
    screen.getByRole("button", { name: "Salvar alterações" }),
  ).toBeInTheDocument();
});

it("envia os dados atualizados ao salvar uma edição", async () => {
  const user = userEvent.setup();
  const onSaveItem = vi.fn().mockResolvedValue(true);

  const editingItem = {
    id: 1,
    name: "Mouse",
    description: "Sem fio",
    quantity: 3,
  };

  render(
    <ItemForm
      editingItem={editingItem}
      onSaveItem={onSaveItem}
      onCancelEdit={vi.fn()}
    />,
  );

  const nameInput = screen.getByRole("textbox", {
    name: "Nome",
    exact: true,
  });

  await user.clear(nameInput);
  await user.type(nameInput, "Mouse Gamer");

  await user.click(screen.getByRole("button", { name: "Salvar alterações" }));

  expect(onSaveItem).toHaveBeenCalledWith({
    name: "Mouse Gamer",
    description: "Sem fio",
    quantity: 3,
  });
});

it("cancela a edição sem salvar alterações", async () => {
  const user = userEvent.setup();
  const onSaveItem = vi.fn();
  const onCancelEdit = vi.fn();

  const editingItem = {
    id: 1,
    name: "Teclado",
    description: "Mecânico",
    quantity: 1,
  };

  render(
    <ItemForm
      editingItem={editingItem}
      onSaveItem={onSaveItem}
      onCancelEdit={onCancelEdit}
    />,
  );

  await user.click(screen.getByRole("button", { name: "Cancelar" }));

  expect(onCancelEdit).toHaveBeenCalledTimes(1);
  expect(onSaveItem).not.toHaveBeenCalled();

  expect(
    screen.getByRole("textbox", { name: "Nome", exact: true }),
  ).toHaveValue("");
});

it("bloqueia o formulário durante o salvamento", () => {
  render(<ItemForm onSaveItem={vi.fn()} saving={true} />);

  expect(
    screen.getByRole("button", { name: "Salvando o item..." }),
  ).toBeDisabled();

  expect(
    screen.getByRole("textbox", { name: "Nome", exact: true }),
  ).toBeDisabled();

  expect(screen.getByRole("spinbutton", { name: "Quantidade" })).toBeDisabled();
});

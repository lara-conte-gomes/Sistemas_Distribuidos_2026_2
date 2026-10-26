import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import App from "../../src/App";

it("cadastra um item e o exibe na tabela", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.type(
    screen.getByRole("textbox", { name: "Nome", exact: true }),
    "Notebook",
  );

  await user.type(
    screen.getByRole("textbox", { name: "Descrição (opcional)" }),
    "14 polegadas",
  );

  await user.click(screen.getByRole("button", { name: "Adicionar item" }));

  expect(screen.getByText("Notebook")).toBeInTheDocument();
  expect(screen.getByText("14 polegadas")).toBeInTheDocument();
  expect(screen.getByText("Itens cadastrados")).toBeInTheDocument();
});

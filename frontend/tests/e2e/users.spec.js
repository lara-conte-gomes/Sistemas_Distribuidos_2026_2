import { expect, test } from "@playwright/test";

test("cadastra, edita e exclui um usuário", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Usuários" }).click();

  await page.getByLabel("Nome do usuário").fill("Maria");
  await page.getByLabel("Idade").fill("25");

  await page.getByRole("button", { name: "Cadastrar usuário" }).click();

  await expect(page.getByText("Maria")).toBeVisible();
  await expect(page.getByText("Idade: 25")).toBeVisible();

  await page.getByRole("button", { name: "Editar Maria" }).click();
  await page.getByLabel("Nome do usuário").fill("Ana");

  await page.getByRole("button", { name: "Salvar alterações" }).click();

  await expect(page.getByText("Ana")).toBeVisible();

  page.once("dialog", (dialog) => dialog.accept());

  await page.getByRole("button", { name: "Excluir Ana" }).click();

  await expect(page.getByText("Nenhum usuário cadastrado.")).toBeVisible();
});

import { expect, test } from "@playwright/test";

test("cadastra um item e exibe na tabela", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("Nome", { exact: true }).fill("Notebook");

  await page.getByLabel("Descrição (opcional)").fill("14 polegadas");

  await page.getByRole("button", { name: "Adicionar item" }).click();

  await expect(
    page.getByRole("cell", { name: "Notebook", exact: true }),
  ).toBeVisible();

  await expect(
    page.getByRole("cell", { name: "14 polegadas", exact: true }),
  ).toBeVisible();
});

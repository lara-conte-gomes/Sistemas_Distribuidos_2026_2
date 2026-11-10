import { expect, test } from "@playwright/test";

test("cadastra um item e mantém os dados após recarregar a página", async ({
  page,
}) => {
  const itemName = `Notebook E2E ${Date.now()}`;
  const description = "14 polegadas";

  await page.goto("/");

  // Preenche o formulário
  await page.getByLabel("Nome", { exact: true }).fill(itemName);
  await page.getByLabel("Descrição (opcional)").fill(description);

  // Aguarda a resposta do cadastro
  const responsePromise = page.waitForResponse(
    (response) =>
      response.request().method() === "POST" &&
      response.url().includes("/items/"),
  );

  await page.getByRole("button", { name: "Adicionar item" }).click();

  const response = await responsePromise;

  // Confirma o cadastro na API
  expect(response.status()).toBe(201);

  const createdItem = await response.json();

  expect(createdItem.name).toBe(itemName);
  expect(createdItem.description).toBe(description);

  // Localiza somente a linha do item recém-cadastrado
  const itemRow = page.getByRole("row").filter({
    has: page.getByRole("cell", {
      name: itemName,
      exact: true,
    }),
  });

  // Verifica nome e descrição na mesma linha
  await expect(itemRow).toHaveCount(1);
  await expect(
    itemRow.getByRole("cell", { name: itemName, exact: true }),
  ).toBeVisible();
  await expect(
    itemRow.getByRole("cell", { name: description, exact: true }),
  ).toBeVisible();

  // Recarrega a página
  await page.reload();

  // Verifica se o item permanece cadastrado
  await expect(itemRow).toHaveCount(1);
  await expect(
    itemRow.getByRole("cell", { name: itemName, exact: true }),
  ).toBeVisible();
  await expect(
    itemRow.getByRole("cell", { name: description, exact: true }),
  ).toBeVisible();
});

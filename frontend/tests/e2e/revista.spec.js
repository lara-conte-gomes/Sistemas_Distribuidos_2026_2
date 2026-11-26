//import
import { expect, test } from "@playwright/test";

test("Executando o CRUD de revistas com persistência dos dados", async ({ page }) => {
  const titulo = `Revista E2E ${Date.now()}`;
  const novoTitulo = `${titulo} atualizada`;

  await page.goto("/");
  await page.getByRole("button", { name: "Revistas", exact: true }).click();

  //cadastrando uma revista
  await page.getByLabel("Título da revista", { exact: true }).fill(titulo);
  await page.getByLabel("Gênero da revista").fill("Tecnologia");
  await page.getByLabel("Edição da revista").fill("10");
  await page.getByLabel("Quantidade de revistas").fill("5");

  await page.getByRole("button", { name: "Cadastrar uma revista" }).click();

  //verificando o cadastro da revista
  await expect(page.getByText(titulo, { exact: true })).toBeVisible();

  await page.reload();
  await page.getByRole("button", { name: "Revistas", exact: true }).click();

  await expect(page.getByText(titulo, { exact: true })).toBeVisible();

  //alterando as informacoes da revista
  await page.getByRole("button", { name: `Editar revista ${titulo}` }).click();

  await page.getByLabel("Título da revista", { exact: true }).fill(novoTitulo);

  await page.getByRole("button", { name: "Salvar alterações" }).click();

  await expect(page.getByText(novoTitulo, { exact: true })).toBeVisible();

  await page.reload();
  await page.getByRole("button", { name: "Revistas", exact: true }).click();

  await expect(page.getByText(novoTitulo, { exact: true })).toBeVisible();

  //excluindo a revista
  page.once("dialog", (dialog) => dialog.accept());

  await page.getByRole("button", { name: `Excluir revista ${novoTitulo}` }).click();

  await expect(page.getByText(novoTitulo, { exact: true })).toHaveCount(0);

  await page.reload();
  await page.getByRole("button", { name: "Revistas", exact: true }).click();

  await expect(page.getByText(novoTitulo, { exact: true })).toHaveCount(0);
});
//import
import { expect, test } from "@playwright/test";

test("Executando o CRUD de livros com persistência dos dados", async ({ page }) => {
  const titulo = `Livro E2E ${Date.now()}`;
  const novoTitulo = `${titulo} atualizado`;

  await page.goto("/");

  //cadastrando um livro
  await page.getByLabel("Título do livro", { exact: true }).fill(titulo);
  await page.getByLabel("Gênero do livro").fill("Romance");
  await page.getByLabel("Público-alvo").fill("Adulto");
  await page.getByLabel("Quantidade").fill("5");

  await page.getByRole("button", { name: "Cadastrar um livro" }).click();

  //verificando o cadastro do livro
  await expect(page.getByText(titulo, { exact: true })).toBeVisible();

  await page.reload();

  await expect(page.getByText(titulo, { exact: true })).toBeVisible();

  //alterando as informacoes do livro
  await page.getByRole("button", { name: `Editar livro ${titulo}` }).click();

  await page.getByLabel("Título do livro", { exact: true }).fill(novoTitulo);

  await page.getByRole("button", { name: "Salvar alterações" }).click();

  await expect(page.getByText(novoTitulo, { exact: true })).toBeVisible();

  await page.reload();

  await expect(page.getByText(novoTitulo, { exact: true })).toBeVisible();

  //deletando o livro
  page.once("dialog", (dialog) => dialog.accept());

  await page.getByRole("button", { name: `Excluir livro ${novoTitulo}` }).click();

  await expect(page.getByText(novoTitulo, { exact: true })).toHaveCount(0);

  await page.reload();

  await expect(page.getByText(novoTitulo, { exact: true })).toHaveCount(0);
});
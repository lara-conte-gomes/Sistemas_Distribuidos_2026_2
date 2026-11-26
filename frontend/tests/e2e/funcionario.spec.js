//import
import { expect, test } from "@playwright/test";

test("Executando o CRUD de funcionários com persistência dos dados", async ({ page }) => {
  const nome = `Funcionario E2E ${Date.now()}`;
  const novoNome = `${nome} atualizado`;

  await page.goto("/");
  await page.getByRole("button", { name: "Funcionários", exact: true }).click();

  //cadastrando um funcionario novo
  await page.getByLabel("Nome do funcionário", { exact: true }).fill(nome);
  await page.getByLabel("Idade do funcionário", { exact: true }).fill("25");
  await page.getByLabel("Cargo do funcionário", { exact: true }).fill("Atendente");

  await page.getByRole("button", { name: "Cadastrar um funcionário" }).click();

  //verificando o funcionario cadastrado
  await expect(page.getByText(nome, { exact: true })).toBeVisible();

  await page.reload();
  await page.getByRole("button", { name: "Funcionários", exact: true }).click();

  await expect(page.getByText(nome, { exact: true })).toBeVisible();

  //alterando as informacoes do funcionario
  await page.getByRole("button", { name: `Editar funcionário ${nome}` }).click();

  await page.getByLabel("Nome do funcionário", { exact: true }).fill(novoNome);

  await page.getByRole("button", { name: "Salvar alterações" }).click();

  await expect(page.getByText(novoNome, { exact: true })).toBeVisible();

  await page.reload();
  await page.getByRole("button", { name: "Funcionários", exact: true }).click();

  await expect(page.getByText(novoNome, { exact: true })).toBeVisible();

  //excluindo o funcionario
  page.once("dialog", (dialog) => dialog.accept());

  await page.getByRole("button", { name: `Excluir funcionário ${novoNome}` }).click();

  await expect(page.getByText(novoNome, { exact: true })).toHaveCount(0);

  await page.reload();
  await page.getByRole("button", { name: "Funcionários", exact: true }).click();

  await expect(page.getByText(novoNome, { exact: true })).toHaveCount(0);
});
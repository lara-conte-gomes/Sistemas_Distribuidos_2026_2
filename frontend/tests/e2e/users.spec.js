import { expect, test } from "@playwright/test";

test("cadastra, edita e exclui usuário com persistência", async ({ page }) => {
  const uniqueId = `${Date.now()}${Math.random().toString(36).slice(2, 6)}`;

  const originalName = `Maria${uniqueId}`;
  const updatedName = `Ana${uniqueId}`;

  // ACESSO À APLICAÇÃO
  await page.goto("/");

  await page
    .getByRole("button", {
      name: "Usuários",
    })
    .click();

  await expect(
    page.getByRole("heading", {
      name: "Gerenciamento de usuários",
    }),
  ).toBeVisible();

  await expect(page.getByText("Carregando usuários...")).toBeHidden();

  // CADASTRO
  await page.getByLabel("Nome do usuário").fill(originalName);
  await page.getByLabel("Idade").fill("25");

  const registerButton = page.getByRole("button", {
    name: "Cadastrar usuário",
  });

  await expect(registerButton).toBeEnabled();
  await registerButton.click();

  await expect(page.getByText("Usuário cadastrado com sucesso.")).toBeVisible();

  // Localiza somente o usuário cadastrado
  const originalRow = page.getByRole("row").filter({
    has: page.getByRole("cell", {
      name: originalName,
      exact: true,
    }),
  });

  await expect(originalRow).toHaveCount(1);

  await expect(originalRow.getByText("Idade: 25")).toBeVisible();

  // PERSISTÊNCIA DO CADASTRO
  await page.reload();

  await page
    .getByRole("button", {
      name: "Usuários",
    })
    .click();

  await expect(originalRow).toHaveCount(1);

  // EDIÇÃO
  await originalRow
    .getByRole("button", {
      name: `Editar ${originalName}`,
    })
    .click();

  await expect(page.getByLabel("Nome do usuário")).toHaveValue(originalName);

  await page.getByLabel("Nome do usuário").fill(updatedName);
  await page.getByLabel("Idade").fill("26");

  const saveButton = page.getByRole("button", {
    name: "Salvar alterações",
  });

  await expect(saveButton).toBeEnabled();
  await saveButton.click();

  await expect(page.getByText("Usuário atualizado com sucesso.")).toBeVisible();

  // Localiza o usuário atualizado
  const updatedRow = page.getByRole("row").filter({
    has: page.getByRole("cell", {
      name: updatedName,
      exact: true,
    }),
  });

  await expect(updatedRow).toHaveCount(1);

  await expect(updatedRow.getByText("Idade: 26")).toBeVisible();

  await expect(originalRow).toHaveCount(0);

  // PERSISTÊNCIA DA EDIÇÃO
  await page.reload();

  await page
    .getByRole("button", {
      name: "Usuários",
    })
    .click();

  await expect(updatedRow).toHaveCount(1);

  await expect(updatedRow.getByText("Idade: 26")).toBeVisible();

  // EXCLUSÃO
  page.once("dialog", (dialog) => dialog.accept());

  const deleteButton = updatedRow.getByRole("button", {
    name: `Excluir ${updatedName}`,
  });

  await expect(deleteButton).toBeEnabled();
  await deleteButton.click();

  await expect(page.getByText("Usuário excluído com sucesso.")).toBeVisible();

  await expect(updatedRow).toHaveCount(0);

  // PERSISTÊNCIA DA EXCLUSÃO
  await page.reload();

  await page
    .getByRole("button", {
      name: "Usuários",
    })
    .click();

  await expect(updatedRow).toHaveCount(0);
});

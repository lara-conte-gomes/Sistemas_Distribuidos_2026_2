import { expect, test } from "@playwright/test";

test("executa o CRUD completo de itens com persistência", async ({
  page,
  request,
}) => {
  const itemName = `Notebook E2E ${Date.now()}`;
  const updatedName = `Notebook Atualizado E2E ${Date.now()}`;

  const description = "14 polegadas";
  const updatedDescription = "16 polegadas";

  let itemId = null;

  try {
    // 1. CREATE - Cadastra um item
    await page.goto("/");

    await page.getByLabel("Nome", { exact: true }).fill(itemName);

    await page.getByLabel("Descrição (opcional)").fill(description);

    await page.getByLabel("Quantidade").fill("2");

    const createResponsePromise = page.waitForResponse(
      (response) =>
        response.request().method() === "POST" &&
        /\/items\/?$/.test(new URL(response.url()).pathname),
    );

    await page.getByRole("button", { name: "Adicionar item" }).click();

    const createResponse = await createResponsePromise;

    expect(createResponse.status()).toBe(201);

    const createdItem = await createResponse.json();

    expect(createdItem.name).toBe(itemName);
    expect(createdItem.description).toBe(description);
    expect(createdItem.quantity).toBe(2);

    itemId = createdItem.id;

    // 2. READ - Verifica o item na tabela
    const itemRow = page.getByRole("row").filter({
      has: page.getByRole("cell", {
        name: itemName,
        exact: true,
      }),
    });

    await expect(itemRow).toHaveCount(1);

    await expect(
      itemRow.getByRole("cell", {
        name: description,
        exact: true,
      }),
    ).toBeVisible();

    // Verifica persistência após recarregar
    await page.reload();

    await expect(itemRow).toHaveCount(1);

    // 3. UPDATE - Edita o item
    await itemRow
      .getByRole("button", {
        name: `Editar item ${itemName}`,
      })
      .click();

    await expect(page.getByLabel("Nome", { exact: true })).toHaveValue(
      itemName,
    );

    await expect(page.getByLabel("Descrição (opcional)")).toHaveValue(
      description,
    );

    await expect(page.getByLabel("Quantidade")).toHaveValue("2");

    await page.getByLabel("Nome", { exact: true }).fill(updatedName);

    await page.getByLabel("Descrição (opcional)").fill(updatedDescription);

    await page.getByLabel("Quantidade").fill("5");

    const updateResponsePromise = page.waitForResponse(
      (response) =>
        response.request().method() === "PUT" &&
        new URL(response.url()).pathname.replace(/\/$/, "") ===
          `/items/${itemId}`,
    );

    await page.getByRole("button", { name: "Salvar alterações" }).click();

    const updateResponse = await updateResponsePromise;

    expect(updateResponse.ok()).toBeTruthy();

    // Verifica os novos dados na interface
    const updatedRow = page.getByRole("row").filter({
      has: page.getByRole("cell", {
        name: updatedName,
        exact: true,
      }),
    });

    await expect(updatedRow).toHaveCount(1);

    await expect(
      updatedRow.getByRole("cell", {
        name: updatedDescription,
        exact: true,
      }),
    ).toBeVisible();

    await expect(page.getByText("Item atualizado com sucesso.")).toBeVisible();

    // Recarrega para verificar persistência da edição
    await page.reload();

    await expect(updatedRow).toHaveCount(1);

    await expect(
      updatedRow.getByRole("cell", {
        name: updatedDescription,
        exact: true,
      }),
    ).toBeVisible();

    // Confirma a quantidade atualizada na API
    const getResponse = await request.get(
      `http://localhost:8000/items/${itemId}`,
    );

    expect(getResponse.ok()).toBeTruthy();

    const persistedItem = await getResponse.json();

    expect(persistedItem.name).toBe(updatedName);
    expect(persistedItem.description).toBe(updatedDescription);
    expect(persistedItem.quantity).toBe(5);

    // 4. DELETE - Exclui o item
    page.once("dialog", async (dialog) => {
      expect(dialog.type()).toBe("confirm");
      await dialog.accept();
    });

    const deleteResponsePromise = page.waitForResponse(
      (response) =>
        response.request().method() === "DELETE" &&
        new URL(response.url()).pathname.replace(/\/$/, "") ===
          `/items/${itemId}`,
    );

    await updatedRow
      .getByRole("button", {
        name: `Excluir item ${updatedName}`,
      })
      .click();

    const deleteResponse = await deleteResponsePromise;

    expect(deleteResponse.ok()).toBeTruthy();

    // Verifica que o item desapareceu da tabela
    await expect(updatedRow).toHaveCount(0);

    await expect(page.getByText("Item excluído com sucesso.")).toBeVisible();

    // Recarrega para confirmar exclusão persistente
    await page.reload();

    await expect(updatedRow).toHaveCount(0);

    // Confirma diretamente na API que o item foi excluído
    const deletedItemResponse = await request.get(
      `http://localhost:8000/items/${itemId}`,
    );

    expect(deletedItemResponse.status()).toBe(404);

    // A exclusão foi concluída
    itemId = null;
  } finally {
    // Limpeza: remove o registro se o teste falhar antes do DELETE
    if (itemId !== null) {
      const cleanupResponse = await request.delete(
        `http://localhost:8000/items/${itemId}`,
      );

      if (!cleanupResponse.ok() && cleanupResponse.status() !== 404) {
        console.warn(
          `Não foi possível limpar o item ${itemId}: HTTP ${cleanupResponse.status()}`,
        );
      }
    }
  }
});

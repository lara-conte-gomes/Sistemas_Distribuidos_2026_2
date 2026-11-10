const API_URL = "http://localhost:8000/items/";

async function handleResponse(response, errorMessage) {
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Item não encontrado.");
    }

    if (response.status === 409) {
      throw new Error("Já existe um item com esse nome.");
    }

    throw new Error(errorMessage);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

// Lista todos os itens
export async function listItems() {
  const response = await fetch(API_URL);

  return handleResponse(response, "Erro ao buscar itens.");
}

// Cadastra um novo item
export async function createItem(item) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });

  return handleResponse(response, "Erro ao cadastrar item.");
}

// Atualiza um item existente
export async function updateItem(id, item) {
  const response = await fetch(`${API_URL}${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });

  return handleResponse(response, "Erro ao atualizar item.");
}

// Exclui um item do banco de dados
export async function deleteItem(id) {
  const response = await fetch(`${API_URL}${id}`, {
    method: "DELETE",
  });

  return handleResponse(response, "Erro ao excluir item.");
}

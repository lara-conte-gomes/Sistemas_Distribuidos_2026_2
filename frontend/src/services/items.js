const API_URL = "http://localhost:8000/items/";

export async function listItems() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Erro ao buscar itens.");
  }

  return response.json();
}

export async function createItem(item) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...item,
    }),
  });

  if (!response.ok) {
    if (response.status === 409) {
      throw new Error("Já existe um item com esse nome.");
    }

    throw new Error("Erro ao cadastrar item.");
  }

  return response.json();
}

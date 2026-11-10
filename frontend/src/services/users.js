const API_URL = "http://localhost:8000/users/";

async function handleResponse(response) {
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Usuário não foi encontrado.");
    }

    if (response.status === 409) {
      throw new Error("Já existe um usuário com esses dados cadastrados.");
    }

    throw new Error(`Erro na API: ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export async function listUsers() {
  const response = await fetch(API_URL);

  return handleResponse(response);
}

export async function createUser(user) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  return handleResponse(response);
}

export async function updateUser(id, user) {
  const response = await fetch(`${API_URL}${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  return handleResponse(response);
}

export async function deleteUser(id) {
  const response = await fetch(`${API_URL}${id}`, {
    method: "DELETE",
  });

  return handleResponse(response);
}

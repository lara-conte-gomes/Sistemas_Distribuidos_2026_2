//import
import { API_URL, request } from "./api";

const FUNCIONARIOS_URL = `${API_URL}/funcionario/`;

//funcao para listar os funcionarios cadastrados
export function listFuncionarios() {
  return request(
    FUNCIONARIOS_URL,
    undefined,
    "Erro ao carregar os funcionários cadastrados.",
  );
}

//funcao para cadastrar um funcionario
export function createFuncionario({ nome, idade, cargo }) {
  return request(
    FUNCIONARIOS_URL,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, idade: Number(idade), cargo }),
    },
    "Erro ao cadastrar um funcionário.",
  );
}

//funcao para alterar as informacoes de um funcionario
export function updateFuncionario(id, { nome, idade, cargo }) {
  return request(
    `${FUNCIONARIOS_URL}${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, idade: Number(idade), cargo }),
    },
    "Erro ao alterar as informações do funcionário.",
  );
}

//funcao para excluir um funcionario
export function deleteFuncionario(id) {
  return request(
    `${FUNCIONARIOS_URL}${id}`,
    {
      method: "DELETE",
    },
    "Erro ao excluir o funcionário.",
  );
}
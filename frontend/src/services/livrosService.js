//import 
import { API_URL, request } from "./api";

const LIVROS_URL = `${API_URL}/livro/`;

//funcao para listar os livros
export async function listLivros() {
  const livros = await request(
    LIVROS_URL,
    { method: "GET" },
    "Erro ao listar os livros."
  );

  return livros.map((livro) => ({
    id: livro.id,
    titulo: livro.titulo,
    genero: livro.genero,
    publicoAlvo: livro.publico_alvo,
    qtd: livro.quantidade,
  }));
}

//funcao para cadastrar um livro
export async function createLivro(livro) {
  return request(
    LIVROS_URL,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titulo: livro.titulo,
        genero: livro.genero,
        publico_alvo: livro.publicoAlvo,
        quantidade: Number(livro.qtd),
      }),
    },
    "Erro ao cadastrar o livro."
  );
}

//alterar as informacoes do livro
export async function updateLivro(id, livro) {
  return request(
    `${LIVROS_URL}${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titulo: livro.titulo,
        genero: livro.genero,
        publico_alvo: livro.publicoAlvo,
        quantidade: Number(livro.qtd),
      }),
    },
    "Erro ao atualizar o livro."
  );
}

//excluir um livro
export function deleteLivro(id) {
  return request(
    `${LIVROS_URL}${id}`,
    {
      method: "DELETE",
    },
    "Erro ao excluir o livro.",
  );
}

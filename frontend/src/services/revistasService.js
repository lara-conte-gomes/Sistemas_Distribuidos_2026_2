//import
import { API_URL, request } from "./api";

const REVISTAS_URL = `${API_URL}/revista/`;

//funcao para listar as revistas
export function listRevistas() {
	return request(
		REVISTAS_URL,
		undefined,
		"Erro ao carregar as revistas cadastradas.",
	);
}

//funcao para cadastrar uma revista nova
export async function createRevista(revista) {
	return request(
		REVISTAS_URL,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				titulo: revista.titulo,
				genero: revista.genero,
				edicao: String(revista.edicao),
				quantidade: Number(revista.quantidade),
			}),
		},
		"Erro ao cadastrar a revista.",
	);
}

//funcao para alterar as informacoes de uma revista
export async function updateRevista(id, revista) {
	return request(
		`${REVISTAS_URL}${id}`,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				titulo: revista.titulo,
				genero: revista.genero,
				edicao: String(revista.edicao),
				quantidade: Number(revista.quantidade),
			}),
		},
		"Erro ao atualizar a revista.",
	);
}

//funcao para excluir uma revista cadastrada
export function deleteRevista(id) {
	return request(
		`${REVISTAS_URL}${id}`,
		{
			method: "DELETE",
		},
		"Erro ao excluir a revista.",
	);
}

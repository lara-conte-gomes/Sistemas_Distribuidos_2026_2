export const LIVRO_TITULO_MAX_LENGTH = 100;

export function validateLivro({ titulo, genero, publicoAlvo, qtd }) {
	const errors = {};

	const tituloCerto = String(titulo ?? "").trim();
	const generoCerto = String(genero ?? "").trim();
	const publicoCerto = String(publicoAlvo ?? "").trim();
	const quantidadeTexto = String(qtd ?? "").trim();
	const quantidadeConvertida = Number(quantidadeTexto);

	if (!tituloCerto) {
		errors.titulo = "O título é obrigatório nesse campo.";
	} else if (tituloCerto.length > LIVRO_TITULO_MAX_LENGTH) {
		errors.titulo = "O título deve ter no máximo 100 caracteres.";
	}

	if (!generoCerto) {
		errors.genero = "O gênero é obrigatório nesse campo.";
	}

	if (!publicoCerto) {
		errors.publicoAlvo = "O público-alvo é obrigatório nesse campo.";
	}

	if (!quantidadeTexto) {
		errors.qtd = "A quantidade é obrigatória nesse campo.";
	} else if (
		!Number.isInteger(quantidadeConvertida) ||
		quantidadeConvertida < 0 ||
		!Number.isSafeInteger(quantidadeConvertida)
	) {
		errors.qtd = "A quantidade deve ser um número inteiro não negativo.";
	}

	return {
		errors,
		values: {
			titulo: tituloCerto,
			genero: generoCerto,
			publicoAlvo: publicoCerto,
			qtd: quantidadeConvertida,
		},
	};
}

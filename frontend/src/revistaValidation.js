export const REVISTA_TITULO_MAX_LENGTH = 100;

export function validateRevista({ titulo, genero, edicao, quantidade }) {
	const errors = {};

	const tituloCerto = String(titulo ?? "").trim();
	const generoCerto = String(genero ?? "").trim();
	const edicaoCerta = String(edicao ?? "").trim();
	const quantidadeTexto = String(quantidade ?? "").trim();
	const quantidadeConvertida = Number(quantidadeTexto);

	if (!tituloCerto) {
		errors.titulo = "O título é obrigatório nesse campo.";
	} else if (tituloCerto.length > REVISTA_TITULO_MAX_LENGTH) {
		errors.titulo = "O título deve ter no máximo 100 caracteres.";
	}

	if (!generoCerto) {
		errors.genero = "O gênero é obrigatório nesse campo.";
	}

	if (!edicaoCerta) {
		errors.edicao = "A edição é obrigatória nesse campo.";
	}

	if (!quantidadeTexto) {
		errors.quantidade = "A quantidade é obrigatória nesse campo.";
	} else if (
		!Number.isInteger(quantidadeConvertida) ||
		quantidadeConvertida < 0 ||
		!Number.isSafeInteger(quantidadeConvertida)
	) {
		errors.quantidade = "A quantidade deve ser um número inteiro não negativo.";
	}

	return {
		errors,
		values: {
			titulo: tituloCerto,
			genero: generoCerto,
			edicao: edicaoCerta,
			quantidade: quantidadeConvertida,
		},
	};
}

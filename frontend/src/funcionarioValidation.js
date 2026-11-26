export const FUNCIONARIO_NOME_MAX_LENGTH = 100;

export function validateFuncionario({ nome, idade, cargo }) {
	const errors = {};

	const nomeCerto = String(nome ?? "").trim();
	const idadeTexto = String(idade ?? "").trim();
	const idadeConvertida = Number(idadeTexto);
	const cargoCerto = String(cargo ?? "").trim();

	if (!nomeCerto) {
		errors.nome = "O nome é obrigatório nesse campo.";
	} else if (nomeCerto.length > FUNCIONARIO_NOME_MAX_LENGTH) {
		errors.nome = "O nome deve ter no máximo 100 caracteres.";
	}

	if (!idadeTexto) {
		errors.idade = "A idade é obrigatória nesse campo.";
	} else if (
		!Number.isInteger(idadeConvertida) ||
		idadeConvertida < 0 ||
		!Number.isSafeInteger(idadeConvertida)
	) {
		errors.idade = "A idade deve ser um número inteiro não negativo.";
	}

	if (!cargoCerto) {
		errors.cargo = "O cargo é obrigatório nesse campo.";
	}

	return {
		errors,
		values: {
			nome: nomeCerto,
			idade: idadeConvertida,
			cargo: cargoCerto,
		},
	};
}

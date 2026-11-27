import { useEffect, useState } from "react";
import { validateFuncionario } from "../funcionarioValidation";

export function FuncionarioForm({ onAdd, editando, onCancel }) {
	const [nome, setNome] = useState("");
	const [idade, setIdade] = useState("");
	const [cargo, setCargo] = useState("");
	const [errors, setErrors] = useState({});

	// Preenche os campos quando um funcionário é selecionado
	useEffect(() => {
		setNome(editando?.nome ?? "");
		setIdade(editando?.idade ?? "");
		setCargo(editando?.cargo ?? "");
		setErrors({});
	}, [editando]);

	async function handleSubmit(event) {
		event.preventDefault();

		const result = validateFuncionario({ nome, idade, cargo });
		setErrors(result.errors);

		if (Object.keys(result.errors).length > 0) return;

		try {
			await onAdd(result.values);

			setNome("");
			setIdade("");
			setCargo("");
			setErrors({});
		} catch (error) {
			alert(error.message);
		}
	}

	return (
		<form onSubmit={handleSubmit} noValidate>
			<label htmlFor="funcionario-nome">Nome do funcionário</label>
			<input
				id="funcionario-nome"
				value={nome}
				onChange={(event) => setNome(event.target.value)}
				placeholder="Nome do Funcionário"
			/>
			{errors.nome && <p role="alert">{errors.nome}</p>}

			<label htmlFor="funcionario-idade">Idade do funcionário</label>
			<input
				id="funcionario-idade"
				type="number"
				value={idade}
				onChange={(event) => setIdade(event.target.value)}
				placeholder="Idade do Funcionário"
			/>
			{errors.idade && <p role="alert">{errors.idade}</p>}

			<label htmlFor="funcionario-cargo">Cargo do funcionário</label>
			<input
				id="funcionario-cargo"
				value={cargo}
				onChange={(event) => setCargo(event.target.value)}
				placeholder="Cargo do Funcionário"
			/>
			{errors.cargo && <p role="alert">{errors.cargo}</p>}

			<button type="submit">
				{editando ? "Salvar alterações" : "Cadastrar um funcionário"}
			</button>

			{editando && (
				<button type="button" onClick={onCancel}>
					Cancelar
				</button>
			)}
		</form>
	);
}

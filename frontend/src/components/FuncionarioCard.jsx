export function FuncionarioCard({ funcionarios, onEdit, onDelete }) {
	if (funcionarios.length === 0) {
		return <p>Nenhum funcionário cadastrado.</p>;
	}

	return (
		<div className="lista-funcionarios">
			{funcionarios.map((funcionario) => (
				<div className="cartao-funcionario" key={funcionario.id}>
					{/* Ícone da pessoa */}
					<div className="icone-funcionario">
						<svg
							width="40"
							height="40"
							viewBox="0 0 24 24"
							fill="none"
							stroke="#87501B"
							strokeWidth="1.5"
							strokeLinecap="round"
							aria-hidden="true"
						>
							<circle cx="12" cy="7" r="4" />
							<path d="M4 21v-2a8 8 0 0 1 16 0v2" />
						</svg>
					</div>

					{/* Informações do funcionário */}
					<h3>{funcionario.nome}</h3>
					<p>Idade: {funcionario.idade} anos</p>
					<p>Cargo: {funcionario.cargo}</p>

					<button
						type="button"
						onClick={() => onEdit(funcionario)}
						style={{ marginBottom: "20px" }}
						aria-label={`Editar funcionário ${funcionario.nome}`}
					>
						Alterar
					</button>

					<button
						type="button"
						onClick={() => onDelete(funcionario.id)}
						aria-label={`Excluir funcionário ${funcionario.nome}`}
					>
						Excluir
					</button>
				</div>
			))}
		</div>
	);
}


import { useState } from "react";
import { validateFuncionario } from "../funcionarioValidation";

export function FuncionarioForm({ onAdd }) {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [cargo, setCargo] = useState("");
  const [errors, setErrors] = useState({});

  function handleSubmit(event) {
    event.preventDefault();

    const result = validateFuncionario({ nome, idade, cargo });
    setErrors(result.errors);

    if (Object.keys(result.errors).length > 0) return;

    onAdd(result.values);

    setNome("");
    setIdade("");
    setCargo("");
    setErrors({});
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

      <button type="submit">Cadastrar um funcionário</button>
    </form>
  );
}

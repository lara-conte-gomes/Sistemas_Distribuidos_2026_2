export const USER_NAME_MAX_LENGTH = 100;

export function validateUser({ name, age }) {
  const errors = {};
  const trimmedName = String(name ?? "").trim();
  const ageText = String(age ?? "").trim();
  const parsedAge = Number(ageText);

  if (!trimmedName) {
    errors.name = "O nome é obrigatório.";
  } else if (trimmedName.length > USER_NAME_MAX_LENGTH) {
    errors.name = "O nome deve ter no máximo 100 caracteres.";
  }

  if (!ageText) {
    errors.age = "A idade é obrigatória.";
  } else if (
    !Number.isInteger(parsedAge) ||
    parsedAge < 0 ||
    !Number.isSafeInteger(parsedAge)
  ) {
    errors.age = "A idade deve ser um número inteiro não negativo.";
  }

  return {
    errors,
    values: {
      name: trimmedName,
      age: parsedAge,
    },
  };
}

export const NAME_MAX_LENGTH = 100;

export function validateItem({ name, description, quantity = "1" }) {
  const errors = {};

  const trimmedName = name.trim();
  const parsedQuantity = Number(quantity);

  if (!trimmedName) {
    errors.name = "O nome é obrigatório.";
  } else if (trimmedName.length > NAME_MAX_LENGTH) {
    errors.name = `O nome deve ter no máximo ${NAME_MAX_LENGTH} caracteres.`;
  }

  if (
    String(quantity).trim() === "" ||
    !Number.isSafeInteger(parsedQuantity) ||
    parsedQuantity < 1
  ) {
    errors.quantity = "A quantidade deve ser um número inteiro maior que zero.";
  }

  return {
    errors,
    values: {
      name: trimmedName,
      description: description.trim(),
      quantity: parsedQuantity,
    },
  };
}

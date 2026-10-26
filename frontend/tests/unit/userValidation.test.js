import { describe, expect, it } from "vitest";
import { validateUser } from "../../src/userValidation";

describe("validateUser", () => {
  it("rejeita nome vazio", () => {
    const { errors } = validateUser({
      name: "   ",
      age: "20",
    });

    expect(errors.name).toBeDefined();
  });

  it("rejeita nomes com mais de 100 caracteres", () => {
    const { errors } = validateUser({
      name: "A".repeat(101),
      age: "20",
    });

    expect(errors.name).toBeDefined();
  });

  it("rejeita idade vazia", () => {
    const { errors } = validateUser({
      name: "Maria",
      age: "",
    });

    expect(errors.age).toBeDefined();
  });

  it("rejeita idade negativa ou decimal", () => {
    expect(validateUser({ name: "Maria", age: "-1" }).errors.age).toBeDefined();
    expect(
      validateUser({ name: "Maria", age: "20.5" }).errors.age,
    ).toBeDefined();
  });

  it("aceita usuário válido e remove espaços", () => {
    const { errors, values } = validateUser({
      name: "  Maria  ",
      age: "25",
    });

    expect(errors).toEqual({});
    expect(values).toEqual({
      name: "Maria",
      age: 25,
    });
  });
});

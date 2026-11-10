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

  it("aceita nome com exatamente 100 caracteres", () => {
    const { errors } = validateUser({
      name: "A".repeat(100),
      age: "20",
    });

    expect(errors.name).toBeUndefined();
  });

  it("rejeita idade vazia", () => {
    const { errors } = validateUser({
      name: "Maria",
      age: "",
    });

    expect(errors.age).toBeDefined();
  });

  it("rejeita idade negativa", () => {
    const { errors } = validateUser({
      name: "Maria",
      age: "-1",
    });

    expect(errors.age).toBeDefined();
  });

  it("rejeita idade decimal", () => {
    const { errors } = validateUser({
      name: "Maria",
      age: "20.5",
    });

    expect(errors.age).toBeDefined();
  });

  it("rejeita idade que não é numérica", () => {
    const { errors } = validateUser({
      name: "Maria",
      age: "abc",
    });

    expect(errors.age).toBeDefined();
  });

  it("aceita idade igual a zero", () => {
    const { errors, values } = validateUser({
      name: "Maria",
      age: "0",
    });

    expect(errors).toEqual({});
    expect(values.age).toBe(0);
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

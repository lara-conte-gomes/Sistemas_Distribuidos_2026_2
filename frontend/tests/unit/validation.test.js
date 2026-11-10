import { describe, expect, it } from "vitest";
import { validateItem } from "../../src/validation";

describe("validateItem", () => {
  it("rejeita nome vazio ou só com espaços", () => {
    const { errors } = validateItem({
      name: "   ",
      description: "",
      quantity: "1",
    });

    expect(errors.name).toBeDefined();
  });

  it("aceita um item válido", () => {
    const { errors, values } = validateItem({
      name: "Notebook",
      description: "Computador portátil",
      quantity: "2",
    });

    expect(errors).toEqual({});

    expect(values).toEqual({
      name: "Notebook",
      description: "Computador portátil",
      quantity: 2,
    });
  });

  it("rejeita nomes com mais de 100 caracteres", () => {
    const { errors } = validateItem({
      name: "A".repeat(101),
      description: "",
      quantity: "1",
    });

    expect(errors.name).toBeDefined();
  });

  it("aceita nomes com exatamente 100 caracteres", () => {
    const { errors } = validateItem({
      name: "A".repeat(100),
      description: "",
      quantity: "1",
    });

    expect(errors.name).toBeUndefined();
  });

  it("remove espaços no início e no final dos campos", () => {
    const { errors, values } = validateItem({
      name: "  Notebook  ",
      description: "  Computador portátil  ",
      quantity: "2",
    });

    expect(errors).toEqual({});
    expect(values.name).toBe("Notebook");
    expect(values.description).toBe("Computador portátil");
    expect(values.quantity).toBe(2);
  });

  it("aceita descrição vazia", () => {
    const { errors, values } = validateItem({
      name: "Mouse",
      description: "",
      quantity: "1",
    });

    expect(errors).toEqual({});
    expect(values.description).toBe("");
  });

  it("rejeita quantidade vazia", () => {
    const { errors } = validateItem({
      name: "Notebook",
      description: "",
      quantity: "",
    });

    expect(errors.quantity).toBeDefined();
  });

  it("rejeita quantidade igual a zero", () => {
    const { errors } = validateItem({
      name: "Notebook",
      description: "",
      quantity: "0",
    });

    expect(errors.quantity).toBeDefined();
  });

  it("rejeita quantidade negativa", () => {
    const { errors } = validateItem({
      name: "Notebook",
      description: "",
      quantity: "-5",
    });

    expect(errors.quantity).toBeDefined();
  });

  it("rejeita quantidade decimal", () => {
    const { errors } = validateItem({
      name: "Notebook",
      description: "",
      quantity: "2.5",
    });

    expect(errors.quantity).toBeDefined();
  });

  it("rejeita quantidade não numérica", () => {
    const { errors } = validateItem({
      name: "Notebook",
      description: "",
      quantity: "abc",
    });

    expect(errors.quantity).toBeDefined();
  });

  it("aceita quantidade igual a um", () => {
    const { errors, values } = validateItem({
      name: "Notebook",
      description: "",
      quantity: "1",
    });

    expect(errors).toEqual({});
    expect(values.quantity).toBe(1);
  });

  it("aceita quantidade inteira positiva", () => {
    const { errors, values } = validateItem({
      name: "Teclado",
      description: "Mecânico",
      quantity: "100",
    });

    expect(errors).toEqual({});
    expect(values.quantity).toBe(100);
  });
});

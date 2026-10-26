import { describe, expect, it } from "vitest";
import { validateItem } from "../../src/validation";

describe("validateItem", () => {
  it("rejeita nome vazio ou só com espaços", () => {
    const { errors } = validateItem({
      name: "   ",
      description: "",
    });

    expect(errors.name).toBeDefined();
  });

  it("aceita um nome válido", () => {
    const { errors, values } = validateItem({
      name: "Notebook",
      description: "Computador portátil",
    });

    expect(errors).toEqual({});
    expect(values.name).toBe("Notebook");
  });

  it("rejeita nomes com mais de 100 caracteres", () => {
    const { errors } = validateItem({
      name: "A".repeat(101),
      description: "",
    });

    expect(errors.name).toBeDefined();
  });

  it("remove espaços no início e no final dos campos", () => {
    const { values } = validateItem({
      name: "  Notebook  ",
      description: "  Computador portátil  ",
    });

    expect(values.name).toBe("Notebook");
    expect(values.description).toBe("Computador portátil");
  });
});

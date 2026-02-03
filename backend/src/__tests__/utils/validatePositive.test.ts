import { validatePositive } from "../../utils/validatePositive";

describe("validatePositive utility", () => {
  it("does nothing when the value is greater than zero", () => {
    expect(() => validatePositive(10, "amount")).not.toThrow();
    expect(() => validatePositive(0.5, "rate")).not.toThrow();
  });

  it("throws an error when the value is zero", () => {
    expect(() => validatePositive(0, "amount")).toThrow(
      "amount must be positive"
    );
  });

  it("throws an error when the value is negative", () => {
    expect(() => validatePositive(-5, "amount")).toThrow(
      "amount must be positive"
    );
  });
});

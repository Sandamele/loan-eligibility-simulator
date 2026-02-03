import { monthlyPayment } from "../../../services/loanCalculations/monthlyPayment";

describe("monthlyPayment calculation", () => {
  it("calculates the monthly payment correctly for a normal loan", () => {
    const result = monthlyPayment(100000, 12, 12);
    expect(result).toBeCloseTo(8884.88, 2);
  });

  it("handles zero interest rate", () => {
    const result = monthlyPayment(12000, 0, 12);
    expect(result).toBe(1000);
  });

  describe("invalid input values", () => {
    it("throws if interest rate is negative", () => {
      expect(() => monthlyPayment(10000, -5, 12)).toThrow(
        "Interest rate cannot be negative"
      );
    });

    it("throws if principal is zero or negative", () => {
      expect(() => monthlyPayment(0, 5, 12)).toThrow(
        "Principal must be positive"
      );
      expect(() => monthlyPayment(-5000, 5, 12)).toThrow(
        "Principal must be positive"
      );
    });

    it("throws if loan term is zero or negative", () => {
      expect(() => monthlyPayment(10000, 5, 0)).toThrow(
        "Loan Term (months) must be positive"
      );
      expect(() => monthlyPayment(10000, 5, -6)).toThrow(
        "Loan Term (months) must be positive"
      );
    });
  });
});

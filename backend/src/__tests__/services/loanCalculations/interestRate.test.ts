import { interestRate } from "../../../services/loanCalculations/interestRate";

describe("interestRate calculation", () => {
  it("calculates rate correctly for a normal risk score", () => {
    const rate = interestRate(5, 15, 50); 
    expect(rate).toBe(10); 
  });

  it("clamps riskScore to 0-100 range", () => {
    expect(interestRate(5, 15, -20)).toBe(5);
    expect(interestRate(5, 15, 200)).toBe(15);
  });

  describe("validation errors", () => {
    it("throws if minInterestRate or maxInterestRate are negative", () => {
      expect(() => interestRate(-1, 10, 50)).toThrow(
        "Interest rates cannot be negative",
      );
      expect(() => interestRate(5, -10, 50)).toThrow(
        "Interest rates cannot be negative",
      );
    });

    it("throws if minInterestRate is greater than maxInterestRate", () => {
      expect(() => interestRate(15, 5, 50)).toThrow(
        "minInterestRate cannot exceed maxInterestRate",
      );
    });
  });
});

import { loanToIncomeRatio } from "../../../services/loanCalculations/loanToIncomeRatio";
import { roundToCents } from "../../../utils/roundToCents";
import { validatePositive } from "../../../utils/validatePositive";

jest.mock("../../../utils/validatePositive");
jest.mock("../../../utils/roundToCents");

describe("loanToIncomeRatio function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calculates the correct ratio and rounds it", () => {
    (roundToCents as jest.Mock).mockImplementation((x: number) => x);

    const result = loanToIncomeRatio(2000, 10000); // 2000/10000*100 = 20
    expect(result).toBe(20);

    expect(validatePositive).toHaveBeenCalledWith(2000, "Monthly Payment");
    expect(validatePositive).toHaveBeenCalledWith(10000, "Monthly Income");
    expect(roundToCents).toHaveBeenCalledWith(20);
  });

  describe("validation errors", () => {
    it("calls validatePositive and throws on invalid input", () => {
      (validatePositive as jest.Mock).mockImplementation(
        (value: number, name: string) => {
          if (value <= 0) throw new Error(`${name} must be positive`);
        },
      );

      expect(() => loanToIncomeRatio(0, 10000)).toThrow(
        "Monthly Payment must be positive",
      );
      expect(() => loanToIncomeRatio(2000, 0)).toThrow(
        "Monthly Income must be positive",
      );
    });
  });
});

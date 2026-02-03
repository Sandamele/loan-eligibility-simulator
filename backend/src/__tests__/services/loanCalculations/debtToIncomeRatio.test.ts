import { debtToIncomeRatio } from "../../../services/loanCalculations/debtToIncomeRatio";
import { roundToCents } from "../../../utils/roundToCents";
import { validatePositive } from "../../../utils/validatePositive";

jest.mock("../../../utils/validatePositive");
jest.mock("../../../utils/roundToCents");

describe("debtToIncomeRatio function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calculates DTI correctly and rounds it", () => {
    (roundToCents as jest.Mock).mockImplementation((x: number) => x);

    const result = debtToIncomeRatio(10000, 5000, 2000);
    // (5000 + 2000) / 10000 * 100 = 70
    expect(result).toBe(70);

    expect(validatePositive).toHaveBeenCalledWith(10000, "Monthly Income");
    expect(roundToCents).toHaveBeenCalledWith(70);
  });

  describe("validation errors", () => {
    it("throws if monthlyIncome is zero or negative", () => {
      (validatePositive as jest.Mock).mockImplementation(
        (value: number, name: string) => {
          if (value <= 0) throw new Error(`${name} must be positive`);
        },
      );

      expect(() => debtToIncomeRatio(0, 5000, 2000)).toThrow(
        "Monthly Income must be positive",
      );
      expect(() => debtToIncomeRatio(-10000, 5000, 2000)).toThrow(
        "Monthly Income must be positive",
      );
    });
  });
});

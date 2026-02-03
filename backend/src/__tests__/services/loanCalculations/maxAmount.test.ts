import { disposableIncome } from "../../../services/loanCalculations/disposableIncome";
import { maxAmount } from "../../../services/loanCalculations/maxAmount";

jest.mock("../../../services/loanCalculations/disposableIncome");

describe("maxAmount calculation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calculates max loan amount based on disposable income", () => {
    (disposableIncome as jest.Mock).mockReturnValue(5000);
    const result = maxAmount(20000, 10000, 5000, 200000);

    expect(result).toBe(180000);
    expect(disposableIncome).toHaveBeenCalledWith(20000, 10000, 5000);
  });

  it("caps the amount at loanMaxAmount if estimated exceeds it", () => {
    (disposableIncome as jest.Mock).mockReturnValue(7000);
    const result = maxAmount(20000, 10000, 5000, 200000);

    expect(result).toBe(200000);
  });

  describe("validation errors", () => {
    it("throws if monthlyIncome, monthlyExpenses, or existingDebt are negative", () => {
      expect(() => maxAmount(-1000, 5000, 0, 200000)).toThrow(
        "Income, expenses, and debt must be non-negative",
      );
      expect(() => maxAmount(10000, -500, 0, 200000)).toThrow(
        "Income, expenses, and debt must be non-negative",
      );
      expect(() => maxAmount(10000, 5000, -300, 200000)).toThrow(
        "Income, expenses, and debt must be non-negative",
      );
    });
  });
});

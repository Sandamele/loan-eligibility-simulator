import { getAffordabilityAnalysis } from "../../../services/eligibility/getAffordabilityAnalysis";
import { affordabilityScore } from "../../../services/loanCalculations/calculateScore/affordabilityScore";
import { debtToIncomeRatio } from "../../../services/loanCalculations/debtToIncomeRatio";
import { disposableIncome } from "../../../services/loanCalculations/disposableIncome";
import { loanToIncomeRatio } from "../../../services/loanCalculations/loanToIncomeRatio";

jest.mock(
  "../../../services/loanCalculations/calculateScore/affordabilityScore",
);
jest.mock("../../../services/loanCalculations/debtToIncomeRatio");
jest.mock("../../../services/loanCalculations/disposableIncome");
jest.mock("../../../services/loanCalculations/loanToIncomeRatio");

describe("getAffordabilityAnalysis", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call calculation functions with correct values and return expected result", () => {
    (disposableIncome as jest.Mock).mockReturnValue(5000);
    (debtToIncomeRatio as jest.Mock).mockReturnValue(0.35);
    (loanToIncomeRatio as jest.Mock).mockReturnValue(0.25);
    (affordabilityScore as jest.Mock).mockReturnValue(78);

    const input = {
      monthlyIncome: 20000,
      monthlyExpenses: 10000,
      existingDebt: 5000,
      estimatedMonthlyPayment: 3000,
      creditScore: 720,
    };

    const result = getAffordabilityAnalysis(input);

    expect(disposableIncome).toHaveBeenCalledWith(20000, 10000, 5000);

    expect(debtToIncomeRatio).toHaveBeenCalledWith(20000, 10000, 5000);

    expect(loanToIncomeRatio).toHaveBeenCalledWith(3000, 20000);

    expect(affordabilityScore).toHaveBeenCalledWith(3000, 5000, 720);

    expect(result).toEqual({
      disposableIncome: 5000,
      debtToIncomeRatio: 0.35,
      loanToIncomeRatio: 0.25,
      affordabilityScore: 78,
    });
  });
});

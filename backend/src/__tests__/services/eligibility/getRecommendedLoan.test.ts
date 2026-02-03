import { getRecommendedLoan } from "../../../services/eligibility/getRecommendedLoan";
import { maxAmount } from "../../../services/loanCalculations/maxAmount";
import { monthlyPayment } from "../../../services/loanCalculations/monthlyPayment";
import { totalPayment } from "../../../services/loanCalculations/totalPayment";

jest.mock("../../../services/loanCalculations/maxAmount");
jest.mock("../../../services/loanCalculations/monthlyPayment");
jest.mock("../../../services/loanCalculations/totalPayment");

describe("getRecommendedLoan", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should calculate monthly payment and return recommended loan details", () => {
    (monthlyPayment as jest.Mock).mockReturnValue(2500);
    (maxAmount as jest.Mock).mockReturnValue(150000);
    (totalPayment as jest.Mock).mockReturnValue(90000);

    const input = {
      requestedAmount: 100000,
      loanTerm: 36,
      estimatedInterestRate: 12,
      monthlyIncome: 20000,
      monthlyExpenses: 8000,
      existingDebt: 3000,
      loanMaxAmount: 300000,
    };

    const result = getRecommendedLoan(input);

    expect(monthlyPayment).toHaveBeenCalledWith(100000, 12, 36);

    expect(maxAmount).toHaveBeenCalledWith(20000, 8000, 3000, 300000);

    expect(totalPayment).toHaveBeenCalledWith(2500, 36);

    expect(result).toEqual({
      estimatedMonthlyPayment: 2500,
      recommendedLoan: {
        maxAmount: 150000,
        recommendedAmount: 100000,
        interestRate: 12,
        monthlyPayment: 2500,
        totalRepayment: 90000,
      },
    });
  });
});

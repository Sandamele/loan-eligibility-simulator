import { getEligibilityResult } from "../../../services/eligibility/getEligibilityResult";
import { approvalLikelihood } from "../../../services/loanCalculations/approvalLikelihood";
import { assessRisk } from "../../../services/loanCalculations/assessRisk";
import { decisionReason } from "../../../services/loanCalculations/decisionReason";
import { interestRate } from "../../../services/loanCalculations/interestRate";
import { isEligible } from "../../../services/loanCalculations/isEligible";
import type { EmploymentStatus } from "../../../services/loanCalculations/calculateScore/employmentScore";

jest.mock("../../../services/loanCalculations/approvalLikelihood");
jest.mock("../../../services/loanCalculations/assessRisk");
jest.mock("../../../services/loanCalculations/decisionReason");
jest.mock("../../../services/loanCalculations/interestRate");
jest.mock("../../../services/loanCalculations/isEligible");

describe("getEligibilityResult", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call all calculation helpers correctly and return expected result", () => {
    (assessRisk as jest.Mock).mockReturnValue({
      riskScore: 72,
      riskCategory: "Low",
    });
    (interestRate as jest.Mock).mockReturnValue(12.5);
    (isEligible as jest.Mock).mockReturnValue(true);
    (approvalLikelihood as jest.Mock).mockReturnValue(80);
    (decisionReason as jest.Mock).mockReturnValue("Strong affordability");

    const input: {
      creditScore: number;
      monthlyIncome: number;
      monthlyExpenses: number;
      existingDebt: number;
      employmentStatus: EmploymentStatus;
      employmentDuration: number;
      minRate: number;
      maxRate: number;
    } = {
      creditScore: 720,
      monthlyIncome: 20000,
      monthlyExpenses: 8000,
      existingDebt: 3000,
      employmentStatus: "employed",
      employmentDuration: 24,
      minRate: 8,
      maxRate: 25,
    };

    const result = getEligibilityResult(input);

    expect(assessRisk).toHaveBeenCalledWith(
      720,
      20000,
      8000,
      3000,
      "employed",
      24,
    );

    expect(interestRate).toHaveBeenCalledWith(8, 25, 72);

    expect(isEligible).toHaveBeenCalledWith(72);
    expect(approvalLikelihood).toHaveBeenCalledWith(72);

    expect(decisionReason).toHaveBeenCalledWith(
      20000,
      8000,
      3000,
      72,
      expect.any(Object),
    );

    expect(result).toEqual({
      riskScore: {
        riskScore: 72,
        riskCategory: "Low",
      },
      estimatedInterestRate: 12.5,
      eligibilityResult: {
        isEligible: true,
        approvalLikelihood: 80,
        riskCategory: "Low",
        decisionReason: "Strong affordability",
      },
    });
  });
});

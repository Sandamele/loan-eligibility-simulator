import { assessRisk } from "../../../services/loanCalculations/assessRisk";
import { creditScorePoints } from "../../../services/loanCalculations/calculateScore/creditScorePoints";
import {
  employmentScore,
  EmploymentStatus,
} from "../../../services/loanCalculations/calculateScore/employmentScore";
import { debtToIncomeRatio } from "../../../services/loanCalculations/debtToIncomeRatio";
import { riskCategory } from "../../../services/loanCalculations/riskCategory";
import { roundToCents } from "../../../utils/roundToCents";
import { validatePositive } from "../../../utils/validatePositive";

jest.mock("../../../utils/roundToCents");
jest.mock("../../../utils/validatePositive");
jest.mock(
  "../../../services/loanCalculations/calculateScore/creditScorePoints",
);
jest.mock("../../../services/loanCalculations/calculateScore/employmentScore");
jest.mock("../../../services/loanCalculations/debtToIncomeRatio");
jest.mock("../../../services/loanCalculations/riskCategory");

describe("assessRisk function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calculates riskScore and category correctly", () => {
    (creditScorePoints as jest.Mock).mockReturnValue(80); // creditStrength
    (debtToIncomeRatio as jest.Mock).mockReturnValue(25); // DTI
    (employmentScore as jest.Mock).mockReturnValue(20); // employmentRisk
    (roundToCents as jest.Mock).mockImplementation((x: number) => x);
    (riskCategory as jest.Mock).mockReturnValue("Low");

    const result = assessRisk(
      700,
      20000,
      8000,
      3000,
      "employed" as EmploymentStatus,
      24,
    );

    expect(validatePositive).toHaveBeenCalledWith(20000, "Monthly Income");
    expect(creditScorePoints).toHaveBeenCalledWith(700);
    expect(debtToIncomeRatio).toHaveBeenCalledWith(20000, 8000, 3000);
    expect(employmentScore).toHaveBeenCalledWith("employed", 24);
    expect(roundToCents).toHaveBeenCalledWith((100 - 80 + 30 + 20) / 3);
    expect(riskCategory).toHaveBeenCalledWith(23.333333333333332);

    expect(result).toEqual({
      riskScore: 23.333333333333332,
      riskCategory: "Low",
    });
  });

  describe("validation errors", () => {
    it("throws if creditScore is out of range", () => {
      expect(() =>
        assessRisk(200, 20000, 8000, 3000, "employed" as EmploymentStatus, 24),
      ).toThrow("Credit score must be between 300 and 850");
      expect(() =>
        assessRisk(900, 20000, 8000, 3000, "employed" as EmploymentStatus, 24),
      ).toThrow("Credit score must be between 300 and 850");
    });
  });
});

import { affordabilityScore } from "../../../services/loanCalculations/calculateScore/affordabilityScore";
import { creditScorePoints } from "../../../services/loanCalculations/calculateScore/creditScorePoints";
import { incomeScore } from "../../../services/loanCalculations/calculateScore/incomeScore";
import { validatePositive } from "../../../utils/validatePositive";

jest.mock("../../../utils/validatePositive");
jest.mock(
  "../../../services/loanCalculations/calculateScore/creditScorePoints",
);
jest.mock("../../../services/loanCalculations/calculateScore/incomeScore");

describe("affordabilityScore function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calculates the correct score category based on average strength", () => {
    (creditScorePoints as jest.Mock).mockReturnValue(90);
    (incomeScore as jest.Mock).mockReturnValue(70);

    const result = affordabilityScore(3000, 10000, 720);
    // average (90+70)/2 = 80 → "Excellent"
    expect(result).toBe("Excellent");

    (creditScorePoints as jest.Mock).mockReturnValue(70);
    (incomeScore as jest.Mock).mockReturnValue(60);
    expect(affordabilityScore(3000, 10000, 720)).toBe("good");

    (creditScorePoints as jest.Mock).mockReturnValue(50);
    (incomeScore as jest.Mock).mockReturnValue(50);
    expect(affordabilityScore(3000, 10000, 720)).toBe("poor");
  });

  describe("validation errors", () => {
    it("calls validatePositive for monthlyPayment", () => {
      affordabilityScore(3000, 10000, 720);
      expect(validatePositive).toHaveBeenCalledWith(3000, "Monthly payment");
    });

    it("throws if creditScore is out of range", () => {
      expect(() => affordabilityScore(3000, 10000, 200)).toThrow(
        "Credit score must be between 300 and 850",
      );
      expect(() => affordabilityScore(3000, 10000, 900)).toThrow(
        "Credit score must be between 300 and 850",
      );
    });
  });
});

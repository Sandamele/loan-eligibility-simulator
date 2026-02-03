import { approvalLikelihood } from "../../../services/loanCalculations/approvalLikelihood";
import { isEligible } from "../../../services/loanCalculations/isEligible";

jest.mock("../../../services/loanCalculations/approvalLikelihood");

describe("isEligible function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns true if approvalLikelihood meets or exceeds the threshold", () => {
    (approvalLikelihood as jest.Mock).mockReturnValue(60);

    expect(isEligible(70)).toBe(true);
    expect(approvalLikelihood).toHaveBeenCalledWith(70);

    (approvalLikelihood as jest.Mock).mockReturnValue(40);
    expect(isEligible(30, 30)).toBe(true);
    expect(approvalLikelihood).toHaveBeenCalledWith(30);
  });

  it("returns false if approvalLikelihood is below the threshold", () => {
    (approvalLikelihood as jest.Mock).mockReturnValue(40);

    expect(isEligible(70)).toBe(false);
    expect(approvalLikelihood).toHaveBeenCalledWith(70);
  });
});

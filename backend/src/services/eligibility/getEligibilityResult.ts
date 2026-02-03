import { approvalLikelihood } from "../loanCalculations/approvalLikelihood";
import { assessRisk } from "../loanCalculations/assessRisk";
import { EmploymentStatus } from "../loanCalculations/calculateScore/employmentScore";
import { decisionMessages } from "../loanCalculations/decisionMessages";
import { decisionReason } from "../loanCalculations/decisionReason";
import { interestRate } from "../loanCalculations/interestRate";
import { isEligible } from "../loanCalculations/isEligible";

export const getEligibilityResult = ({
  creditScore,
  monthlyIncome,
  monthlyExpenses,
  existingDebt,
  employmentStatus,
  employmentDuration,
  minRate,
  maxRate,
}: {
  creditScore: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  existingDebt: number;
  employmentStatus: EmploymentStatus;
  employmentDuration: number;
  minRate: number;
  maxRate: number;
}) => {
  const riskScore = assessRisk(
    creditScore,
    monthlyIncome,
    monthlyExpenses,
    existingDebt,
    employmentStatus,
    employmentDuration,
  );

  const estimatedInterestRate = interestRate(
    minRate,
    maxRate,
    riskScore.riskScore,
  );

  return {
    riskScore,
    estimatedInterestRate,
    eligibilityResult: {
      isEligible: isEligible(riskScore.riskScore),
      approvalLikelihood: approvalLikelihood(riskScore.riskScore),
      riskCategory: riskScore.riskCategory,
      decisionReason: decisionReason(
        monthlyIncome,
        monthlyExpenses,
        existingDebt,
        riskScore.riskScore,
        decisionMessages,
      ),
    },
  };
};

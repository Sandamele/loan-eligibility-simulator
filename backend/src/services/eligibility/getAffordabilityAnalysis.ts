import { affordabilityScore } from "../loanCalculations/calculateScore/affordabilityScore";
import { debtToIncomeRatio } from "../loanCalculations/debtToIncomeRatio";
import { disposableIncome } from "../loanCalculations/disposableIncome";
import { loanToIncomeRatio } from "../loanCalculations/loanToIncomeRatio";

export const getAffordabilityAnalysis = ({
  monthlyIncome,
  monthlyExpenses,
  existingDebt,
  estimatedMonthlyPayment,
  creditScore,
}: {
  monthlyIncome: number;
  monthlyExpenses: number;
  existingDebt: number;
  estimatedMonthlyPayment: number;
  creditScore: number;
}) => {
  const disposable = disposableIncome(
    monthlyIncome,
    monthlyExpenses,
    existingDebt,
  );

  return {
    disposableIncome: disposable,
    debtToIncomeRatio: debtToIncomeRatio(
      monthlyIncome,
      monthlyExpenses,
      existingDebt,
    ),
    loanToIncomeRatio: loanToIncomeRatio(
      estimatedMonthlyPayment,
      monthlyIncome,
    ),
    affordabilityScore: affordabilityScore(
      estimatedMonthlyPayment,
      disposable,
      creditScore,
    ),
  };
};

import { debtToIncomeRatio } from "./debtToIncomeRatio";
import { disposableIncome } from "./disposableIncome";

export const decisionReason = (
  monthlyIncome: number,
  monthlyExpenses: number,
  existingDebt: number,
  riskScore: number,
  decisionMessages: Record<string, string>,
): string => {
  const disposable = disposableIncome(
    monthlyIncome,
    monthlyExpenses,
    existingDebt,
  );
  const dti = debtToIncomeRatio(monthlyIncome, monthlyExpenses, existingDebt);
  if (riskScore > 70) return decisionMessages.highRisk;

  const isStrongIncome = disposable > monthlyIncome * 0.4;
  const isLowDebt = dti < 35;

  if (isStrongIncome && isLowDebt) {
    return decisionMessages.strongIncomeDebt;
  }

  if (riskScore <= 50 && dti < 45) {
    return "Balanced financial profile with moderate debt levels";
  }

  return decisionMessages.weakIncomeDebt;
};

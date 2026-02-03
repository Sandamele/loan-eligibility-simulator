import { roundToCents } from "../../utils/roundToCents";
import { disposableIncome } from "./disposableIncome";

export const maxAmount = (
  monthlyIncome: number,
  monthlyExpenses: number,
  existingDebt: number,
  loanMaxAmount: number,
): number => {
  if (monthlyIncome < 0 || monthlyExpenses < 0 || existingDebt < 0) {
    throw new Error("Income, expenses, and debt must be non-negative");
  }

  const disposable = disposableIncome(
    monthlyIncome,
    monthlyExpenses,
    existingDebt,
  );

  const estimatedAmount = roundToCents(disposable * 36);

  return Math.min(Math.max(estimatedAmount, 0), loanMaxAmount);
};

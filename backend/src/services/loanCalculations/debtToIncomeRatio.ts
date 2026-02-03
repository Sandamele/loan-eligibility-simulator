import { validatePositive } from "../../utils/validatePositive";
import { roundToCents } from "../../utils/roundToCents";

export const debtToIncomeRatio = (
  monthlyIncome: number,
  monthlyExpenses: number,
  existingDebt: number,
) => {
  validatePositive(monthlyIncome, "Monthly Income");
  const total = ((existingDebt + monthlyExpenses) / monthlyIncome) * 100;
  return roundToCents(total);
};

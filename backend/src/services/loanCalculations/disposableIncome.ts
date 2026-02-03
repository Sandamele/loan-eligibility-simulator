import { roundToCents } from "../../utils/roundToCents";
import { validatePositive } from "../../utils/validatePositive";

export const disposableIncome = (
  monthlyIncome: number,
  monthlyExpenses: number,
  existingDebt: number,
) => {
  validatePositive(monthlyIncome, "Monthly Income");

  const total = monthlyIncome - monthlyExpenses - existingDebt;

  return roundToCents(Math.max(total, 0));
};

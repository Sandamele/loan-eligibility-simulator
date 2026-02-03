import { roundToCents } from "../../utils/roundToCents";
import { validatePositive } from "../../utils/validatePositive";

export const loanToIncomeRatio = (
  monthlyPayment: number,
  monthlyIncome: number,
) => {
  validatePositive(monthlyPayment, "Monthly Payment");
  validatePositive(monthlyIncome, "Monthly Income");

  const total = (monthlyPayment / monthlyIncome) * 100;
  return roundToCents(total);
};

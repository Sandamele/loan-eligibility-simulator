import { roundToCents } from "../../utils/roundToCents";
import { validatePositive } from "../../utils/validatePositive";

export const monthlyPayment = (
  principal: number,
  interestRate: number,
  loanTermMonths: number,
) => {
  validatePositive(principal, "Principal");
  validatePositive(loanTermMonths, "Loan Term (months)");
  if (interestRate < 0) {
    throw new Error("Interest rate cannot be negative");
  }
  if (interestRate === 0) {
    return roundToCents(principal / loanTermMonths);
  }

  const monthlyRate = interestRate / 100 / 12;

  const ratePower = Math.pow(1 + monthlyRate, loanTermMonths);

  const monthlyPayment =
    (principal * monthlyRate * ratePower) / (ratePower - 1);

  return roundToCents(monthlyPayment);
};

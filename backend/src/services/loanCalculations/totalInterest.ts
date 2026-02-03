import { roundToCents } from "../../utils/roundToCents";
import { validatePositive } from "../../utils/validatePositive";

export const totalInterest = (
  principal: number,
  monthlyPayment: number,
  loanTermMonths: number,
) => {
  validatePositive(principal, "Principal");
  const totalPaid = monthlyPayment * loanTermMonths;
  const interest = totalPaid - principal;
  return roundToCents(interest);
};

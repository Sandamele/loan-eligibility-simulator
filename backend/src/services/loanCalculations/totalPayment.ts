import { roundToCents } from "../../utils/roundToCents";

export const totalPayment = (
  monthlyPayment: number,
  loanTermMonths: number,
) => {
  return roundToCents(monthlyPayment * loanTermMonths);
};

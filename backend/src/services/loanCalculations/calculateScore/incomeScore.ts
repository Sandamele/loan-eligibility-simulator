import { roundToCents } from "../../../utils/roundToCents";

export const incomeScore = (
  monthlyPayment: number,
  disposableIncome: number
) => {
  if (monthlyPayment <= 0 || disposableIncome <= 0) {
    return 25;
  }

  const coverageRatio = disposableIncome / monthlyPayment;

  let score: number;

  if (coverageRatio >= 2) {
    score = 100;
  } else if (coverageRatio >= 1) {
    score = 70 + (coverageRatio - 1) * 30;
  } else {
    score = 25 + coverageRatio * 45;
  }

  return roundToCents(Math.min(100, Math.max(25, score)));
};

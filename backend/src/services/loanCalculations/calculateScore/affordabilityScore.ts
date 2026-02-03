import { validatePositive } from "../../../utils/validatePositive";
import { creditScorePoints } from "./creditScorePoints";
import { incomeScore } from "./incomeScore";

export const affordabilityScore = (
  monthlyPayment: number,
  disposableIncome: number,
  creditScore: number,
) => {
  validatePositive(monthlyPayment, "Monthly payment");
  if (creditScore < 300 || creditScore > 850)
    throw new Error("Credit score must be between 300 and 850");

  const credit = creditScorePoints(creditScore);
  const income = incomeScore(monthlyPayment, disposableIncome);

  const averageStrength = (credit + income) / 2;
  if (averageStrength >= 80) return "Excellent";
  if (averageStrength >= 60) return "good";
  return "poor";
};

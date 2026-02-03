import { roundToCents } from "../../utils/roundToCents";
import { validatePositive } from "../../utils/validatePositive";
import { creditScorePoints } from "./calculateScore/creditScorePoints";
import {
  employmentScore,
  EmploymentStatus,
} from "./calculateScore/employmentScore";
import { debtToIncomeRatio } from "./debtToIncomeRatio";
import { riskCategory } from "./riskCategory";

export const assessRisk = (
  creditScore: number,
  monthlyIncome: number,
  monthlyExpenses: number,
  existingDebt: number,
  employmentStatus: EmploymentStatus,
  employmentDuration: number,
) => {
  if (creditScore < 300 || creditScore > 850) {
    throw new Error("Credit score must be between 300 and 850");
  }
  validatePositive(monthlyIncome, "Monthly Income");
  
  const creditStrength = creditScorePoints(creditScore);
  const creditRisk = 100 - creditStrength;
  const dti = debtToIncomeRatio(monthlyIncome, monthlyExpenses, existingDebt);
  let dtiRisk = 0;
  if (dti < 20) dtiRisk = 10;
  else if (dti < 35) dtiRisk = 30;
  else dtiRisk = 50;
  const employmentRisk = employmentScore(employmentStatus, employmentDuration);
  const riskScore = roundToCents((creditRisk + dtiRisk + employmentRisk) / 3);
  return {
    riskScore,
    riskCategory: riskCategory(riskScore),
  };
};

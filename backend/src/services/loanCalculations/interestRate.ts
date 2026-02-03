import { roundToCents } from "../../utils/roundToCents";

export const interestRate = (
  minInterestRate: number,
  maxInterestRate: number,
  riskScore: number,
) => {
  if (minInterestRate < 0 || maxInterestRate < 0) {
    throw new Error("Interest rates cannot be negative");
  }
  if (minInterestRate > maxInterestRate) {
    throw new Error("minInterestRate cannot exceed maxInterestRate");
  }

  const riskPremium = Math.max(0, Math.min(100, riskScore)) / 100;
  const totalRate = maxInterestRate - minInterestRate;
  const rate = minInterestRate + riskPremium * totalRate;
  return roundToCents(rate);
};

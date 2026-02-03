import { roundToCents } from "../../utils/roundToCents";

export const approvalLikelihood = (riskScore: number) => {
  const likelihood = Math.max(0, Math.min(100, 100 - riskScore));
  return roundToCents(likelihood);
};

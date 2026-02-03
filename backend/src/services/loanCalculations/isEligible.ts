import { approvalLikelihood } from "./approvalLikelihood";

export const isEligible = (riskScore: number, threshold = 50) => {
  return approvalLikelihood(riskScore) >= threshold;
};

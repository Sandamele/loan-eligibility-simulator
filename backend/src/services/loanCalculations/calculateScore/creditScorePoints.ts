import { roundToCents } from "../../../utils/roundToCents";

export const creditScorePoints = (creditScore: number): number => {
  const MIN_SCORE = 300;
  const MAX_SCORE = 850;
  const clampedScore = Math.max(MIN_SCORE, Math.min(MAX_SCORE, creditScore));
  return roundToCents(
    ((clampedScore - MIN_SCORE) / (MAX_SCORE - MIN_SCORE)) * 100,
  );
};

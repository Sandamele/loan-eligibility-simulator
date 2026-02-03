export const riskCategory = (totalScore: number) => {
  if (totalScore < 30) return "low";
  if (totalScore < 50) return "meduim";
  return "high";
};

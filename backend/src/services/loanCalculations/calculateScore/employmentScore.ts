export type EmploymentStatus =
  | "employed"
  | "self_employed"
  | "retired"
  | "unemployed";
export const employmentScore = (status: EmploymentStatus, duration: number) => {
  if (status === "employed") return duration >= 24 ? 10 : 30;
  if (status === "self_employed") return duration >= 24 ? 20 : 40;
  if (status === "retired") return 30;
  return 60;
};

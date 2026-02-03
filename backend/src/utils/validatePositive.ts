export const validatePositive = (value: number, name: string) => {
  if (value <= 0) throw new Error(`${name} must be positive`);
};

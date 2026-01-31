export const formatMoney = (amount: number, currency: "R"): string => {
  return `${currency}${amount.toLocaleString("en-US", { useGrouping: true })}`;
};

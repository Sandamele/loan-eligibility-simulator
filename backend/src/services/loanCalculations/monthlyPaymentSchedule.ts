export interface MonthlyPaymentScheduleItem {
  month: number;
  payment: number;
  principalPaid: number;
  interestPaid: number;
  remainingBalance: number;
}

export const monthlyPaymentSchedule = (
  loanAmount: number,
  annualRate: number,
  months: number,
  monthlyPaymentAmount: number,
): MonthlyPaymentScheduleItem[] => {
  const schedule: MonthlyPaymentScheduleItem[] = [];

  let balance = loanAmount;
  const monthlyRate = annualRate / 100 / 12;

  for (let month = 1; month <= months; month++) {
    const interestPaid = Number((balance * monthlyRate).toFixed(2));
    const principalPaid = Number(
      (monthlyPaymentAmount - interestPaid).toFixed(2),
    );

    balance = Number((balance - principalPaid).toFixed(2));

    schedule.push({
      month,
      payment: monthlyPaymentAmount,
      principalPaid,
      interestPaid,
      remainingBalance: balance < 0 ? 0 : balance,
    });
  }

  return schedule;
};

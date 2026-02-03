import {
  monthlyPaymentSchedule,
  MonthlyPaymentScheduleItem,
} from "../../../services/loanCalculations/monthlyPaymentSchedule";

describe("monthlyPaymentSchedule function", () => {
  it("generates a correct schedule for a simple loan", () => {
    const schedule: MonthlyPaymentScheduleItem[] = monthlyPaymentSchedule(
      5000,
      12,
      3,
      340,
    );

    expect(schedule).toHaveLength(3);

    expect(schedule[0]).toEqual({
      month: 1,
      payment: 340,
      interestPaid: 50,
      principalPaid: 290,
      remainingBalance: 4710,
    });

    expect(schedule[1]).toEqual({
      month: 2,
      payment: 340,
      interestPaid: 47.1,
      principalPaid: 292.9,
      remainingBalance: 4417.1,
    });

    expect(schedule[2]).toEqual({
      month: 3,
      payment: 340,
      interestPaid: 44.17,
      principalPaid: 295.83,
      remainingBalance: 4121.27,
    });
  });

  it("never produces negative remaining balance", () => {
    const schedule = monthlyPaymentSchedule(500, 10, 2, 300);
    const lastMonth = schedule[schedule.length - 1];
    expect(lastMonth.remainingBalance).toBeGreaterThanOrEqual(0);
  });
});

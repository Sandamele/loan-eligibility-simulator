export type PaymentType = {
  month: number;
  payment: number;
  principalPaid: number;
  interestPaid: number;
  remainingBalance: number;
};
export type SchedulePaymentType = {
  paymentSchedule?: PaymentType[];
};

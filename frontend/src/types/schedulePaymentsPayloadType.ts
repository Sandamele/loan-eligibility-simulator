export type SchedulePaymentsPayloadType = {
  loanAmount: number | string;
  loanTerm: number | string;
  creditScore: number | string;
  loanType: string | number;
  monthlyIncome: number | string;
  monthlyExpenses: number | string;
  existingDebt: number | string;
  employmentStatus: string | number;
  employmentDuration: number | string;
};

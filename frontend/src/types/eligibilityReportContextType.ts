// actual report data
export type EligibilityReportType = {
  eligibilityResult: {
    isEligible: boolean;
    approvalLikelihood: number;
    riskCategory: string;
    decisionReason: string;
  };
  recommendedLoan: {
    maxAmount: number;
    recommendedAmount: number;
    interestRate: number;
    monthlyPayment: number;
    totalRepayment: number;
  };
  affordabilityAnalysis: {
    disposableIncome: number;
    debtToIncomeRatio: number;
    loanToIncomeRatio: number;
    affordabilityScore: string;
  };
};
export type SchedulePaymentsType = {
  interestRate: number;
  monthlyPayment: number;
  totalInterest: number;
  totalRepayment: number;
  paymentSchedule: {
    month: number;
    payment: number;
    principalPaid: number;
    interestPaid: number;
    remainingBalance: number;
  }[];
};

export type EligibilityReportContextType = {
  eligibilityReport: EligibilityReportType | null;
  setEligibilityReport: (data: EligibilityReportType) => void;
  clearEligibilityReport: () => void;
  schedulePayments: SchedulePaymentsType | null;
  setSchedulePayments: (data: SchedulePaymentsType) => void;
  loading: boolean;
  setLoading: (data: boolean) => void;
};

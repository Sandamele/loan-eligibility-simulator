export type EligibilityPayloadType = {
  personalInfo: {
    age: number | string;
    employmentDuration: number | string;
    employmentStatus: number | string;
  };
  financialInfo: {
    monthlyIncome: number | string;
    monthlyExpenses: number | string;
    existingDebt: number | string;
    creditScore: number | string;
  };
  loanDetails: {
    loanType: number | string;
    requestedAmount: number | string;
    loanTerm: number | string;
    loanPurpose: number | string;
  };
};

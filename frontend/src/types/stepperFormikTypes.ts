import type { FormikProps } from "formik";

export type StepperFormikValuesTypes = {
  personal: {
    age: number | string;
    employmentDuration: number | string;
    employmentStatus: number | string;
  };
  financial: {
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

export type StepperFormikProps = {
  formik: FormikProps<StepperFormikValuesTypes>;
};

import * as Yup from "yup";
export const financialFormSchema = Yup.object({
  financial: Yup.object({
    monthlyIncome: Yup.number()
      .min(5000, "Minimum monthly income of R5,000 required")
      .required("Monthly income is required"),
    monthlyExpenses: Yup.number()
      .min(0, "Please enter your monthly expenses")
      .required("Monthly expenses required"),
    creditScore: Yup.number()
      .min(300, "Credit score must be between 300 and 850")
      .max(850, "Credit score must be between 300 and 850")
      .required("Credit score is required"),
  }),
});

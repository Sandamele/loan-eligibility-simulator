import { formatMoney } from "@/lib/formatMoney";
import * as Yup from "yup";

export const loanDetailsFormSchema = Yup.object({
  loanDetails: Yup.object({
    requestedAmount: Yup.number()
      .test("range", function (value) {
        const { minLoanAmount, maxLoanAmount } = this.parent; // get min/max from form

        if (
          value === undefined ||
          minLoanAmount === undefined ||
          maxLoanAmount === undefined
        )
          return false;

        return value >= minLoanAmount && value <= maxLoanAmount
          ? true
          : this.createError({
              message: `Loan amount must be between ${formatMoney(minLoanAmount, "R")} and ${formatMoney(maxLoanAmount, "R")}`,
            });
      })
      .required("Loan amount is required"),
    loanTerm: Yup.number()
      .test("range", function (value) {
        const { minTerm, maxTerm } = this.parent; // get min/max from form

        if (
          value === undefined ||
          minTerm === undefined ||
          maxTerm === undefined
        )
          return false;

        return value >= minTerm && value <= maxTerm
          ? true
          : this.createError({
              message: `Loan term must be between ${minTerm} and ${maxTerm}`,
            });
      })
      .required("Preferred term required"),
    loanProduct: Yup.string().required("Choose a loan product"),
  }),
});

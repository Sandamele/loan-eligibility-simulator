import { financialFormSchema } from "@/schemas/financialForm.schema";
import { loanDetailsFormSchema } from "@/schemas/loanDetailsForm.schema";
import { personalFormSchema } from "@/schemas/personalForm.schema";
import { useFormik } from "formik";
import { useState } from "react";

export const useLoanForm = (initialStep: number, stepLength: number) => {
  const schemas = [
    personalFormSchema,
    financialFormSchema,
    loanDetailsFormSchema,
  ];
  const [currentStep, setCurrentStep] = useState(initialStep);
  const formik = useFormik({
    initialValues: {
      personal: {
        age: 33,
        employmentDuration: "",
        employmentStatus: "unemployed",
      },
      financial: {
        monthlyIncome: 5000,
        monthlyExpenses: 0,
        existingDebt: 0,
        creditScore: 300,
      },
      loanDetails: {
        loanProduct: "",
        requestedAmount: "",
        loanTerm: "",
        loanPurpose: "",
      },
    },
    validationSchema: schemas[currentStep - 1],
    onSubmit: (values) => {
      if (currentStep !== stepLength) {
        console.log(values);
        setCurrentStep((prev) => prev + 1);
        return;
      }
    },
  });
  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };
  return { currentStep, formik, handleBack };
};

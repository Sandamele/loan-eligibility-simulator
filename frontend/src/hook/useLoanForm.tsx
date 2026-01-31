import { financialFormSchema } from "@/schemas/financialForm.schema";
import { loanDetailsFormSchema } from "@/schemas/loanDetailsForm.schema";
import { personalFormSchema } from "@/schemas/personalForm.schema";
import type { StepperFormikValuesTypes } from "@/types/stepperFormikTypes";
import { useFormik } from "formik";
import { useState } from "react";

export const useLoanForm = (initialStep: number, stepLength: number) => {
  const schemas = [
    personalFormSchema,
    financialFormSchema,
    loanDetailsFormSchema,
  ];
  const [currentStep, setCurrentStep] = useState(initialStep);
  const formik = useFormik<StepperFormikValuesTypes>({
    initialValues: {
      personal: {
        age: "",
        employmentDuration: "",
        employmentStatus: "",
      },
      financial: {
        monthlyIncome: "",
        monthlyExpenses: "",
        existingDebt: 0,
        creditScore: "",
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

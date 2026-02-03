import { financialFormSchema } from "@/schemas/financialForm.schema";
import { loanDetailsFormSchema } from "@/schemas/loanDetailsForm.schema";
import { personalFormSchema } from "@/schemas/personalForm.schema";
import { postData } from "@/services/postData";
import type { EligibilityPayloadType } from "@/types/eligibilityPayload";
import type { StepperFormikValuesTypes } from "@/types/stepperFormikTypes";
import { useFormik } from "formik";
import { useState } from "react";
import { useEligibilityReport } from "./useEligibilityReport";
import type {
  EligibilityReportType,
  SchedulePaymentsType,
} from "@/types/eligibilityReportContextType";
import type { SchedulePaymentsPayloadType } from "@/types/schedulePaymentsPayloadType";
export const useLoanForm = (initialStep: number, stepLength: number) => {
  const schemas = [
    personalFormSchema,
    financialFormSchema,
    loanDetailsFormSchema,
  ];
  const [currentStep, setCurrentStep] = useState(initialStep);
  const { setEligibilityReport, setSchedulePayments, setLoading } =
    useEligibilityReport();
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
        existingDebt: "",
        creditScore: "",
      },
      loanDetails: {
        loanType: "",
        requestedAmount: "",
        loanTerm: "",
        loanPurpose: "",
      },
    },
    validationSchema: schemas[currentStep - 1],
    onSubmit: async (values) => {
      if (currentStep !== stepLength) {
        setCurrentStep((prev) => prev + 1);
        return;
      }
      setLoading(true);

      try {
        const eligibilityBody: EligibilityPayloadType = {
          personalInfo: values.personal,
          financialInfo: values.financial,
          loanDetails: values.loanDetails,
        };

        const scheduleBody: SchedulePaymentsPayloadType = {
          loanAmount: values.loanDetails.requestedAmount,
          loanTerm: values.loanDetails.loanTerm,
          creditScore: values.financial.creditScore,
          loanType: values.loanDetails.loanType,
          monthlyIncome: values.financial.monthlyIncome,
          monthlyExpenses: values.financial.monthlyExpenses,
          existingDebt: values.financial.existingDebt,
          employmentStatus: values.personal.employmentStatus,
          employmentDuration: values.personal.employmentDuration,
        };

        const [eligibilityRes, scheduleRes] = await Promise.all([
          postData<EligibilityReportType, EligibilityPayloadType>(
            "loans/eligibility",
            eligibilityBody,
          ),
          postData<SchedulePaymentsType, SchedulePaymentsPayloadType>(
            "loans/calculate-rate",
            scheduleBody,
          ),
        ]);

        await new Promise((resolve) => setTimeout(resolve, 1200)); // Simulating loading to show the loading screen

        if (eligibilityRes.data && scheduleRes.data) {
          setEligibilityReport(eligibilityRes.data);
          setSchedulePayments(scheduleRes.data);
        } else {
          throw new Error("Incomplete data received from server");
        }
      } catch (error) {
        console.error("Submission failed:", error);
      } finally {
        setLoading(false);
      }
    },
  });
  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };
  return { currentStep, formik, handleBack };
};

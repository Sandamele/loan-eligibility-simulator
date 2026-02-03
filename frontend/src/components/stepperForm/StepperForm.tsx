import type { Step } from "@/types/progressStepperTypes";
import { PremiumHeader } from "./PremiumHeader";
import { ProgressStepper } from "./ProgressStepper";
import { StepButtons } from "./StepButtons";
import { StepFinancial } from "./StepFinancial";
import { StepPersonal } from "./StepPersonal";
import { StepLoanDetails } from "./StepLoanDetails";
import { useLoanForm } from "@/hook/useLoanForm";
import { FiUser } from "react-icons/fi";
import { IoDocumentsOutline, IoWalletOutline } from "react-icons/io5";

export default function StepperForm() {
  const steps: Step[] = [
    {
      id: 1,
      label: "Personal",
      icon: <FiUser />,
    },
    { id: 2, label: "Financial", icon: <IoWalletOutline /> },
    {
      id: 3,
      label: "Loan Details",
      icon: <IoDocumentsOutline />,
    },
  ];
  const { currentStep, handleBack, formik } = useLoanForm(
    steps[0].id,
    steps.length,
  );
  return (
    <section>
      <PremiumHeader />
      <ProgressStepper steps={steps} currentStep={currentStep} />
      <form onSubmit={formik.handleSubmit}>
        {currentStep === 1 && <StepPersonal formik={formik} />}
        {currentStep === 2 && <StepFinancial formik={formik} />}
        {currentStep === 3 && <StepLoanDetails formik={formik} />}
        <StepButtons
          disableBack={currentStep === 1}
          handleBack={handleBack}
          continueType="submit"
        />
      </form>
    </section>
  );
}

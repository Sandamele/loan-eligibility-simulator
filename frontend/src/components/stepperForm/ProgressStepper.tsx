import { CompletedStep } from "@/components/stepperForm/CompletedStep";
import type { ProgressStepperType } from "@/types/progressStepperTypes";
import { ProgressStep } from "./ProgressStep";
import { Connector } from "./Connector";
import {
  isActiveStep,
  isLastStep,
  stepIsComplete,
} from "@/lib/progressStepper";
export const ProgressStepper = ({
  steps,
  currentStep,
}: ProgressStepperType) => {
  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);
  return (
    <div className="flex items-center w-full justify-around my-5">
      {steps.map((step, index) => (
        <div
          key={step.id}
          className={`flex items-center ${!isLastStep(index, steps.length) && "w-full"}`}
        >
          {stepIsComplete(index, currentStepIndex) ? (
            <CompletedStep label={step.label} />
          ) : (
            <ProgressStep
              label={step.label}
              icon={step.icon}
              isActiveStep={isActiveStep(step.id, currentStep)}
            />
          )}
          {!isLastStep(index, steps.length) && (
            <Connector isComplete={stepIsComplete(index, currentStepIndex)} />
          )}
        </div>
      ))}
    </div>
  );
};

export const isLastStep = (index: number, length: number): boolean =>
  index === length - 1;
export const isActiveStep = (id: number, currentStep: number) =>
  id === currentStep;
export const stepIsComplete = (index: number, currentStepIndex: number) =>
  currentStepIndex > index;

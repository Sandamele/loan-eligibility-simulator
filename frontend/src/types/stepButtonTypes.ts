type ButtonType = "button" | "submit";
export type StepButtonTypes = {
  handleBack: () => void;
  handleContinue?: () => void;
  continueButtonLabel?: string;
  disableBack?: boolean;
  disableContinue?: boolean;
  backType?: ButtonType;
  continueType?: ButtonType;
};

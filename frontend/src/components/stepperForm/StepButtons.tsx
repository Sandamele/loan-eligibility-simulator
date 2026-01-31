import type { StepButtonTypes } from "@/types/stepButtonTypes";
import { Button } from "../ui/button";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

export const StepButtons = ({
  handleBack,
  handleContinue,
  continueButtonLabel = "Continue",
  disableBack = false,
  backType = "button",
  continueType = "button",
}: StepButtonTypes) => {
  return (
    <div className="flex items-center justify-between w-full mt-5">
      <Button
        className="text-slate-500 hover:border hover:border-bright-blue hover:text-bright-blue text-lg md:text-xl py-5"
        variant="ghost"
        onClick={handleBack}
        disabled={disableBack}
        type={backType}
      >
        <AiOutlineArrowLeft className="md:w-6 md:h-6 mr-1" />
        Back
      </Button>
      <Button
        className="bg-linear-to-r from-bright-blue to-blue-700 text-lg py-5"
        onClick={handleContinue}
        type={continueType}
      >
        {continueButtonLabel}
        <AiOutlineArrowRight className="md:w-6 md:h-6 ml-1" />
      </Button>
    </div>
  );
};

import { EligibilityReportContext } from "@/context/EligibilityReport.context";
import { useContext } from "react";

export const useEligibilityReport = () => {
  const context = useContext(EligibilityReportContext);
  if (!context) {
    throw new Error(
      "useEligibilityReport must be used within EligibilityReportProvider",
    );
  }
  return context;
};

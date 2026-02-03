import { createContext } from "react";
import type { EligibilityReportContextType } from "@/types/eligibilityReportContextType";

export const EligibilityReportContext =
  createContext<EligibilityReportContextType | null>(null);

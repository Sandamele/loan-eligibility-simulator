import type {
  EligibilityReportType,
  SchedulePaymentsType,
} from "@/types/eligibilityReportContextType";
import { useState, type ReactNode } from "react";
import { EligibilityReportContext } from "./EligibilityReport.context";
export const EligibilityReportProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [eligibilityReport, setEligibilityReport] =
    useState<EligibilityReportType | null>(null);
  const [schedulePayments, setSchedulePayments] =
    useState<SchedulePaymentsType | null>(null);
  const [loading, setLoading] = useState(false);
  const clearEligibilityReport = () => {
    setEligibilityReport(null);
    setSchedulePayments(null);
  };
  return (
    <EligibilityReportContext.Provider
      value={{
        eligibilityReport,
        setEligibilityReport,
        clearEligibilityReport,
        schedulePayments,
        setSchedulePayments,
        loading,
        setLoading,
      }}
    >
      {children}
    </EligibilityReportContext.Provider>
  );
};

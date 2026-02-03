import { useEligibilityReport } from "@/hook/useEligibilityReport";
import { AffordabilityAnalysis } from "./AffordabilityAnalysis";
import { EstimatedLoanTerms } from "./EstimatedLoanTerms";
import { HeroResult } from "./HeroResult";
import { Stats } from "./Stats";
import { formatMoney } from "@/lib/formatMoney";
import { SchedulePayment } from "./SchedulePayment";
import { Button } from "../ui/button";
import { TfiReload } from "react-icons/tfi";
import { Disclaimer } from "../stepperForm/Disclaimer";
export const EligibilityReport = () => {
  const { eligibilityReport, schedulePayments, clearEligibilityReport } =
    useEligibilityReport();
  return (
    <section>
      <HeroResult
        interestRate={eligibilityReport?.recommendedLoan.interestRate ?? 0}
        isEligible={eligibilityReport?.eligibilityResult.isEligible ?? false}
        loanAmount={eligibilityReport?.recommendedLoan.recommendedAmount ?? 0}
        decisionReason={
          eligibilityReport?.eligibilityResult.decisionReason ?? ""
        }
      />
      <div className="mt-8">
        <Disclaimer message="This simulation is based on the information you provided. Results are estimates only and may be inaccurate. Actual loan eligibility, rates, and terms will vary based on lender checks and verification. This tool is for guidance purposes and does not guarantee approval." />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <Stats
          title="Approval Score"
          value={String(
            eligibilityReport?.eligibilityResult.approvalLikelihood,
          )}
          textColor="text-bright-blue"
        />
        <Stats
          title="Risk Assessment"
          value={eligibilityReport?.eligibilityResult.riskCategory ?? ""}
          textColor="text-slate-800"
        />
        <Stats
          title="Est. Monthly"
          value={formatMoney(
            eligibilityReport?.recommendedLoan.monthlyPayment ?? 0,
            "R",
          )}
          textColor="text-slate-800"
        />
        <Stats
          title="Est. Total Interest"
          value={formatMoney(schedulePayments?.totalInterest ?? 0, "R")}
          textColor="text-slate-800"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <EstimatedLoanTerms
          amount={eligibilityReport?.recommendedLoan.recommendedAmount ?? 0}
          maxAmount={eligibilityReport?.recommendedLoan.maxAmount ?? 0}
          interestRate={eligibilityReport?.recommendedLoan.interestRate ?? 0}
          monthlyPayment={
            eligibilityReport?.recommendedLoan.monthlyPayment ?? 0
          }
          totalPayment={eligibilityReport?.recommendedLoan.totalRepayment ?? 0}
        />
        <AffordabilityAnalysis
          affordabilityScore={String(
            eligibilityReport?.affordabilityAnalysis.affordabilityScore,
          )}
          debtToIncome={
            eligibilityReport?.affordabilityAnalysis.debtToIncomeRatio ?? 0
          }
          loanToIncome={
            eligibilityReport?.affordabilityAnalysis.loanToIncomeRatio ?? 0
          }
          disposableIncome={
            eligibilityReport?.affordabilityAnalysis.disposableIncome ?? 0
          }
        />
      </div>
      <div className="mt-8 w-full">
        <Button className="w-full" onClick={clearEligibilityReport}>
          <TfiReload />
          Try Again
        </Button>
      </div>
      <div className="mt-8">
        <SchedulePayment paymentSchedule={schedulePayments?.paymentSchedule} />
      </div>
    </section>
  );
};

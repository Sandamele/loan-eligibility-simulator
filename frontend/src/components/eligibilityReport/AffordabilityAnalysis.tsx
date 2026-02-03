import { formatMoney } from "@/lib/formatMoney";
import { Card, CardContent } from "../ui/card";
import { FaArrowTrendUp } from "react-icons/fa6";
import { TbPigMoney } from "react-icons/tb";
import type { AffordabilityAnalysisType } from "@/types/affordabilityAnalysisType";

export const AffordabilityAnalysis = ({
  affordabilityScore,
  disposableIncome,
  loanToIncome,
  debtToIncome,
}: AffordabilityAnalysisType) => {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-slate-300 px-2 py-2 rounded-lg">
            <FaArrowTrendUp className="text-3xl" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Affordability Analysis</h3>
            <p className="text-sm text-slate-400">
              Your financial health indicators
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-500">Affordability Score</span>
          <span className="capitalize">{affordabilityScore}</span>
        </div>
        <div className="flex items-center gap-4 bg-emerald-50 px-4 py-3 mt-4 rounded-xl border border-emerald-100">
          <div className="text-emerald-600 bg-emerald-100 px-2 py-2 rounded-xl">
            <TbPigMoney className="text-4xl" />
          </div>
          <div>
            <span className="text-sm text-emerald-600 font-medium block">
              Monthly Disposable Income
            </span>
            <h3 className="text-3xl font-bold text-emerald-700">
              {formatMoney(disposableIncome, "R")}
            </h3>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-slate-100 p-4 rounded-xl">
            <span className="text-sm text-slate-500">% Debt-to-Income</span>
            <h3 className="text-xl font-bold mt-2">{debtToIncome}%</h3>
          </div>
          <div className="bg-slate-100 p-4 rounded-xl">
            <span className="text-sm text-slate-500">% Loan-to-Income</span>
            <h3 className="text-xl font-bold mt-2">{loanToIncome}%</h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

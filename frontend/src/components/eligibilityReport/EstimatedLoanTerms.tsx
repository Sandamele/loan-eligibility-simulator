import { formatMoney } from "@/lib/formatMoney";
import { Card, CardContent } from "../ui/card";
import { RandIcon } from "../ui/randIcon";
import type { EstimatedLoanTermType } from "@/types/estimatedLoanTerm";

export const EstimatedLoanTerms = ({
  amount,
  maxAmount,
  interestRate,
  monthlyPayment,
  totalPayment
}: EstimatedLoanTermType) => {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center gap-3 mb-4">
          <RandIcon className="bg-bright-blue text-xl text-white px-4 py-2 rounded-lg" />
          <div>
            <h3 className="text-xl font-bold">Estimated Loan Terms</h3>
            <p className="text-sm text-slate-400">Based on your inputs</p>
          </div>
        </div>
        <table className="min-w-full overflow-hidden">
          <tbody>
            <tr className="border-b border-b-slate-300">
              <th className="px-4 py-3 text-left text-slate-600 font-light">
                Loan Amount
              </th>
              <td className="px-4 py-3 text-2xl text-right text-bright-blue font-semibold">
                {formatMoney(amount, "R")}
              </td>
            </tr>
            <tr className="border-b border-b-slate-300">
              <th className="px-4 py-3 text-left text-slate-600 font-light">
                Maximum Potential
              </th>
              <td className="px-4 py-3 text-right font-semibold">
                {formatMoney(maxAmount, "R")}
              </td>
            </tr>
            <tr className="border-b border-b-slate-300">
              <th className="px-4 py-3 text-left text-slate-600 font-light">
                Est. Interest Rate
              </th>
              <td className="px-4 py-3 text-right font-semibold">
                {interestRate}%
              </td>
            </tr>
            <tr className="border-b border-b-slate-300">
              <th className="px-4 py-3 text-left text-slate-600 font-light">
                Est. Monthly Payment
              </th>
              <td className="px-4 py-3 text-xl text-right font-bold">
                {formatMoney(monthlyPayment, "R")}
              </td>
            </tr>
            <tr>
              <th className="px-4 py-3 text-left text-slate-600 font-light">
                Est. Total Payment
              </th>
              <td className="px-4 py-3 text-xl text-right font-bold">
                {formatMoney(totalPayment, "R")}
              </td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

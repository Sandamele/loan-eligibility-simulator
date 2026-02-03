import { Card, CardContent } from "../ui/card";
import { FaRegCalendarAlt } from "react-icons/fa";
import { formatMoney } from "@/lib/formatMoney";
import type { SchedulePaymentType } from "@/types/schedulePaymetType";


export const SchedulePayment = ({ paymentSchedule = [] }: SchedulePaymentType) => {
  const th = "px-6 py-3 text-left text-sm text-slate-500";
  const td = "px-6 py-3 text-left text-sm";

  return (
    <Card>
      <CardContent className="overflow-x-auto">
        <div className="flex items-center gap-4">
          <div className="bg-bright-blue px-3 py-2.5 rounded-xl">
            <FaRegCalendarAlt className="text-3xl text-white" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Payment Schedule</h3>
            <p className="text-sm">Your monthly payment breakdown</p>
          </div>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="border-b border-b-slate-400">
            <tr>
              <th className={th}>Payment #</th>
              <th className={th}>Monthly Payment</th>
              <th className={th}>Interest</th>
              <th className={th}>Total Payment</th>
              <th className={th}>Remaining Balance</th>
            </tr>
          </thead>
          <tbody>
            {paymentSchedule.map((payment) => (
              <tr key={payment.month} className="border-b border-b-slate-300">
                <td className={td}>
                  <span className="bg-slate-200 font-bold px-2 py-1">{payment.month}</span>
                </td>
                <td className={td}>{formatMoney(payment.payment, "R")}</td>
                <td className={td}>{formatMoney(payment.interestPaid, "R")}</td>
                <td className={td}>{formatMoney(payment.principalPaid, "R")}</td>
                <td className={td}>{formatMoney(payment.remainingBalance, "R")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

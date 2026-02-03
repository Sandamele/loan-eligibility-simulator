import { formatMoney } from "@/lib/formatMoney";
import type { HeroResultType } from "@/types/heroResultType";
import { IoCalculatorOutline } from "react-icons/io5";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { AiOutlineCloseCircle } from "react-icons/ai";

export const HeroResult = ({
  isEligible,
  loanAmount,
  interestRate,
  decisionReason,
}: HeroResultType) => {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl p-8 md:p-12 ${isEligible ? "bg-linear-to-br from-emerald-500 to-teal-600" : "bg-linear-to-br from-slate-500 to-slate-800"}`}
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      <div className="relative z-10 text-center text-white">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur rounded-full px-4 py-1.5 text-sm font-medium mb-6">
          <IoCalculatorOutline />
          Simulation Result
        </div>
        <div className="flex justify-center mb-6">
          {isEligible ? (
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
              <IoCheckmarkCircleOutline className="w-12 h-12" />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
              <AiOutlineCloseCircle className="w-12 h-12" />
            </div>
          )}
        </div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
          {isEligible ? "Likely Eligible" : "May Not Qualify"}
        </h1>
        <p className="text-white/80 max-w-lg mx-auto text-sm md:text-lg mb-8">
          {decisionReason}
        </p>
        <div className="inline-flex flex-col md:flex-row items-center gap-3 md:gap-6 bg-white/10 backdrop-blur rounded-2xl px-8 py-4">
          <div className="text-center md:text-left">
            <span className="text-white/60 text-sm block">
              Estimated Loan Amount
            </span>
            <span className="text-xl md:text-3xl font-bold">
              {formatMoney(loanAmount, "R")}
            </span>
          </div>
          <div className="w-full h-0.5 md:w-px md:h-12 bg-white/20"></div>
          <div className="text-left">
            <span className="text-white/60 text-sm block">Estimated Rate</span>
            <span className="text-xl md:text-3xl font-bold">
              {interestRate}% APR
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

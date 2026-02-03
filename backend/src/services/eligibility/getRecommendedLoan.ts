import { maxAmount } from "../loanCalculations/maxAmount";
import { monthlyPayment } from "../loanCalculations/monthlyPayment";
import { totalPayment } from "../loanCalculations/totalPayment";

export const getRecommendedLoan = ({
  requestedAmount,
  loanTerm,
  estimatedInterestRate,
  monthlyIncome,
  monthlyExpenses,
  existingDebt,
  loanMaxAmount,
}: {
  requestedAmount: number;
  loanTerm: number;
  estimatedInterestRate: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  existingDebt: number;
  loanMaxAmount: number;
}) => {
  const estimatedMonthlyPayment = monthlyPayment(
    requestedAmount,
    estimatedInterestRate,
    loanTerm,
  );

  return {
    estimatedMonthlyPayment,
    recommendedLoan: {
      maxAmount: maxAmount(
        monthlyIncome,
        monthlyExpenses,
        existingDebt,
        loanMaxAmount,
      ),
      recommendedAmount: requestedAmount,
      interestRate: estimatedInterestRate,
      monthlyPayment: estimatedMonthlyPayment,
      totalRepayment: totalPayment(estimatedMonthlyPayment, loanTerm),
    },
  };
};

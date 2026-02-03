import { Request, Response } from "express";
import { loanProducts } from "../database/loanProducts";
import { monthlyPayment } from "../services/loanCalculations/monthlyPayment";
import { interestRate } from "../services/loanCalculations/interestRate";
import { assessRisk } from "../services/loanCalculations/assessRisk";
import { totalInterest } from "../services/loanCalculations/totalInterest";
import { totalPayment } from "../services/loanCalculations/totalPayment";
import { monthlyPaymentSchedule } from "../services/loanCalculations/monthlyPaymentSchedule";

export const calculateRateController = (req: Request, res: Response) => {
  try {
    const {
      loanAmount,
      loanTerm,
      creditScore,
      loanType,
      monthlyIncome,
      monthlyExpenses,
      existingDebt,
      employmentStatus,
      employmentDuration,
    } = req.body;
    const products = loanProducts.get(loanType);
    const riskScore = assessRisk(
      creditScore,
      monthlyIncome,
      monthlyExpenses,
      existingDebt,
      employmentStatus,
      employmentDuration,
    );
    const rate = interestRate(
      products.interestRateRange.min,
      products.interestRateRange.max,
      riskScore.riskScore,
    );
    const monthlyPayments = monthlyPayment(loanAmount, rate, loanTerm);
    const totalInterests = totalInterest(loanAmount, monthlyPayments, loanTerm);
    const totalPayments = totalPayment(monthlyPayments, loanTerm);

    const schedule = monthlyPaymentSchedule(
      loanAmount,
      rate,
      loanTerm,
      monthlyPayments,
    );

    return res.status(200).json({
      interestRate: rate,
      monthlyPayment: monthlyPayments,
      totalInterest: totalInterests,
      totalPayment: totalPayments,
      paymentSchedule: schedule,
    });
  } catch (errror) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

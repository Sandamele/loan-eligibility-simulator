import { Request, Response } from "express";
import { loanProducts } from "../database/loanProducts";
import { getAffordabilityAnalysis } from "../services/eligibility/getAffordabilityAnalysis";
import { getRecommendedLoan } from "../services/eligibility/getRecommendedLoan";
import { getEligibilityResult } from "../services/eligibility/getEligibilityResult";
export const eligibilityController = (req: Request, res: Response) => {
  try {
    const { personalInfo, financialInfo, loanDetails } = req.body;
    const { employmentStatus, employmentDuration } = personalInfo;
    const { monthlyIncome, monthlyExpenses, existingDebt, creditScore } =
      financialInfo;
    const { requestedAmount, loanTerm, loanType } = loanDetails;

    const products = loanProducts.get(loanType);

    const { estimatedInterestRate, eligibilityResult } = getEligibilityResult({
      creditScore,
      monthlyIncome,
      monthlyExpenses,
      existingDebt,
      employmentStatus,
      employmentDuration,
      minRate: products.interestRateRange.min,
      maxRate: products.interestRateRange.max,
    });
    const { estimatedMonthlyPayment, recommendedLoan } = getRecommendedLoan({
      requestedAmount,
      loanTerm,
      estimatedInterestRate,
      monthlyIncome,
      monthlyExpenses,
      existingDebt,
      loanMaxAmount: products.maxAmount,
    });

    const affordabilityAnalysis = getAffordabilityAnalysis({
      monthlyIncome,
      monthlyExpenses,
      existingDebt,
      estimatedMonthlyPayment,
      creditScore,
    });

    return res.status(200).json({
      eligibilityResult,
      recommendedLoan,
      affordabilityAnalysis,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

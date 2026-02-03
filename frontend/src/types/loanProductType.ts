export type LoanProductType = {
  id: string;
  name: string;
  minAmount: number;
  maxAmount: number;
  minTerm: number;
  maxTerm: number;
  purposes?: string[];
}

export type LoanProductsResponseType = {
  products: LoanProductType[];
}

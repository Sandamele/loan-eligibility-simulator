import { Request, Response } from "express";
import { loanProducts } from "../database/loanProducts";

export const loanProductsController = (req: Request, res: Response) => {
  try {
    const products = Array.from(loanProducts.values());
    if (!products.length) {
      return res.status(200).json({ products: [] });
    }
    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

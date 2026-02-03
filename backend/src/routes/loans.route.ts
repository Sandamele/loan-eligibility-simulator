import express from "express";
import { eligibilityController } from "../controllers/eligibility.controllers";
import { loanProductsController } from "../controllers/loanProducts.controllers";
import { calculateRateController } from "../controllers/calculateRate.controllers";
import { validationRulesController } from "../controllers/validationRules.controllers";
const route = express.Router();
route.post("/eligibility", eligibilityController);
route.get("/products", loanProductsController);
route.post("/calculate-rate", calculateRateController);
route.get("/validation-rules", validationRulesController)
export default route;

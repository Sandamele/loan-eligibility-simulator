import { configDotenv } from "dotenv";
import express from "express";
import loansRoute from "./routes/loans.route";
import cors from "cors";
configDotenv();
const PORT = process.env.PORT || 1338;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Backend Loan Online");
});
app.use("/api/loans", loansRoute);
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

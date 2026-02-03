import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { EligibilityReportProvider } from "./context/EligibilityReport.provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <EligibilityReportProvider>
      <App />
    </EligibilityReportProvider>
  </StrictMode>,
);

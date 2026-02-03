import "./App.css";
import { EligibilityReport } from "./components/eligibilityReport";
import { LoadingScreen } from "./components/stepperForm/LoadingScreen";
import StepperForm from "./components/stepperForm/StepperForm";
import { useEligibilityReport } from "./hook/useEligibilityReport";

function App() {
  const { eligibilityReport, loading } = useEligibilityReport();
  const hasReport = Boolean(eligibilityReport);

  return (
    <div className="bg-slate-100 h-screen overflow-scroll px-5 md:px-10 lg:px-50 py-10">
      <head>
        <title>Loan Eligibility Simulator</title>
      </head>
      {!hasReport && <StepperForm />}
      {hasReport && <EligibilityReport />}
      {loading && <LoadingScreen />}
    </div>
  );
}

export default App;

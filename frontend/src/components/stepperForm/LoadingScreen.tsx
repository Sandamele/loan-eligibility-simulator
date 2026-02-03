import { BsCalculator, BsCheckCircle } from "react-icons/bs";

export function LoadingScreen() {
  return (
    <div className="fixed flex items-center justify-center inset-0 bg-navy/60 backdrop-blur-md z-50">
      <div
        role="status"
        aria-live="polite"
        className="bg-white rounded-3xl shadow-2xl p-10 md:p-14 max-w-lg w-full mx-4 text-center"
      >
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 flex items-center justify-center rounded-3xl bg-linear-to-b from-bright-blue to-blue-700">
              <BsCalculator className="w-12 h-12 text-white" />
            </div>
            <div className="absolute inset-0 rounded-3xl bg-linear-to-b from-bright-blue to-blue-700 animate-ping opacity-20"></div>

            <div
              className="absolute inset-0 animate-spin"
              style={{
                animationDuration: "3s",
              }}
            >
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary"></div>
            </div>
            <div
              className="absolute inset-0 animate-spin"
              style={{
                animationDuration: "3s",
                animationDelay: "1s",
              }}
            >
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent"></div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-navy mb-3">
          Running simulation...
        </h2>

        <p className="text-navy-400 mb-8 text-lg">
          We're calculating your eligibility based on the information provided.
        </p>

        <div className="space-y-3 text-left max-w-xs mx-auto">
          {[
            "Analyzing your profile",
            "Calculating risk factors",
            "Generating results",
          ].map((step, i) => (
            <div key={step} className="flex items-center gap-3 text-sm">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center ${i === 2 ? "bg-navy-100" : "bg-emerald-100"}`}
              >
                {i < 2 ? (
                  <BsCheckCircle className="w-4 h-4 text-emerald-500" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-navy-300 animate-pulse"></div>
                )}
              </div>
              <span className={i === 2 ? "text-navy-400" : "text-navy"}>
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

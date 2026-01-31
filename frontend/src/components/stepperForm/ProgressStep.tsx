import type { JSX } from "react";

export const ProgressStep = ({
  label,
  isActiveStep,
  icon,
}: {
  label: string;
  isActiveStep: boolean;
  icon: JSX.Element;
}) => {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`text-2xl border rounded-xl px-2 py-2 ${isActiveStep ? "text-bright-blue border-bright-blue" : "text-slate-400  border-slate-400"}`}
      >
        {icon}
      </div>
      <label
        htmlFor={label}
        className={`text-sm mt-2 whitespace-nowrap ${isActiveStep ? "text-bright-blue font-medium" : "text-slate-700"}`}
      >
        {label}
      </label>
    </div>
  );
};

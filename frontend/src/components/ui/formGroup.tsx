import type { FormGroupType } from "@/types/formGroupTypes";
import { Label } from "./label";
import { memo } from "react";

export const FormGroup = memo(
  ({
    children,
    label = "",
    error = "",
    showError = false,
    htmlFor = "",
  }: FormGroupType) => {
    return (
      <fieldset className="space-y-2 mb-6">
        {label !== "" && (
          <Label className="text-slate-600" htmlFor={htmlFor}>
            {label}
          </Label>
        )}
        {children}
        {showError && error && <p className="text-red-500 text-sm">{error}</p>}
      </fieldset>
    );
  },
);

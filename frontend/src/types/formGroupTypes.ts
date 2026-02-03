import type { ReactNode } from "react";

export type FormGroupType = {
  children: ReactNode;
  label?: string;
  error?: string;
  showError?: boolean;
  htmlFor?: string;
};

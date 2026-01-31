import type { InputHTMLAttributes } from "react";
import type { JSX } from "react/jsx-runtime";

export type InputWithIconType = {
  icon: JSX.Element;
  alignIcon: "block-end" | "block-start" | "inline-start" | "inline-end";
} & InputHTMLAttributes<HTMLInputElement>;

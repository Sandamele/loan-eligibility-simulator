import type { JSX } from "react/jsx-runtime";

export type SelectCardType = {
  id: number | string;
  icon: JSX.Element;
  label: string;
  selected?: boolean;
  onSelect: (id: number | string) => void;
};

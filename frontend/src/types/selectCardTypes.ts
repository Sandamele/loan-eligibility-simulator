import type { JSX } from "react/jsx-runtime";

export type SelectCardType = {
  id: number | string;
  icon?: JSX.Element | null;
  label: string;
  selected?: boolean;
  onSelect: (id: number | string) => void;
};

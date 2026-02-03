import type { JSX } from "react";

export type SelectableCardGroupType = {
  items: { id: string; name: string; icon?: JSX.Element }[];
  selectedId: number | string;
  onSelect: (id: string) => void;
};

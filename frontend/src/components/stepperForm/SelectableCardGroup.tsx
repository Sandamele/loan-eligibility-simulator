import type { SelectableCardGroupType } from "@/types/selectableCardGroup";
import { SelectCard } from "../ui/selectCard";
export const SelectableCardGroup = ({
  items,
  onSelect,
  selectedId,
}: SelectableCardGroupType) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {items.length > 0 &&
        items.map((item) => (
          <SelectCard
            key={item.id}
            id={item.id}
            label={item.label}
            icon={item.icon}
            onSelect={() => onSelect(item.id)}
            selected={selectedId === item.id}
          />
        ))}
    </div>
  );
};

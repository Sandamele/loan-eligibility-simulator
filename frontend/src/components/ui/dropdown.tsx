import type { DropdownType } from "@/types/dropdownTypes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

export const Dropdown = ({ items, placeholder }: DropdownType) => {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.length > 0 &&
          items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

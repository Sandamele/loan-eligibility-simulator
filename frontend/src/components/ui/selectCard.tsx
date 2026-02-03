import type { SelectCardType } from "@/types/selectCardTypes";
import { IoMdCheckmarkCircle } from "react-icons/io";

export const SelectCard = ({
  id,
  icon,
  label,
  selected,
  onSelect,
}: SelectCardType) => {
  return (
    <button
      className={`relative cursor-pointer flex flex-col items-center py-5 rounded-lg ${selected ? "bg-blue-50/50 border border-bright-blue ring-bright-blue/50 ring-[3px]" : "border hover:shadow-lg"}`}
      onClick={() => onSelect(id)}
      type="button"
      aria-pressed={selected}
    >
      {!!icon && (
        <div
          className={`text-3xl px-2 py-2 rounded-lg mb-2 ${selected ? "bg-blue-100 text-bright-blue" : "bg-slate-100 text-slate-500"}`}
        >
          {icon}
        </div>
      )}
      <p className={`font-medium ${selected ? "text-bright-blue" : ""}`}>
        {label}
      </p>
      {selected && (
        <IoMdCheckmarkCircle className="absolute top-0 right-0 text-3xl mt-2 mr-2 text-bright-blue" />
      )}
    </button>
  );
};

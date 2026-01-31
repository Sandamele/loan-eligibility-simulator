import { IoCheckmarkSharp } from "react-icons/io5";

export const CompletedStep = ({ label }: { label: string }) => {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`text-2xl text-white bg-linear-to-r from-bright-blue to-blue-700 border border-bright-blue rounded-xl px-2 py-2`}
      >
        {<IoCheckmarkSharp />}
      </div>
      <label
        className={`text-sm text-black font-medium mt-2 whitespace-nowrap`}
      >
        {label}
      </label>
    </div>
  );
};

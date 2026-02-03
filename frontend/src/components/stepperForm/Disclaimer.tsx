import { BsInfo } from "react-icons/bs";

export const Disclaimer = ({ message }: { message: string }) => {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
      <BsInfo className="text-3xl text-amber-600 shrink-0 mt-0.5" />
      <p className="text-sm text-amber-800">
        <strong>Disclaimer:</strong> {message}
      </p>
    </div>
  );
};

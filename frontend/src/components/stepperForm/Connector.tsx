export const Connector = ({ isComplete }: { isComplete: boolean }) => {
  return (
    <div
      className={`hidden md:block flex-1 h-0.5 mx-2 mb-6 ${isComplete ? "bg-bright-blue" : "bg-slate-300"}`}
    />
  );
};

export const FormHeader = ({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
      <p className="text-[16px] md:text-xl text-slate-500 mt-2">{subTitle}</p>
    </div>
  );
};

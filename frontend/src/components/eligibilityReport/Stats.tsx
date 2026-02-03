import { Card, CardContent } from "../ui/card";

export const Stats = ({
  title,
  value,
  textColor = "text-navy",
}: {
  title: string;
  value: string;
  textColor?: string;
}) => {
  return (
    <Card>
      <CardContent className="text-center">
        <p className="text-sm text-slate-400 block mb-1">{title}</p>
        <p className={`text-2xl font-bold capitalize ${textColor}`}>{value}</p>
      </CardContent>
    </Card>
  );
};

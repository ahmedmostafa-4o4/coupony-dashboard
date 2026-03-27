import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AdminStatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <Card>
      <CardHeader className="pb-0">
        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <CardTitle className="text-3xl">{value}</CardTitle>
        </div>
      </CardHeader>
      {hint ? (
        <CardContent>
          <p className="text-sm text-slate-500">{hint}</p>
        </CardContent>
      ) : null}
    </Card>
  );
}

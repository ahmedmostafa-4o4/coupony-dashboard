import { type ReactNode } from "react";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";

export interface KpiCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: number;
    label?: string;
  };
  description?: string;
  className?: string;
}

export function KpiCard({
  title,
  value,
  icon,
  trend,
  description,
  className,
}: KpiCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && (
          <div className="h-4 w-4 text-muted-foreground">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        
        {(trend || description) && (
          <div className="mt-1.5 flex items-center text-xs">
            {trend && (
              <div
                className={cn(
                  "flex items-center gap-0.5 font-medium",
                  trend.value > 0
                    ? "text-emerald-600"
                    : trend.value < 0
                    ? "text-rose-600"
                    : "text-slate-500"
                )}
              >
                {trend.value > 0 ? (
                  <ArrowUpIcon className="h-3 w-3" />
                ) : trend.value < 0 ? (
                  <ArrowDownIcon className="h-3 w-3" />
                ) : null}
                <span>{Math.abs(trend.value)}%</span>
              </div>
            )}
            
            {(trend?.label || description) && (
              <span className="ml-2 text-muted-foreground">
                {trend?.label || description}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

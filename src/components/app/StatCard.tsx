import { Card } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  value: string | number;
  delta?: string;
  icon: LucideIcon;
  tone?: "primary" | "success" | "warning" | "destructive";
  className?: string;
}

const toneClass = {
  primary: "from-primary/15 to-primary-glow/10 text-primary",
  success: "from-success/15 to-success/5 text-success",
  warning: "from-warning/20 to-warning/5 text-warning",
  destructive: "from-destructive/15 to-destructive/5 text-destructive",
} as const;

export function StatCard({ label, value, delta, icon: Icon, tone = "primary", className }: Props) {
  return (
    <Card className={cn("relative overflow-hidden border-border/60 p-5 hover-lift shadow-soft bg-card/80", className)}>
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-70 pointer-events-none", toneClass[tone].split(" ").slice(0,2).join(" "))} />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
          {delta && <p className="mt-1 text-xs text-success">{delta}</p>}
        </div>
        <div className={cn("grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-background/70 backdrop-blur", toneClass[tone].split(" ").slice(-1)[0])}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </Card>
  );
}

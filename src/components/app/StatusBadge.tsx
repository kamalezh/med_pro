import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const map: Record<string, string> = {
  Active: "bg-success/15 text-success border-success/20",
  Available: "bg-success/15 text-success border-success/20",
  Approved: "bg-success/15 text-success border-success/20",
  Completed: "bg-primary/15 text-primary border-primary/20",
  Upcoming: "bg-primary/15 text-primary border-primary/20",
  Ongoing: "bg-warning/20 text-warning-foreground border-warning/20",
  Pending: "bg-warning/20 text-warning-foreground border-warning/20",
  "In Progress": "bg-warning/20 text-warning-foreground border-warning/20",
  "In Surgery": "bg-warning/20 text-warning-foreground border-warning/20",
  Inactive: "bg-muted text-muted-foreground border-border",
  "On Leave": "bg-muted text-muted-foreground border-border",
  Cancelled: "bg-destructive/15 text-destructive border-destructive/20",
  Rejected: "bg-destructive/15 text-destructive border-destructive/20",
  Critical: "bg-destructive/15 text-destructive border-destructive/20",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <Badge variant="outline" className={cn("font-medium", map[status] ?? "bg-muted text-muted-foreground")}>
      {status}
    </Badge>
  );
}

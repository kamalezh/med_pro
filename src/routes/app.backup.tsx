import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, Download, Clock, HardDrive } from "lucide-react";
import { StatCard } from "@/components/app/StatCard";
import { toast } from "sonner";

export const Route = createFileRoute("/app/backup")({ component: BackupPage });

function BackupPage() {
  const backups = [
    { id: "B1", date: "2026-01-20 03:00", size: "2.4 GB", type: "Full" },
    { id: "B2", date: "2026-01-19 03:00", size: "1.1 GB", type: "Incremental" },
    { id: "B3", date: "2026-01-18 03:00", size: "1.2 GB", type: "Incremental" },
    { id: "B4", date: "2026-01-17 03:00", size: "2.3 GB", type: "Full" },
  ];
  return (
    <div>
      <PageHeader title="Backup" description="Automated backups and disaster recovery."
        crumbs={[{ label: "Backup" }]}
        actions={<Button className="gradient-primary text-white" onClick={() => toast.success("Backup started")}><Database className="mr-1 h-4 w-4" /> Backup now</Button>} />
      <div className="mb-4 grid gap-4 sm:grid-cols-3">
        <StatCard label="Last backup" value="4h ago" icon={Clock} tone="success" />
        <StatCard label="Storage used" value="18.4 GB" icon={HardDrive} tone="primary" />
        <StatCard label="Retention" value="30 days" icon={Database} tone="warning" />
      </div>
      <Card className="p-6">
        <h3 className="mb-4 font-semibold">Recent backups</h3>
        <div className="space-y-2">
          {backups.map(b => (
            <div key={b.id} className="flex items-center justify-between rounded-xl border border-border/60 p-4">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary"><Database className="h-5 w-5" /></div>
                <div><p className="font-medium">{b.date}</p><p className="text-xs text-muted-foreground">{b.type} · {b.size}</p></div>
              </div>
              <Button size="sm" variant="ghost" onClick={() => toast.success("Downloading…")}><Download className="mr-1 h-4 w-4" /> Restore</Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

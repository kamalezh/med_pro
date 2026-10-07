import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/PageHeader";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useStorageData, getActivityLogs } from "@/lib/storage";
import { EmptyState } from "@/components/app/EmptyState";
import { Activity } from "lucide-react";

export const Route = createFileRoute("/app/activity-logs")({ component: LogsPage });

function LogsPage() {
  const [activityLogs] = useStorageData(getActivityLogs);

  return (
    <div>
      <PageHeader title="Activity Logs" description="System-wide audit trail for actions." crumbs={[{ label: "Activity" }]} />
      <Card className="p-4 sm:p-6">
        {activityLogs.length === 0 ? (
          <EmptyState
            icon={Activity}
            title="No activity recorded yet"
            description="Actions performed in the application will automatically appear in this audit log."
          />
        ) : (
          <div className="overflow-x-auto rounded-xl border border-border/60">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>IP</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activityLogs.map((l) => (
                  <TableRow key={l.id}>
                    <TableCell className="font-mono text-xs">{l.id}</TableCell>
                    <TableCell className="font-medium">{l.user}</TableCell>
                    <TableCell><Badge variant="secondary">{l.action}</Badge></TableCell>
                    <TableCell>{l.target}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{l.time}</TableCell>
                    <TableCell className="font-mono text-xs">{l.ip}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>
    </div>
  );
}

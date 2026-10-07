import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/PageHeader";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { StatCard } from "@/components/app/StatCard";
import { CheckCircle2, XCircle, ClipboardCheck } from "lucide-react";
import { useState } from "react";
import { useStorageData, getPatients } from "@/lib/storage";
import { EmptyState } from "@/components/app/EmptyState";

export const Route = createFileRoute("/app/attendance")({ component: AttendancePage });

function AttendancePage() {
  const [patients] = useStorageData(getPatients);
  const [present, setPresent] = useState<Record<string, boolean>>({});

  const p = Object.values(present).filter(Boolean).length;
  const a = Math.max(0, patients.length - p);

  return (
    <div>
      <PageHeader title="Attendance" description="Track patient check-ins for active camps and consultations." crumbs={[{ label: "Attendance" }]} />
      <div className="mb-4 grid gap-4 sm:grid-cols-3">
        <StatCard label="Present" value={p} icon={CheckCircle2} tone="success" />
        <StatCard label="Absent" value={a} icon={XCircle} tone="destructive" />
        <StatCard label="Total Registered" value={patients.length} icon={ClipboardCheck} tone="primary" />
      </div>
      <Card className="p-4 sm:p-6">
        {patients.length === 0 ? (
          <EmptyState
            icon={ClipboardCheck}
            title="No patients to track attendance"
            description="Registered patients will appear here for daily check-in marking."
          />
        ) : (
          <div className="overflow-x-auto rounded-xl border border-border/60">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Condition / Notes</TableHead>
                  <TableHead className="text-right">Present</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patients.map((pt) => (
                  <TableRow key={pt.id}>
                    <TableCell className="font-mono text-xs">{pt.id}</TableCell>
                    <TableCell className="font-medium">{pt.name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{pt.condition || "General Consultation"}</TableCell>
                    <TableCell className="text-right">
                      <Checkbox
                        checked={Boolean(present[pt.id])}
                        onCheckedChange={(v) => setPresent((s) => ({ ...s, [pt.id]: Boolean(v) }))}
                      />
                    </TableCell>
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

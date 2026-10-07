import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/app/PageHeader";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/app/StatusBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, Plus, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";
import { useStorageData, getLabReports } from "@/lib/storage";
import { AddLabReportModal } from "@/components/app/modals/AddLabReportModal";
import { EmptyState } from "@/components/app/EmptyState";

export const Route = createFileRoute("/app/lab-reports")({ component: Lab });

function Lab() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [labReports] = useStorageData(getLabReports);

  return (
    <div>
      <PageHeader
        title="Lab Reports & Requests"
        description="All laboratory investigations and results."
        crumbs={[{ label: "Lab Reports" }]}
        actions={
          <Button className="gradient-primary text-white" onClick={() => setAddModalOpen(true)}>
            <Plus className="mr-1 h-4 w-4" /> Add Lab Report
          </Button>
        }
      />
      <Card className="p-4 sm:p-6">
        {labReports.length === 0 ? (
          <EmptyState
            icon={FileSpreadsheet}
            title="No lab reports available"
            description="Click the button below to add your first lab report or request."
            action={
              <Button className="gradient-primary text-white" onClick={() => setAddModalOpen(true)}>
                <Plus className="mr-1 h-4 w-4" /> Add Lab Report
              </Button>
            }
          />
        ) : (
          <div className="overflow-x-auto rounded-xl border border-border/60">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Patient / Test</TableHead>
                  <TableHead>Requested by</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Result</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {labReports.map((l) => (
                  <TableRow key={l.id}>
                    <TableCell className="font-mono text-xs">{l.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{l.test}</p>
                        <p className="text-xs text-muted-foreground">{l.patientId}</p>
                      </div>
                    </TableCell>
                    <TableCell>{l.doctorName}</TableCell>
                    <TableCell>{l.date}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{l.result ?? "Pending"}</TableCell>
                    <TableCell><StatusBadge status={l.status} /></TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="ghost" onClick={() => toast.success("Lab report downloaded")}>
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>

      <AddLabReportModal open={addModalOpen} onOpenChange={setAddModalOpen} />
    </div>
  );
}

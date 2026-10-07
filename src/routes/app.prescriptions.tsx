import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/app/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pill, Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useStorageData, getPrescriptions } from "@/lib/storage";
import { AddPrescriptionModal } from "@/components/app/modals/AddPrescriptionModal";
import { EmptyState } from "@/components/app/EmptyState";
import { useApp } from "@/context/AppContext";

export const Route = createFileRoute("/app/prescriptions")({ component: Rx });

function Rx() {
  const { user } = useApp();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [allPrescriptions] = useStorageData(getPrescriptions);

  const isPatient = user?.role === "patient";
  const canAdd = user?.role === "doctor" || user?.role === "admin";

  // Filter prescriptions for patient to only see their OWN prescriptions
  const prescriptions = isPatient
    ? allPrescriptions.filter((rx) => {
        if (!user) return false;
        const uEmail = (user.email || "").toLowerCase();
        const uName = (user.name || "").toLowerCase();
        const uId = (user.id || "").toLowerCase();
        const rxEmail = (rx.patientEmail || "").toLowerCase();
        const rxId = (rx.patientId || "").toLowerCase();
        const rxName = (rx.patientName || rx.patientId || "").toLowerCase();
        const uEmailPrefix = uEmail.split("@")[0];

        if (rxEmail && uEmail && rxEmail === uEmail) return true;
        if (rxId && uId && rxId === uId) return true;
        if (rxName && uName && (rxName === uName || rxName.includes(uName) || uName.includes(rxName))) return true;
        if (uEmailPrefix && (rxId.includes(uEmailPrefix) || rxName.includes(uEmailPrefix))) return true;

        return false;
      })
    : allPrescriptions;

  return (
    <div>
      <PageHeader
        title={isPatient ? "My Prescriptions" : "All Prescriptions"}
        description={isPatient ? "Your personal prescribed medicines and dosages." : "All medicines prescribed by care team."}
        crumbs={[{ label: "Prescriptions" }]}
        actions={
          canAdd ? (
            <Button className="gradient-primary text-white" onClick={() => setAddModalOpen(true)}>
              <Plus className="mr-1 h-4 w-4" /> Add Prescription
            </Button>
          ) : undefined
        }
      />

      {prescriptions.length === 0 ? (
        <EmptyState
          icon={Pill}
          title={isPatient ? "No prescriptions issued for you yet" : "No prescriptions created yet"}
          description={
            isPatient
              ? "When your doctor conducts a consultation and issues a prescription, it will appear here."
              : "Click the button below to add a prescription for a patient."
          }
          action={
            canAdd ? (
              <Button className="gradient-primary text-white" onClick={() => setAddModalOpen(true)}>
                <Plus className="mr-1 h-4 w-4" /> Add Prescription
              </Button>
            ) : undefined
          }
        />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {prescriptions.map((rx) => (
            <Card key={rx.id} className="p-6 hover-lift">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Pill className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">{rx.diagnosis}</p>
                    <p className="text-xs text-muted-foreground">
                      Patient: {rx.patientName || rx.patientId} · {rx.doctorName} · {rx.date}
                    </p>
                  </div>
                </div>
                <Badge variant="outline">{rx.id}</Badge>
              </div>
              <ul className="mt-4 space-y-2">
                {rx.medicines.map((m, idx) => (
                  <li key={idx} className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2 text-sm">
                    <div>
                      <p className="font-medium">{m.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {m.dosage} · {m.frequency}
                      </p>
                    </div>
                    <Badge variant="secondary">{m.duration}</Badge>
                  </li>
                ))}
              </ul>
              {rx.notes && <p className="mt-3 text-xs text-muted-foreground">Notes: {rx.notes}</p>}
              <Button size="sm" variant="ghost" className="mt-3" onClick={() => toast.success("Prescription downloaded")}>
                <Download className="mr-1 h-4 w-4" /> Download PDF
              </Button>
            </Card>
          ))}
        </div>
      )}

      {canAdd && <AddPrescriptionModal open={addModalOpen} onOpenChange={setAddModalOpen} />}
    </div>
  );
}

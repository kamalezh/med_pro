import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, SkipForward, QrCode, ListOrdered } from "lucide-react";
import { toast } from "sonner";
import { useStorageData, getPatients, savePatients } from "@/lib/storage";
import { EmptyState } from "@/components/app/EmptyState";

export const Route = createFileRoute("/app/queue")({ component: QueuePage });

function QueuePage() {
  const [patients] = useStorageData(getPatients);

  const queue = patients.map((p, i) => ({ ...p, token: i + 1 }));

  const done = (id: string, name: string) => {
    const updated = patients.filter(x => x.id !== id);
    savePatients(updated);
    toast.success(`Served patient "${name}"`);
  };

  const skip = (id: string) => {
    toast.info("Patient moved down in queue");
  };

  return (
    <div>
      <PageHeader
        title="Queue Management"
        description="Live patient queue for active camp/clinic."
        crumbs={[{ label: "Queue" }]}
        actions={<Button variant="outline"><QrCode className="mr-1 h-4 w-4" /> Scan patient QR</Button>}
      />
      <Card className="p-4 sm:p-6">
        {queue.length === 0 ? (
          <EmptyState
            icon={ListOrdered}
            title="Queue clear — no active patients in queue"
            description="Register a patient or schedule an appointment to populate the queue."
          />
        ) : (
          <div className="space-y-3">
            {queue.map((p, i) => (
              <div key={p.id} className="flex items-center gap-4 rounded-xl border border-border/60 p-4 hover:bg-muted/30">
                <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl text-lg font-bold ${i === 0 ? "gradient-primary text-white shadow-glow" : "bg-muted text-foreground"}`}>{p.token}</div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{p.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{p.condition || "General Consultation"} · {p.age}y</p>
                </div>
                {i === 0 && <span className="rounded-full bg-success/15 px-3 py-1 text-xs font-medium text-success animate-pulse">Now serving</span>}
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" title="Skip / Move down" onClick={() => skip(p.id)}><SkipForward className="h-4 w-4" /></Button>
                  <Button size="icon" className="gradient-primary text-white" title="Mark complete" onClick={() => done(p.id, p.name)}><Check className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

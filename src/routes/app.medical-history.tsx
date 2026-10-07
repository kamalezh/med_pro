import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/app/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarClock, Download, Plus, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useStorageData, getMedicalHistory, addMedicalHistory } from "@/lib/storage";
import { EmptyState } from "@/components/app/EmptyState";

export const Route = createFileRoute("/app/medical-history")({ component: History });

function History() {
  const [addOpen, setAddOpen] = useState(false);
  const [medicalHistory] = useStorageData(getMedicalHistory);

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [type, setType] = useState("Consultation");
  const [description, setDescription] = useState("");
  const [doctor, setDoctor] = useState("");

  const handleAddHistory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description) {
      toast.error("Please enter a description");
      return;
    }
    addMedicalHistory({
      date,
      type,
      description,
      doctor: doctor || "Attending Physician",
    });
    toast.success("Medical history entry added");
    setAddOpen(false);
    setDescription("");
  };

  return (
    <div>
      <PageHeader
        title="Medical History"
        description="Complete timeline of medical activity and records."
        crumbs={[{ label: "Medical History" }]}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => toast.success("PDF export generated")}>
              <Download className="mr-1 h-4 w-4" /> Export PDF
            </Button>
            <Button className="gradient-primary text-white" onClick={() => setAddOpen(true)}>
              <Plus className="mr-1 h-4 w-4" /> Add Record
            </Button>
          </div>
        }
      />
      <Card className="p-6">
        {medicalHistory.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No medical history recorded"
            description="Click 'Add Record' to log consultations, prescriptions, vaccinations, or surgeries."
            action={
              <Button className="gradient-primary text-white" onClick={() => setAddOpen(true)}>
                <Plus className="mr-1 h-4 w-4" /> Add Record
              </Button>
            }
          />
        ) : (
          <ol className="relative border-l-2 border-primary/30 ml-2">
            {medicalHistory.map((e) => (
              <li key={e.id} className="mb-6 ml-6">
                <span className="absolute -left-3 grid h-6 w-6 place-items-center rounded-full gradient-primary text-white shadow-glow">
                  <CalendarClock className="h-3 w-3" />
                </span>
                <div className="glass rounded-xl p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Badge variant="secondary">{e.type}</Badge>
                    <time className="text-xs text-muted-foreground">{e.date}</time>
                  </div>
                  <p className="mt-2 text-sm">{e.description}</p>
                  <p className="mt-1 text-xs text-muted-foreground">— {e.doctor}</p>
                </div>
              </li>
            ))}
          </ol>
        )}
      </Card>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Add Medical History Record</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddHistory} className="space-y-4 py-2">
            <div>
              <Label>Date</Label>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
            <div>
              <Label>Record Type</Label>
              <Input placeholder="e.g. Consultation, Vaccination, Surgery" value={type} onChange={(e) => setType(e.target.value)} required />
            </div>
            <div>
              <Label>Description / Note</Label>
              <Input placeholder="e.g. Routine checkup, all indicators normal" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <div>
              <Label>Attending Doctor / Staff</Label>
              <Input placeholder="e.g. Dr. Michael Chen" value={doctor} onChange={(e) => setDoctor(e.target.value)} />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
              <Button type="submit" className="gradient-primary text-white">Save Record</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

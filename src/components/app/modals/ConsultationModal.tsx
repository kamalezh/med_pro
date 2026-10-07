import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { addPrescription, getAppointments, saveAppointments, getPatients } from "@/lib/storage";
import { toast } from "sonner";
import { Appointment } from "@/mock/data";
import { Plus, Trash2, User, Stethoscope, HeartPulse, Activity } from "lucide-react";
import { useApp } from "@/context/AppContext";

interface ConsultationModalProps {
  appointment: Appointment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

type Med = { name: string; dosage: string; freq: string; duration: string };

export function ConsultationModal({ appointment, open, onOpenChange, onSuccess }: ConsultationModalProps) {
  const { user } = useApp();
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState(appointment?.reason || "");
  const [notes, setNotes] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [meds, setMeds] = useState<Med[]>([
    { name: "Paracetamol 500mg", dosage: "1 tablet", freq: "3x daily", duration: "5 days" },
  ]);

  if (!appointment) return null;

  const patients = getPatients();
  const patientObj = patients.find(p => p.name === appointment.patientName || p.id === appointment.patientId);

  const handleAddMed = () => {
    setMeds([...meds, { name: "", dosage: "1 tablet", freq: "2x daily", duration: "7 days" }]);
  };

  const handleRemoveMed = (index: number) => {
    setMeds(meds.filter((_, i) => i !== index));
  };

  const handleMedChange = (index: number, field: keyof Med, val: string) => {
    const updated = [...meds];
    updated[index] = { ...updated[index], [field]: val };
    setMeds(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!diagnosis) {
      toast.error("Please enter a primary diagnosis");
      return;
    }

    const doctorName = user?.name ? (user.name.startsWith("Dr.") ? user.name : `Dr. ${user.name}`) : appointment.doctorName;

    // Issue Prescription
    addPrescription({
      patientId: appointment.patientId || appointment.patientName,
      patientName: appointment.patientName,
      patientEmail: appointment.patientEmail || patientObj?.email,
      doctorName,
      date: new Date().toISOString().split("T")[0],
      diagnosis,
      medicines: meds.filter((m) => m.name.trim() !== ""),
      notes: notes || "Take medication after meals.",
    });

    // Mark appointment as Completed in local storage
    const allAppts = getAppointments();
    const updatedAppts = allAppts.map((a) => (a.id === appointment.id ? { ...a, status: "Completed" as const } : a));
    saveAppointments(updatedAppts);

    toast.success(`Consultation completed for ${appointment.patientName}!`);
    onOpenChange(false);
    resetForm();
    if (onSuccess) onSuccess();
  };

  const resetForm = () => {
    setSymptoms("");
    setDiagnosis("");
    setNotes("");
    setFollowUp("");
    setMeds([{ name: "Paracetamol 500mg", dosage: "1 tablet", freq: "3x daily", duration: "5 days" }]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-primary" /> Start Patient Consultation
          </DialogTitle>
        </DialogHeader>

        {/* Patient Summary Header */}
        <div className="rounded-xl bg-muted/40 p-4 border border-border/60">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-full gradient-primary text-base font-bold text-white shadow-soft">
                {appointment.patientName.split(" ").map(n => n[0]).slice(0, 2).join("")}
              </div>
              <div>
                <p className="font-bold text-base">{appointment.patientName}</p>
                <p className="text-xs text-muted-foreground">
                  {appointment.department} · Token #{appointment.token} · {appointment.time}
                </p>
              </div>
            </div>
            <Badge variant="outline" className="font-mono text-xs">{appointment.id}</Badge>
          </div>

          {patientObj && (
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-border/40 text-xs">
              <div><span className="text-muted-foreground">Age/Gender:</span> <p className="font-medium">{patientObj.age}y · {patientObj.gender}</p></div>
              <div><span className="text-muted-foreground">Blood Group:</span> <p className="font-semibold text-destructive">{patientObj.bloodGroup}</p></div>
              <div><span className="text-muted-foreground">Phone:</span> <p className="font-mono">{patientObj.phone}</p></div>
              <div><span className="text-muted-foreground">Condition:</span> <p className="truncate font-medium">{patientObj.condition || "N/A"}</p></div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 py-1">
          <div>
            <Label className="font-semibold">Symptoms & Clinical History</Label>
            <Textarea
              rows={2}
              placeholder="Describe symptoms, temperature, blood pressure, duration of illness..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label className="font-semibold">Primary Diagnosis *</Label>
            <Input
              placeholder="e.g. Acute Bronchitis, Hypertension, Viral Fever"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              required
              className="mt-1"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="font-semibold">Prescription Medicines</Label>
              <Button type="button" size="sm" variant="outline" onClick={handleAddMed}>
                <Plus className="mr-1 h-3.5 w-3.5" /> Add Medicine
              </Button>
            </div>
            {meds.map((m, i) => (
              <div key={i} className="grid grid-cols-12 gap-2 items-center rounded-lg border p-2 bg-muted/20">
                <div className="col-span-4">
                  <Input
                    placeholder="Medicine name"
                    value={m.name}
                    onChange={(e) => handleMedChange(i, "name", e.target.value)}
                  />
                </div>
                <div className="col-span-3">
                  <Input
                    placeholder="Dosage"
                    value={m.dosage}
                    onChange={(e) => handleMedChange(i, "dosage", e.target.value)}
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    placeholder="Freq"
                    value={m.freq}
                    onChange={(e) => handleMedChange(i, "freq", e.target.value)}
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    placeholder="Duration"
                    value={m.duration}
                    onChange={(e) => handleMedChange(i, "duration", e.target.value)}
                  />
                </div>
                <div className="col-span-1 text-right">
                  <Button
                    size="icon"
                    variant="ghost"
                    type="button"
                    onClick={() => handleRemoveMed(i)}
                    disabled={meds.length === 1}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div>
            <Label className="font-semibold">Doctor's Clinical Notes & Advice</Label>
            <Textarea
              rows={2}
              placeholder="Dietary instructions, rest, lifestyle changes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label className="font-semibold">Recommended Follow-up Date</Label>
            <Input
              type="date"
              value={followUp}
              onChange={(e) => setFollowUp(e.target.value)}
              className="mt-1 sm:w-1/2"
            />
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="gradient-primary text-white">
              Complete Consultation & Issue Rx
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

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
import { addPrescription, getPatients } from "@/lib/storage";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";

interface AddPrescriptionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function AddPrescriptionModal({ open, onOpenChange, onSuccess }: AddPrescriptionModalProps) {
  const [patientName, setPatientName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState("Take medication after meals.");
  const [medicines, setMedicines] = useState([
    { name: "Paracetamol 500mg", dosage: "1 tablet", frequency: "3x daily", duration: "5 days" },
  ]);

  const existingPatients = getPatients();

  const handleAddMed = () => {
    setMedicines([...medicines, { name: "", dosage: "1 tablet", frequency: "2x daily", duration: "7 days" }]);
  };

  const handleRemoveMed = (index: number) => {
    setMedicines(medicines.filter((_, i) => i !== index));
  };

  const handleMedChange = (index: number, field: string, val: string) => {
    const updated = [...medicines];
    updated[index] = { ...updated[index], [field]: val };
    setMedicines(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !doctorName || !diagnosis) {
      toast.error("Please fill in patient name, doctor name, and diagnosis");
      return;
    }

    const matchingPatient = existingPatients.find(p => p.name.toLowerCase() === patientName.toLowerCase() || p.id.toLowerCase() === patientName.toLowerCase());

    addPrescription({
      patientId: matchingPatient?.id || patientName,
      patientName: matchingPatient?.name || patientName,
      patientEmail: matchingPatient?.email,
      doctorName: doctorName.startsWith("Dr.") ? doctorName : `Dr. ${doctorName}`,
      date,
      diagnosis,
      medicines: medicines.filter((m) => m.name.trim() !== ""),
      notes: notes || "Take after meals.",
    });

    toast.success(`Prescription created for ${patientName}`);
    onOpenChange(false);
    resetForm();
    if (onSuccess) onSuccess();
  };

  const resetForm = () => {
    setPatientName("");
    setDoctorName("");
    setDiagnosis("");
    setDate(new Date().toISOString().split("T")[0]);
    setNotes("Take medication after meals.");
    setMedicines([{ name: "Paracetamol 500mg", dosage: "1 tablet", frequency: "3x daily", duration: "5 days" }]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">New Prescription</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-2 sm:grid-cols-2">
          <div>
            <Label htmlFor="rx-pname">Patient Name *</Label>
            <Input
              id="rx-pname"
              placeholder="e.g. Sarah Johnson"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="rx-dname">Doctor Name *</Label>
            <Input
              id="rx-dname"
              placeholder="e.g. Dr. Michael Chen"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="rx-diag">Diagnosis *</Label>
            <Input
              id="rx-diag"
              placeholder="e.g. Acute Bronchitis"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="rx-date">Date</Label>
            <Input
              id="rx-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="sm:col-span-2 space-y-3">
            <div className="flex items-center justify-between">
              <Label className="font-semibold">Prescribed Medicines</Label>
              <Button type="button" size="sm" variant="outline" onClick={handleAddMed}>
                <Plus className="mr-1 h-3.5 w-3.5" /> Add Medicine
              </Button>
            </div>
            {medicines.map((med, idx) => (
              <div key={idx} className="grid grid-cols-12 gap-2 items-center rounded-lg border p-2 bg-muted/20">
                <div className="col-span-4">
                  <Input
                    placeholder="Medicine name"
                    value={med.name}
                    onChange={(e) => handleMedChange(idx, "name", e.target.value)}
                  />
                </div>
                <div className="col-span-3">
                  <Input
                    placeholder="Dosage"
                    value={med.dosage}
                    onChange={(e) => handleMedChange(idx, "dosage", e.target.value)}
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    placeholder="Freq"
                    value={med.frequency}
                    onChange={(e) => handleMedChange(idx, "frequency", e.target.value)}
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    placeholder="Duration"
                    value={med.duration}
                    onChange={(e) => handleMedChange(idx, "duration", e.target.value)}
                  />
                </div>
                <div className="col-span-1 text-right">
                  <Button type="button" size="icon" variant="ghost" onClick={() => handleRemoveMed(idx)} disabled={medicines.length === 1}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="rx-notes">Notes / Instructions</Label>
            <Textarea
              id="rx-notes"
              placeholder="e.g. Drink plenty of water, follow up in 10 days"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
            />
          </div>

          <DialogFooter className="mt-4 sm:col-span-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="gradient-primary text-white">
              Save Prescription
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

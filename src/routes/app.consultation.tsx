import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PageHeader } from "@/components/app/PageHeader";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus, Trash2, User, Phone, Mail, MapPin, HeartPulse, Calendar, Activity, ExternalLink,
  Search, Users, CheckCircle2
} from "lucide-react";
import { toast } from "sonner";
import { useStorageData, getPatients, addPrescription } from "@/lib/storage";
import { StatusBadge } from "@/components/app/StatusBadge";
import { useApp } from "@/context/AppContext";
import { AddPatientModal } from "@/components/app/modals/AddPatientModal";

export const Route = createFileRoute("/app/consultation")({ component: ConsultPage });

type Med = { name: string; dosage: string; freq: string; duration: string };
type FormValues = { symptoms: string; diagnosis: string; notes: string; followUp: string };

function ConsultPage() {
  const { user } = useApp();
  const [patients] = useStorageData(getPatients);
  const [meds, setMeds] = useState<Med[]>([{ name: "", dosage: "", freq: "", duration: "" }]);
  const [searchQ, setSearchQ] = useState("");
  const [patientId, setPatientId] = useState<string>(patients[0]?.id || "");
  const [addPatientOpen, setAddPatientOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: { symptoms: "", diagnosis: "", notes: "", followUp: "" },
  });

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(searchQ.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQ.toLowerCase()) ||
    (p.phone && p.phone.includes(searchQ))
  );

  const selectedPatient = patients.find(x => x.id === patientId || x.name === patientId);

  const submit = (data: FormValues) => {
    if (!data.diagnosis) {
      toast.error("Please enter a diagnosis");
      return;
    }

    const doctorName = user?.name ? (user.name.startsWith("Dr.") ? user.name : `Dr. ${user.name}`) : "Dr. Medical Officer";

    addPrescription({
      patientId: selectedPatient ? selectedPatient.name : (patientId || "Patient"),
      doctorName,
      date: new Date().toISOString().split("T")[0],
      diagnosis: data.diagnosis,
      medicines: meds.filter(m => m.name.trim() !== "").map(m => ({
        name: m.name,
        dosage: m.dosage || "1 tablet",
        frequency: m.freq || "2x daily",
        duration: m.duration || "5 days",
      })),
      notes: data.notes || "Take medication after meals.",
    });

    toast.success("Consultation saved & prescription issued successfully!");
    reset();
    setMeds([{ name: "", dosage: "", freq: "", duration: "" }]);
  };

  return (
    <div>
      <PageHeader
        title="Consultation & Diagnosis"
        description="Select registered patients to review health details, record clinical descriptions, diagnosis and prescriptions."
        crumbs={[{ label: "Consultation" }]}
        actions={
          <Button className="gradient-primary text-white" onClick={() => setAddPatientOpen(true)}>
            <Plus className="mr-1 h-4 w-4" /> Register New Patient
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        {/* LEFT — Registered Patients List & Patient Information */}
        <div className="space-y-4">
          {/* Registered Patients Selector List */}
          <Card className="p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Users className="h-4 w-4 text-primary" /> Registered Patients ({patients.length})
              </h3>
            </div>

            <div className="relative mb-3">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search name, ID or phone..."
                value={searchQ}
                onChange={(e) => setSearchQ(e.target.value)}
                className="pl-8 text-xs h-9"
              />
            </div>

            {patients.length === 0 ? (
              <div className="rounded-xl bg-muted/30 p-4 text-center text-xs text-muted-foreground">
                <p className="font-medium text-foreground mb-1">No registered patients found</p>
                <p className="mb-3">Register a patient first to start consultation.</p>
                <Button size="sm" className="gradient-primary text-white text-xs" onClick={() => setAddPatientOpen(true)}>
                  <Plus className="mr-1 h-3 w-3" /> Register Patient
                </Button>
              </div>
            ) : filteredPatients.length === 0 ? (
              <p className="py-4 text-center text-xs text-muted-foreground">No matching patients for "{searchQ}"</p>
            ) : (
              <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1">
                {filteredPatients.map((p) => {
                  const isSelected = p.id === patientId;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPatientId(p.id)}
                      className={`w-full text-left rounded-xl p-2.5 transition-all flex items-center justify-between border ${
                        isSelected
                          ? "bg-primary/10 border-primary shadow-soft text-foreground"
                          : "border-border/50 hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold ${
                          isSelected ? "gradient-primary text-white" : "bg-muted text-muted-foreground"
                        }`}>
                          {p.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-xs font-semibold">{p.name}</p>
                          <p className="truncate text-[10px] text-muted-foreground">{p.id} · {p.age}y · {p.bloodGroup}</p>
                        </div>
                      </div>
                      {isSelected && <CheckCircle2 className="h-4 w-4 text-primary shrink-0 ml-1" />}
                    </button>
                  );
                })}
              </div>
            )}
          </Card>

          {/* Selected Patient Detailed Health Profile */}
          <Card className="p-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-primary" /> Patient Details Info
            </h3>

            {selectedPatient ? (
              <div className="space-y-4">
                <div className="text-center pt-2 border-t border-border/60">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-full gradient-primary text-lg font-bold text-white shadow-glow">
                    {selectedPatient.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                  </div>
                  <h2 className="mt-2 text-base font-bold">{selectedPatient.name}</h2>
                  <p className="text-xs font-mono text-muted-foreground">Patient ID: {selectedPatient.id}</p>
                  <div className="mt-2 flex justify-center">
                    <StatusBadge status={selectedPatient.status} />
                  </div>
                </div>

                <div className="space-y-2 rounded-xl bg-muted/40 p-3 text-xs">
                  <div className="flex items-center justify-between border-b border-border/40 pb-1.5">
                    <span className="text-muted-foreground flex items-center gap-1.5"><HeartPulse className="h-3.5 w-3.5 text-primary" /> Age / Gender</span>
                    <span className="font-semibold">{selectedPatient.age} yrs · {selectedPatient.gender}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-border/40 pb-1.5">
                    <span className="text-muted-foreground flex items-center gap-1.5"><Activity className="h-3.5 w-3.5 text-destructive" /> Blood Group</span>
                    <span className="rounded bg-destructive/10 px-2 py-0.5 font-mono font-bold text-destructive">{selectedPatient.bloodGroup}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-border/40 pb-1.5">
                    <span className="text-muted-foreground flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-primary" /> Phone</span>
                    <span className="font-mono">{selectedPatient.phone}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-border/40 pb-1.5">
                    <span className="text-muted-foreground flex items-center gap-1.5"><Mail className="h-3.5 w-3.5 text-primary" /> Email</span>
                    <span className="truncate max-w-[170px]">{selectedPatient.email}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-border/40 pb-1.5">
                    <span className="text-muted-foreground flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-primary" /> Address</span>
                    <span className="truncate max-w-[170px]">{selectedPatient.address}</span>
                  </div>
                  <div className="flex items-center justify-between pt-0.5">
                    <span className="text-muted-foreground flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-primary" /> Last Visit</span>
                    <span>{selectedPatient.lastVisit}</span>
                  </div>
                </div>

                {selectedPatient.condition && (
                  <div className="rounded-xl bg-primary/10 p-3 text-xs border border-primary/20">
                    <p className="font-semibold text-primary">Condition / Chief Complaint:</p>
                    <p className="mt-1 text-foreground">{selectedPatient.condition}</p>
                  </div>
                )}

                <Link to="/app/patients/$id" params={{ id: selectedPatient.id }}>
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    <ExternalLink className="mr-1 h-3.5 w-3.5" /> Full Medical History & Profile
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="rounded-xl bg-muted/30 p-5 text-center text-xs text-muted-foreground">
                <User className="mx-auto h-7 w-7 text-muted-foreground/50 mb-1.5" />
                <p className="font-medium text-foreground">No patient selected</p>
                <p className="mt-1">Pick a patient from the registered list above.</p>
              </div>
            )}
          </Card>
        </div>

        {/* RIGHT — Consultation Description & Prescription Form */}
        <Card className="p-6">
          <form onSubmit={handleSubmit(submit)} className="space-y-5">
            <div>
              <Label className="font-semibold text-sm">Patient Symptoms & History Notes</Label>
              <Textarea
                rows={3}
                placeholder="Describe patient reported symptoms, chief complaints, temperature, blood pressure, duration of illness…"
                {...register("symptoms")}
                className="mt-1.5"
              />
            </div>

            <div>
              <Label className="font-semibold text-sm">Primary Diagnosis *</Label>
              <Input
                placeholder="Enter clinical diagnosis (e.g. Acute Bronchitis, Type 2 Diabetes, Hypertension Stage 1)"
                {...register("diagnosis", { required: true })}
                required
                className="mt-1.5"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="font-semibold text-sm">Prescription & Medication Schedule</Label>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => setMeds(m => [...m, { name: "", dosage: "1 tablet", freq: "2x daily", duration: "5 days" }])}
                >
                  <Plus className="mr-1 h-3.5 w-3.5" /> Add Medicine
                </Button>
              </div>
              <div className="space-y-2">
                {meds.map((m, i) => (
                  <div key={i} className="grid grid-cols-12 items-center gap-2 rounded-lg border p-2 bg-muted/20">
                    <div className="col-span-4">
                      <Input
                        placeholder="Medicine name"
                        value={m.name}
                        onChange={e => setMeds(x => x.map((y, j) => j === i ? { ...y, name: e.target.value } : y))}
                      />
                    </div>
                    <div className="col-span-3">
                      <Input
                        placeholder="Dosage (e.g. 500mg)"
                        value={m.dosage}
                        onChange={e => setMeds(x => x.map((y, j) => j === i ? { ...y, dosage: e.target.value } : y))}
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        placeholder="Freq (3x daily)"
                        value={m.freq}
                        onChange={e => setMeds(x => x.map((y, j) => j === i ? { ...y, freq: e.target.value } : y))}
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        placeholder="Duration (5 days)"
                        value={m.duration}
                        onChange={e => setMeds(x => x.map((y, j) => j === i ? { ...y, duration: e.target.value } : y))}
                      />
                    </div>
                    <div className="col-span-1 text-right">
                      <Button
                        size="icon"
                        variant="ghost"
                        type="button"
                        onClick={() => setMeds(x => x.filter((_, j) => j !== i))}
                        disabled={meds.length === 1}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="font-semibold text-sm">Doctor's Clinical Description & Advice</Label>
              <Textarea
                rows={3}
                placeholder="Dietary recommendations, rest, lifestyle changes, special clinical instructions…"
                {...register("notes")}
                className="mt-1.5"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label className="font-semibold text-sm">Recommended Follow-up Date</Label>
                <Input type="date" {...register("followUp")} className="mt-1.5" />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button type="submit" className="gradient-primary text-white shadow-soft">
                Save Consultation & Issue Prescription
              </Button>
            </div>
          </form>
        </Card>
      </div>

      <AddPatientModal open={addPatientOpen} onOpenChange={setAddPatientOpen} />
    </div>
  );
}

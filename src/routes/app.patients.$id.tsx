import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/PageHeader";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/app/StatusBadge";
import { QRCodeSVG } from "qrcode.react";
import { getPatients, getMedicalHistory, getPrescriptions, getLabReports } from "@/lib/storage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone, MapPin, HeartPulse } from "lucide-react";

export const Route = createFileRoute("/app/patients/$id")({
  loader: ({ params }) => {
    const patients = getPatients();
    const patient = patients.find(p => p.id === params.id);
    if (!patient) throw notFound();
    return { patient };
  },
  component: PatientDetail,
  notFoundComponent: () => (
    <div className="p-12 text-center text-muted-foreground">
      <h3 className="text-lg font-semibold mb-2">Patient not found</h3>
      <p className="mb-4">The patient record you are looking for does not exist or has been removed.</p>
      <Link to="/app/patients" className="text-primary hover:underline">Back to Patients List</Link>
    </div>
  ),
});

function PatientDetail() {
  const { patient } = Route.useLoaderData();
  const medicalHistory = getMedicalHistory();
  const prescriptions = getPrescriptions().filter(r => r.patientId === patient.id || r.patientId === patient.name);
  const labReports = getLabReports().filter(l => l.patientId === patient.id || l.patientId === patient.name);

  return (
    <div>
      <PageHeader title={patient.name} crumbs={[{ label: "Patients", to: "/app/patients" }, { label: patient.name }]} />
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="space-y-4">
          <Card className="p-6 text-center">
            <div className="mx-auto grid h-24 w-24 place-items-center rounded-full gradient-primary text-2xl font-bold text-white shadow-glow">
              {patient.name.split(" ").map((n: string)=>n[0]).slice(0,2).join("")}
            </div>
            <h2 className="mt-4 text-lg font-bold">{patient.name}</h2>
            <p className="text-xs text-muted-foreground">Patient ID · {patient.id}</p>
            <div className="mt-3 flex justify-center"><StatusBadge status={patient.status} /></div>
            <div className="mt-4 space-y-2 text-left text-sm">
              <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary shrink-0" />{patient.email}</p>
              <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary shrink-0" />{patient.phone}</p>
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary shrink-0" />{patient.address}</p>
              <p className="flex items-center gap-2"><HeartPulse className="h-4 w-4 text-primary shrink-0" />{patient.bloodGroup} · {patient.age}y · {patient.gender}</p>
            </div>
          </Card>
          <Card className="p-6 text-center">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Patient QR Code</p>
            <div className="mx-auto mt-3 grid h-40 w-40 place-items-center rounded-xl bg-white p-2">
              <QRCodeSVG value={patient.id} size={144} level="H" />
            </div>
          </Card>
        </div>
        <Card className="p-6">
          <Tabs defaultValue="history">
            <TabsList><TabsTrigger value="history">History</TabsTrigger><TabsTrigger value="rx">Prescriptions</TabsTrigger><TabsTrigger value="lab">Lab Reports</TabsTrigger></TabsList>
            <TabsContent value="history" className="mt-4">
              {medicalHistory.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4 text-center">No recorded medical history entries yet.</p>
              ) : (
                <ol className="relative border-l-2 border-primary/30">
                  {medicalHistory.map(e => (
                    <li key={e.id} className="mb-4 ml-4">
                      <span className="absolute -left-2 h-4 w-4 rounded-full gradient-primary" />
                      <p className="text-xs text-muted-foreground">{e.date}</p>
                      <p className="font-medium">{e.type} — {e.description}</p>
                      <p className="text-xs text-muted-foreground">by {e.doctor}</p>
                    </li>
                  ))}
                </ol>
              )}
            </TabsContent>
            <TabsContent value="rx" className="mt-4 space-y-3">
              {prescriptions.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4 text-center">No prescriptions recorded for this patient.</p>
              ) : (
                prescriptions.map(rx => (
                  <div key={rx.id} className="rounded-xl border border-border/60 p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{rx.diagnosis}</p><span className="text-xs text-muted-foreground">{rx.date}</span>
                    </div>
                    <ul className="mt-2 text-sm text-muted-foreground">
                      {rx.medicines.map((m, idx) => <li key={idx}>• {m.name} — {m.dosage}, {m.frequency}</li>)}
                    </ul>
                  </div>
                ))
              )}
            </TabsContent>
            <TabsContent value="lab" className="mt-4 space-y-2">
              {labReports.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4 text-center">No lab reports recorded for this patient.</p>
              ) : (
                labReports.map(l => (
                  <div key={l.id} className="flex items-center justify-between rounded-xl border border-border/60 p-3">
                    <div><p className="font-medium">{l.test}</p><p className="text-xs text-muted-foreground">{l.date} · {l.doctorName}</p></div>
                    <StatusBadge status={l.status} />
                  </div>
                ))
              )}
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}

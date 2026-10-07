import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/app/PageHeader";
import { StatusBadge } from "@/components/app/StatusBadge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useApp } from "@/context/AppContext";
import { Search, Plus, Check, X, Ban, Calendar, Stethoscope } from "lucide-react";
import { usePagination } from "@/hooks/usePagination";
import { toast } from "sonner";
import { useStorageData, getAppointments, saveAppointments } from "@/lib/storage";
import { AddAppointmentModal } from "@/components/app/modals/AddAppointmentModal";
import { ConsultationModal } from "@/components/app/modals/ConsultationModal";
import { EmptyState } from "@/components/app/EmptyState";
import { Appointment } from "@/mock/data";

export const Route = createFileRoute("/app/appointments")({ component: AppointmentsPage });

function AppointmentsPage() {
  const { user } = useApp();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [consultModalOpen, setConsultModalOpen] = useState(false);
  const [selectedApptForConsult, setSelectedApptForConsult] = useState<Appointment | null>(null);
  const [items] = useStorageData(getAppointments);

  const isPatient = user?.role === "patient";
  const isDoctor = user?.role === "doctor";
  const assignedCamp = user?.department || (typeof window !== "undefined" ? localStorage.getItem("mcm_doctor_assigned_camp") : "") || "";

  const filtered = useMemo(() => items.filter(a => {
    if (isPatient) {
      const uEmail = (user?.email || "").toLowerCase();
      const uName = (user?.name || "").toLowerCase();
      const uId = (user?.id || "").toLowerCase();
      const aEmail = (a.patientEmail || "").toLowerCase();
      const aName = (a.patientName || "").toLowerCase();
      const aId = (a.patientId || "").toLowerCase();
      const uEmailPrefix = uEmail.split("@")[0];

      const matchesPatient = (aEmail && uEmail && aEmail === uEmail) ||
        (aId && uId && aId === uId) ||
        (aName && uName && (aName === uName || aName.includes(uName) || uName.includes(aName))) ||
        (uEmailPrefix && (aName.includes(uEmailPrefix) || aId.includes(uEmailPrefix)));

      if (!matchesPatient) return false;
    }

    if (isDoctor && assignedCamp) {
      const aDept = (a.department || "").toLowerCase();
      const aReason = (a.reason || "").toLowerCase();
      const campLow = assignedCamp.toLowerCase();
      const docNameLow = (user?.name || "").toLowerCase();
      const aDocLow = (a.doctorName || "").toLowerCase();

      const matchesDoctorCamp =
        aDept.includes(campLow) ||
        campLow.includes(aDept) ||
        aReason.includes(campLow) ||
        aDocLow.includes(docNameLow) ||
        docNameLow.includes(aDocLow) ||
        a.doctorId === user?.id;

      if (!matchesDoctorCamp) return false;
    }

    return (status === "all" || a.status === status) &&
      (q === "" || a.patientName.toLowerCase().includes(q.toLowerCase()) || a.doctorName.toLowerCase().includes(q.toLowerCase()));
  }), [items, q, status, isPatient, isDoctor, assignedCamp, user]);

  const p = usePagination(filtered, 8);

  const setStatusFor = (id: string, s: Appointment["status"]) => {
    const updated = items.map(a => a.id === id ? { ...a, status: s } : a);
    saveAppointments(updated);
    toast.success(`Appointment ${s.toLowerCase()}`);
  };

  const handleStartConsultation = (appt: Appointment) => {
    setSelectedApptForConsult(appt);
    setConsultModalOpen(true);
  };

  const canManage = user?.role === "doctor" || user?.role === "admin";

  return (
    <div>
      <PageHeader
        title="Appointments & Direct Consultation"
        description="Manage bookings, approve requests, and launch direct patient consultations."
        crumbs={[{ label: "Appointments" }]}
        actions={
          <Button className="gradient-primary text-white" onClick={() => setAddModalOpen(true)}>
            <Plus className="mr-1 h-4 w-4" /> Book Appointment
          </Button>
        }
      />
      <Card className="p-4 sm:p-6">
        <div className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:flex-wrap">
          <div className="relative min-w-0 sm:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search patient or doctor…" value={q} onChange={e => setQ(e.target.value)} className="pl-9" />
          </div>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={Calendar}
            title={items.length === 0 ? "No appointments booked yet" : "No matching appointments found"}
            description={items.length === 0 ? "Click the button below to schedule your first appointment." : "Try clearing or changing your search filters."}
            action={
              <Button className="gradient-primary text-white" onClick={() => setAddModalOpen(true)}>
                <Plus className="mr-1 h-4 w-4" /> Book Appointment
              </Button>
            }
          />
        ) : (
          <>
            <div className="overflow-x-auto rounded-xl border border-border/60">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Date / Time</TableHead>
                    <TableHead>Token</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {p.current.map(a => (
                    <TableRow key={a.id}>
                      <TableCell className="font-mono text-xs">{a.id}</TableCell>
                      <TableCell className="font-medium">{a.patientName}</TableCell>
                      <TableCell>{a.doctorName}</TableCell>
                      <TableCell><Badge variant="secondary">{a.department}</Badge></TableCell>
                      <TableCell><div className="text-sm">{a.date}</div><div className="text-xs text-muted-foreground">{a.time}</div></TableCell>
                      <TableCell><span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-mono text-primary">#{a.token}</span></TableCell>
                      <TableCell><Badge variant="outline">{a.type}</Badge></TableCell>
                      <TableCell><StatusBadge status={a.status} /></TableCell>
                      <TableCell className="text-right">
                        <div className="inline-flex items-center gap-1.5 justify-end">
                          {/* DIRECT CONSULTATION BUTTON FOR DOCTORS AND ADMINS */}
                          {canManage && a.status !== "Completed" && a.status !== "Cancelled" && a.status !== "Rejected" && (
                            <Button
                              size="sm"
                              className="gradient-primary text-white text-xs h-8 px-2.5 shadow-soft"
                              onClick={() => handleStartConsultation(a)}
                            >
                              <Stethoscope className="mr-1 h-3.5 w-3.5" /> Consult
                            </Button>
                          )}

                          {canManage && a.status === "Pending" && (
                            <>
                              <Button size="icon" variant="ghost" className="h-8 w-8 text-success" title="Approve" onClick={() => setStatusFor(a.id, "Approved")}>
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" title="Reject" onClick={() => setStatusFor(a.id, "Rejected")}>
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}

                          {a.status !== "Cancelled" && a.status !== "Completed" && (
                            <Button size="icon" variant="ghost" className="h-8 w-8" title="Cancel" onClick={() => setStatusFor(a.id, "Cancelled")}>
                              <Ban className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <Pager p={p} />
          </>
        )}
      </Card>

      <AddAppointmentModal open={addModalOpen} onOpenChange={setAddModalOpen} />
      <ConsultationModal
        appointment={selectedApptForConsult}
        open={consultModalOpen}
        onOpenChange={setConsultModalOpen}
      />
    </div>
  );
}

function Pager({ p }: { p: ReturnType<typeof usePagination<unknown>> }) {
  return (
    <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
      <p>Page {p.page} of {p.totalPages || 1} · {p.total} results</p>
      <div className="flex gap-1">
        <Button size="sm" variant="outline" onClick={p.prev} disabled={p.page === 1}>Prev</Button>
        <Button size="sm" variant="outline" onClick={p.next} disabled={p.page === p.totalPages || p.totalPages === 0}>Next</Button>
      </div>
    </div>
  );
}

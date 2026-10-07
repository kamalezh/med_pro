import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/app/PageHeader";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/app/StatusBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Eye, Trash2, Users } from "lucide-react";
import { usePagination } from "@/hooks/usePagination";
import { toast } from "sonner";
import { useApp } from "@/context/AppContext";
import { useStorageData, getPatients, deletePatient, getAppointments } from "@/lib/storage";
import { AddPatientModal } from "@/components/app/modals/AddPatientModal";
import { EmptyState } from "@/components/app/EmptyState";

export const Route = createFileRoute("/app/patients")({ component: PatientsPage });

function PatientsPage() {
  const { user } = useApp();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [items] = useStorageData(getPatients);
  const [appointments] = useStorageData(getAppointments);

  const isDoctor = user?.role === "doctor";
  const assignedCamp = user?.department || (typeof window !== "undefined" ? localStorage.getItem("mcm_doctor_assigned_camp") : "") || "";

  const campPatientSet = useMemo(() => {
    if (!isDoctor || !assignedCamp) return null;
    const campLow = assignedCamp.toLowerCase();
    const docNameLow = (user?.name || "").toLowerCase();

    const campAppts = appointments.filter(a => {
      const aDept = (a.department || "").toLowerCase();
      const aReason = (a.reason || "").toLowerCase();
      const aDocLow = (a.doctorName || "").toLowerCase();
      return aDept.includes(campLow) || campLow.includes(aDept) || aReason.includes(campLow) || aDocLow.includes(docNameLow) || a.doctorId === user?.id;
    });

    const set = new Set<string>();
    campAppts.forEach(a => {
      if (a.patientId) set.add(a.patientId.toLowerCase());
      if (a.patientName) set.add(a.patientName.toLowerCase());
      if (a.patientEmail) set.add(a.patientEmail.toLowerCase());
    });
    return set;
  }, [appointments, isDoctor, assignedCamp, user]);

  const filtered = useMemo(() => items.filter(p => {
    if (isDoctor && campPatientSet) {
      const pId = p.id.toLowerCase();
      const pName = p.name.toLowerCase();
      const pEmail = (p.email || "").toLowerCase();
      const pCond = (p.condition || "").toLowerCase();
      const campLow = (assignedCamp || "").toLowerCase();

      const matchesCamp = campPatientSet.has(pId) || campPatientSet.has(pName) || (pEmail && campPatientSet.has(pEmail)) || pCond.includes(campLow);
      if (!matchesCamp) return false;
    }

    return (status === "all" || p.status === status) &&
      (p.name.toLowerCase().includes(q.toLowerCase()) || p.id.toLowerCase().includes(q.toLowerCase()));
  }), [items, q, status, isDoctor, campPatientSet, assignedCamp]);

  const p = usePagination(filtered, 10);

  const handleDelete = (id: string, name: string) => {
    deletePatient(id);
    toast.success(`Patient "${name}" deleted`);
  };

  return (
    <div>
      <PageHeader
        title="Patients"
        description={isDoctor && assignedCamp ? `Patients registered & queued for ${assignedCamp}` : `${items.length} registered patients`}
        crumbs={[{ label: "Patients" }]}
        actions={
          <Button className="gradient-primary text-white" onClick={() => setAddModalOpen(true)}>
            <Plus className="mr-1 h-4 w-4" /> Add Patient
          </Button>
        }
      />
      <Card className="p-4 sm:p-6">
        <div className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:flex-wrap">
          <div className="relative min-w-0 sm:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search name or ID…" value={q} onChange={e => setQ(e.target.value)} className="pl-9" />
          </div>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
              <SelectItem value="Critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={Users}
            title={items.length === 0 ? "No patients registered yet" : "No matching patients found"}
            description={items.length === 0 ? "Click the button below to register your first patient." : "Try adjusting your search query or filter."}
            action={
              items.length === 0 ? (
                <Button className="gradient-primary text-white" onClick={() => setAddModalOpen(true)}>
                  <Plus className="mr-1 h-4 w-4" /> Add Patient
                </Button>
              ) : undefined
            }
          />
        ) : (
          <>
            <div className="overflow-x-auto rounded-xl border border-border/60">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Blood</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Last Visit</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {p.current.map(pt => (
                    <TableRow key={pt.id}>
                      <TableCell className="font-mono text-xs">{pt.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="grid h-8 w-8 place-items-center rounded-full gradient-primary text-xs font-bold text-white">
                            {pt.name.split(" ").map(n=>n[0]).slice(0,2).join("")}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{pt.name}</p>
                            <p className="text-xs text-muted-foreground">{pt.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{pt.age}</TableCell>
                      <TableCell>{pt.gender}</TableCell>
                      <TableCell>
                        <span className="rounded-md bg-destructive/10 px-2 py-0.5 text-xs font-mono text-destructive">
                          {pt.bloodGroup}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs">{pt.phone}</TableCell>
                      <TableCell className="text-xs">{pt.lastVisit}</TableCell>
                      <TableCell><StatusBadge status={pt.status} /></TableCell>
                      <TableCell className="text-right">
                        <div className="inline-flex gap-1">
                          <Link to="/app/patients/$id" params={{ id: pt.id }}>
                            <Button size="icon" variant="ghost"><Eye className="h-4 w-4" /></Button>
                          </Link>
                          <Button size="icon" variant="ghost" onClick={() => handleDelete(pt.id, pt.name)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
              <p>Page {p.page} of {p.totalPages || 1} · {p.total} results</p>
              <div className="flex gap-1">
                <Button size="sm" variant="outline" onClick={p.prev} disabled={p.page === 1}>Prev</Button>
                <Button size="sm" variant="outline" onClick={p.next} disabled={p.page === p.totalPages || p.totalPages === 0}>Next</Button>
              </div>
            </div>
          </>
        )}
      </Card>

      <AddPatientModal open={addModalOpen} onOpenChange={setAddModalOpen} />
    </div>
  );
}

import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/app/StatusBadge";
import { getCamps, getDoctors, saveCamps } from "@/lib/storage";
import { MapPin, Calendar, Users, Stethoscope, HandHeart } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/camps/$id")({
  loader: ({ params }) => {
    const camps = getCamps();
    const camp = camps.find(c => c.id === params.id);
    if (!camp) throw notFound();
    return { camp };
  },
  component: CampDetail,
  notFoundComponent: () => (
    <div className="p-12 text-center text-muted-foreground">
      <h3 className="text-lg font-semibold mb-2">Camp not found</h3>
      <p className="mb-4">The medical camp you are looking for does not exist or has been removed.</p>
      <Link to="/app/camps" className="text-primary hover:underline">Back to Medical Camps</Link>
    </div>
  ),
});

function CampDetail() {
  const { camp } = Route.useLoaderData();
  const doctors = getDoctors();
  const assignedDocs = doctors.filter(d => camp.doctorsAssigned?.includes(d.id));

  const handleRegister = () => {
    const allCamps = getCamps();
    const updated = allCamps.map(c => {
      if (c.id === camp.id) {
        return { ...c, registered: c.registered + 1 };
      }
      return c;
    });
    saveCamps(updated);
    toast.success(`Registered for ${camp.name}!`);
  };

  return (
    <div>
      <PageHeader
        title={camp.name}
        crumbs={[{ label: "Camps", to: "/app/camps" }, { label: camp.name }]}
        actions={<Button className="gradient-primary text-white" onClick={handleRegister}>Register for Camp</Button>}
      />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 overflow-hidden">
          <div className="h-48 gradient-hero" />
          <div className="p-6">
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status={camp.status} />
              <span className="flex items-center gap-1 text-sm text-muted-foreground"><Calendar className="h-4 w-4 shrink-0" />{camp.date} — {camp.endDate}</span>
              <span className="flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-4 w-4 shrink-0" />{camp.location}</span>
            </div>
            <h2 className="mt-4 text-xl font-semibold">About this camp</h2>
            <p className="mt-2 text-sm text-muted-foreground">{camp.description}</p>

            <h3 className="mt-6 font-semibold">Services offered</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {camp.services?.map((s: string) => <span key={s} className="rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground">{s}</span>)}
            </div>

            <h3 className="mt-6 font-semibold">Assigned doctors</h3>
            {assignedDocs.length === 0 ? (
              <p className="mt-2 text-xs text-muted-foreground">No doctors assigned yet.</p>
            ) : (
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {assignedDocs.map(d => (
                  <div key={d.id} className="flex items-center gap-3 rounded-xl border border-border/60 p-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full gradient-primary text-sm font-bold text-white">{d.name.replace("Dr. ","").split(" ").map(n=>n[0]).slice(0,2).join("")}</div>
                    <div className="min-w-0"><p className="truncate text-sm font-medium">{d.name}</p><p className="truncate text-xs text-muted-foreground">{d.department}</p></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="p-6">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Registration</p>
            <p className="mt-2 text-3xl font-bold">{camp.registered}<span className="text-base text-muted-foreground">/{camp.capacity || 200}</span></p>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full gradient-primary" style={{ width: `${Math.min(100, (camp.registered / (camp.capacity || 1)) * 100)}%` }} />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs">
              <div className="rounded-lg bg-muted/50 p-2"><Users className="mx-auto h-4 w-4 text-primary" /><p className="mt-1 font-bold">{camp.registered}</p><p className="text-muted-foreground">Patients</p></div>
              <div className="rounded-lg bg-muted/50 p-2"><Stethoscope className="mx-auto h-4 w-4 text-primary" /><p className="mt-1 font-bold">{camp.doctorsAssigned?.length || 0}</p><p className="text-muted-foreground">Doctors</p></div>
              <div className="rounded-lg bg-muted/50 p-2"><HandHeart className="mx-auto h-4 w-4 text-primary" /><p className="mt-1 font-bold">{camp.volunteersAssigned?.length || 0}</p><p className="text-muted-foreground">Volunteers</p></div>
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold">Need help?</h3>
            <p className="mt-1 text-xs text-muted-foreground">Call our camp coordinator for questions.</p>
            <Button variant="outline" className="mt-3 w-full">+1 (555) 010-2030</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

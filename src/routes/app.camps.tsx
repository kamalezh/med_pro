import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/app/PageHeader";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/app/StatusBadge";
import { Search, Plus, Tent, Users, MapPin, Calendar as CalendarIcon, Trash2 } from "lucide-react";
import { useStorageData, getCamps, deleteCamp } from "@/lib/storage";
import { AddCampModal } from "@/components/app/modals/AddCampModal";
import { EmptyState } from "@/components/app/EmptyState";
import { toast } from "sonner";
import { useApp } from "@/context/AppContext";

export const Route = createFileRoute("/app/camps")({ component: CampsPage });

function CampsPage() {
  const [q, setQ] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [camps] = useStorageData(getCamps);
  const { user } = useApp();

  // Protect admin only feature - in a real app would be handled at route level
  if (user?.role !== "admin" && user?.role !== "volunteer") {
    return <div>Access Denied</div>;
  }

  const list = camps.filter(c => 
    c.name.toLowerCase().includes(q.toLowerCase()) || 
    c.location.toLowerCase().includes(q.toLowerCase())
  );

  const handleDelete = (id: string, name: string) => {
    deleteCamp(id);
    toast.success(`Camp ${name} removed`);
  };

  return (
    <div>
      <PageHeader
        title="Medical Camps"
        description="Manage active and upcoming medical camps"
        crumbs={[{ label: "Camps" }]}
        actions={
          user.role === "admin" && (
            <Button className="gradient-primary text-white" onClick={() => setAddModalOpen(true)}>
              <Plus className="mr-1 h-4 w-4" /> Create Camp
            </Button>
          )
        }
      />
      
      <div className="mb-4">
        <div className="relative min-w-0 sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search camps…" className="pl-9" />
        </div>
      </div>

      {list.length === 0 ? (
        <EmptyState
          icon={Tent}
          title={camps.length === 0 ? "No camps scheduled yet" : "No matching camps found"}
          description={camps.length === 0 ? "Click the button below to schedule the first medical camp." : "Try clearing or changing your search term."}
          action={
            camps.length === 0 && user.role === "admin" ? (
              <Button className="gradient-primary text-white" onClick={() => setAddModalOpen(true)}>
                <Plus className="mr-1 h-4 w-4" /> Create Camp
              </Button>
            ) : undefined
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map(c => (
            <Card key={c.id} className="p-5 hover-lift relative group">
              <div className="flex items-start gap-3">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl gradient-primary text-lg font-bold text-white shadow-glow">
                  <Tent className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="truncate font-semibold">{c.name}</p>
                    {user.role === "admin" && (
                      <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(c.id, c.name)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>
                  <p className="truncate text-xs text-muted-foreground mt-0.5">{c.description || "Medical checkup camp"}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <StatusBadge status={c.status} />
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-center text-xs">
                <div className="rounded-lg bg-muted/40 p-2">
                  <p className="flex items-center justify-center gap-1 font-bold"><MapPin className="h-3 w-3 text-muted-foreground" /> Location</p>
                  <p className="text-muted-foreground truncate">{c.location}</p>
                </div>
                <div className="rounded-lg bg-muted/40 p-2">
                  <p className="flex items-center justify-center gap-1 font-bold"><CalendarIcon className="h-3 w-3 text-muted-foreground" /> Date</p>
                  <p className="text-muted-foreground truncate">{c.date}</p>
                </div>
              </div>
              <div className="mt-2 rounded-lg bg-muted/40 p-2 text-center text-xs">
                <p className="flex items-center justify-center gap-1 font-bold"><Users className="h-3 w-3 text-muted-foreground" /> Registered</p>
                <p className="text-muted-foreground">{c.registered} / {c.capacity}</p>
              </div>
            </Card>
          ))}
        </div>
      )}

      {user.role === "admin" && (
        <AddCampModal open={addModalOpen} onOpenChange={setAddModalOpen} />
      )}
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/PageHeader";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/app/StatusBadge";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/volunteers")({ component: VolunteersPage });

const volunteers = Array.from({ length: 14 }, (_, i) => ({
  id: `V${100 + i}`,
  name: ["Emma Wilson","Liam Turner","Ava Martinez","Noah Green","Sophia Kim","Ethan Brooks","Mia Patel","Lucas Diaz","Isabella Chen","Aiden Ross","Harper Ali","Mason Reed","Charlotte Nu","Elijah Vaz"][i],
  email: `vol${i+1}@med.com`, phone: `+1 555-33${String(10+i).padStart(2,"0")}`,
  camps: (i % 4) + 1, hours: 20 + i*3, status: (["Active","Active","On Leave","Active"] as const)[i%4],
}));

function VolunteersPage() {
  return (
    <div>
      <PageHeader title="Volunteers" description={`${volunteers.length} volunteers`} crumbs={[{ label: "Volunteers" }]}
        actions={<Button className="gradient-primary text-white" onClick={() => toast.success("Invite sent")}><Plus className="mr-1 h-4 w-4" /> Add Volunteer</Button>} />
      <Card className="p-4 sm:p-6">
        <div className="overflow-x-auto rounded-xl border border-border/60">
          <Table>
            <TableHeader><TableRow><TableHead>ID</TableHead><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Phone</TableHead><TableHead>Camps</TableHead><TableHead>Hours</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
            <TableBody>{volunteers.map(v => (
              <TableRow key={v.id}>
                <TableCell className="font-mono text-xs">{v.id}</TableCell>
                <TableCell className="font-medium">{v.name}</TableCell>
                <TableCell>{v.email}</TableCell>
                <TableCell>{v.phone}</TableCell>
                <TableCell>{v.camps}</TableCell>
                <TableCell>{v.hours}h</TableCell>
                <TableCell><StatusBadge status={v.status} /></TableCell>
              </TableRow>
            ))}</TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}

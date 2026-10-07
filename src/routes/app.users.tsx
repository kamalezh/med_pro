import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/PageHeader";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Users as UsersIcon } from "lucide-react";
import { toast } from "sonner";
import { useStorageData, getUsers, getDoctors, getPatients } from "@/lib/storage";
import { EmptyState } from "@/components/app/EmptyState";

export const Route = createFileRoute("/app/users")({ component: UsersPage });

function UsersPage() {
  const [users] = useStorageData(getUsers);
  const [doctors] = useStorageData(getDoctors);
  const [patients] = useStorageData(getPatients);

  const all = [
    ...users,
    ...doctors.map(d => ({ id: d.id, name: d.name, email: d.email, role: "doctor" as const })),
    ...patients.map(p => ({ id: p.id, name: p.name, email: p.email, role: "patient" as const })),
  ];

  return (
    <div>
      <PageHeader
        title="User Management"
        description="All system users across patient, doctor, and admin roles."
        crumbs={[{ label: "Users" }]}
        actions={
          <Button className="gradient-primary text-white" onClick={() => toast.success("Invitation feature ready")}>
            <Plus className="mr-1 h-4 w-4" /> Invite User
          </Button>
        }
      />
      <Card className="p-4 sm:p-6">
        {all.length === 0 ? (
          <EmptyState
            icon={UsersIcon}
            title="No registered users found"
            description="Users will appear here when patients, doctors or administrators register accounts."
          />
        ) : (
          <div className="overflow-x-auto rounded-xl border border-border/60">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {all.map((u, idx) => (
                  <TableRow key={u.id || idx}>
                    <TableCell className="font-mono text-xs">{u.id}</TableCell>
                    <TableCell className="font-medium">{u.name}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell><Badge variant="secondary" className="capitalize">{u.role}</Badge></TableCell>
                    <TableCell className="text-right">
                      <div className="inline-flex gap-1">
                        <Button size="icon" variant="ghost" onClick={() => toast.info(`User ${u.name}`)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>
    </div>
  );
}

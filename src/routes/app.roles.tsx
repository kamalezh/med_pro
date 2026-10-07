import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/PageHeader";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ShieldCheck, User, Stethoscope, HandHeart } from "lucide-react";

export const Route = createFileRoute("/app/roles")({ component: RolesPage });

const perms = ["View patients","Edit patients","Manage appointments","View reports","Manage camps","Manage users","Access analytics","Configure settings"];
const roles = [
  { key: "admin", label: "Administrator", icon: ShieldCheck, defaults: perms.map(() => true) },
  { key: "doctor", label: "Doctor", icon: Stethoscope, defaults: [true, true, true, true, false, false, false, false] },
  { key: "patient", label: "Patient", icon: User, defaults: [false, false, false, false, false, false, false, false] },
];

function RolesPage() {
  return (
    <div>
      <PageHeader title="Role Management" description="Configure permissions per role." crumbs={[{ label: "Roles" }]} />
      <div className="grid gap-4 lg:grid-cols-2">
        {roles.map(r => (
          <Card key={r.key} className="p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl gradient-primary text-white"><r.icon className="h-5 w-5" /></div>
              <div><p className="font-semibold">{r.label}</p><p className="text-xs text-muted-foreground">{r.defaults.filter(Boolean).length} of {perms.length} permissions</p></div>
            </div>
            <div className="space-y-2">
              {perms.map((p, i) => (
                <div key={p} className="flex items-center justify-between rounded-lg bg-muted/30 px-3 py-2 text-sm">
                  <span>{p}</span><Switch defaultChecked={r.defaults[i]} />
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

import { Link, useRouterState } from "@tanstack/react-router";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Calendar, FileText, HeartPulse, User, Users,
  Stethoscope, FlaskConical, ClipboardCheck, UserPlus, ListOrdered, QrCode,
  BarChart3, UserCog, Building2, ShieldCheck, Database, History, Activity,
  Pill, Tent,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Role } from "@/mock/data";

type Item = { to: string; label: string; icon: LucideIcon };

const nav: Record<Role, Item[]> = {
  patient: [
    { to: "/app/appointments", label: "Appointments", icon: Calendar },
    { to: "/app/medical-history", label: "Medical History", icon: HeartPulse },
    { to: "/app/prescriptions", label: "Prescriptions", icon: Pill },
    { to: "/app/lab-reports", label: "Lab Reports", icon: FlaskConical },
    { to: "/app/qr-id", label: "My QR ID", icon: QrCode },
    { to: "/app/profile", label: "Profile", icon: User },
  ],
  doctor: [
    { to: "/app/appointments", label: "Appointments", icon: Calendar },

    { to: "/app/lab-reports", label: "Lab", icon: FlaskConical },
    { to: "/app/profile", label: "Profile", icon: User },
  ],
  volunteer: [
    { to: "/app/attendance", label: "Attendance", icon: ClipboardCheck },
    { to: "/app/patient-registration", label: "Patient Registration", icon: UserPlus },
    { to: "/app/queue", label: "Queue Management", icon: ListOrdered },
    { to: "/app/camps", label: "Camps", icon: Tent },
    { to: "/app/profile", label: "Profile", icon: User },
  ],
  admin: [
    { to: "/app", label: "Dashboard", icon: LayoutDashboard },
    { to: "/app/analytics", label: "Analytics", icon: BarChart3 },
    { to: "/app/patients", label: "Patients", icon: Users },
    { to: "/app/doctors", label: "Doctors", icon: Stethoscope },
    { to: "/app/camps", label: "Camps", icon: Tent },

    { to: "/app/appointments", label: "Appointments", icon: Calendar },
    { to: "/app/reports", label: "Reports", icon: FileText },
    { to: "/app/users", label: "User Management", icon: Users },
    { to: "/app/roles", label: "Roles", icon: ShieldCheck },
    { to: "/app/settings", label: "Settings", icon: Building2 },
    { to: "/app/activity-logs", label: "Activity Logs", icon: History },

    { to: "/app/profile", label: "Profile", icon: User },
  ],
};

export function AppSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { user } = useApp();
  const pathname = useRouterState({ select: s => s.location.pathname });
  if (!user) return null;
  const items = nav[user.role];

  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-foreground/30 backdrop-blur-sm lg:hidden" onClick={onClose} />}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-sidebar-border bg-sidebar/95 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 shrink-0 items-center gap-3 border-b border-sidebar-border px-6">
          <div className="grid h-9 w-9 place-items-center rounded-xl gradient-primary shadow-glow">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold gradient-text">MediCamp</p>
            <p className="truncate text-[10px] uppercase tracking-widest text-muted-foreground">Care Platform</p>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto p-3">
          <ul className="space-y-1">
            {items.map(item => {
              const active = pathname === item.to || (item.to !== "/app" && pathname.startsWith(item.to));
              const Icon = item.icon;
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={onClose}
                    className={cn(
                      "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                      active
                        ? "bg-primary text-primary-foreground shadow-soft"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    )}
                  >
                    <Icon className={cn("h-4 w-4 shrink-0", active ? "" : "text-muted-foreground group-hover:text-foreground")} />
                    <span className="truncate">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="border-t border-sidebar-border p-4">
          <div className="glass flex items-center gap-3 rounded-xl p-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full gradient-primary text-sm font-semibold text-white">
              {user.name.split(" ").map(n => n[0]).slice(0,2).join("")}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{user.name}</p>
              <p className="truncate text-xs capitalize text-muted-foreground">{user.role}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

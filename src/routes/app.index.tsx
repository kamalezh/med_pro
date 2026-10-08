import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { PageHeader } from "@/components/app/PageHeader";
import { StatCard } from "@/components/app/StatCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users, Calendar, HeartPulse, Stethoscope, ClipboardCheck, ListOrdered,
  UserPlus, FileText, TrendingUp, Activity, Pill, Plus, Tent,
} from "lucide-react";
  useStorageData, getPatients, getDoctors, getAppointments, getPrescriptions, getLabReports, useFirebaseCamps,
} from "@/lib/storage";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { StatusBadge } from "@/components/app/StatusBadge";

export const Route = createFileRoute("/app/")({
  component: Dashboard,
});

function Dashboard() {
  const { user } = useApp();
  const nav = useNavigate();

  useEffect(() => {
    if (user?.role === "patient" || user?.role === "doctor") {
      nav({ to: "/app/appointments", replace: true });
    }
  }, [user, nav]);

  const [patients] = useStorageData(getPatients);
  const [doctors] = useStorageData(getDoctors);
  const [appointments] = useStorageData(getAppointments);
  const [prescriptions] = useStorageData(getPrescriptions);
  const [labReports] = useStorageData(getLabReports);
  const [camps] = useFirebaseCamps();
  const activeCamps = camps.filter(c => c.status === "Ongoing" || c.status === "Upcoming");

  if (!user) return null;
  const role = user.role;

  const upcoming = appointments.filter(a => a.status === "Approved" || a.status === "Pending").slice(0, 5);

  // Dynamic distribution by department
  const deptCounts: Record<string, number> = {};
  doctors.concat(patients.map(p => ({ department: p.condition || "General" } as any))).forEach(item => {
    const d = item.department || "General";
    deptCounts[d] = (deptCounts[d] || 0) + 1;
  });

  const chartByDept = Object.entries(deptCounts).map(([name, value]) => ({ name, value }));
  if (chartByDept.length === 0) {
    chartByDept.push({ name: "General Medicine", value: 1 });
  }

  // Monthly trend chart dynamic mock or empty
  const monthlyTrend = [
    { month: "Jan", appointments: appointments.length, completed: appointments.filter(a => a.status === "Completed").length },
    { month: "Current", appointments: appointments.length, completed: appointments.filter(a => a.status === "Completed").length },
  ];

  const greeting = `Welcome back, ${user.name.split(" ")[0]} 👋`;
  const desc = ({
    patient: "Here's your health snapshot.",
    doctor: "Your consultations, queue and patient records at a glance.",
    volunteer: "Your tasks and assigned camps for today.",
    admin: "Hospital-wide performance and operations.",
  } as const)[role];

  return (
    <div className="space-y-6">
      <PageHeader title={greeting} description={desc} />

      {/* Role-based stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {role === "patient" && (<>
          <StatCard label="Upcoming Appointments" value={upcoming.length} icon={Calendar} tone="primary" />
          <StatCard label="Active Prescriptions" value={prescriptions.length} icon={Pill} tone="success" />
          <StatCard label="Pending Reports" value={labReports.filter(l => l.status !== "Completed").length} icon={FileText} tone="warning" />
          <StatCard label="Lab Reports" value={labReports.length} icon={FileText} tone="primary" />
        </>)}
        {role === "doctor" && (<>
          <StatCard label="Total Appointments" value={appointments.length} icon={Calendar} tone="primary" />
          <StatCard label="Patients in Queue" value={appointments.filter(a => a.status === "Pending").length} icon={ListOrdered} tone="warning" />
          <StatCard label="Registered Patients" value={patients.length} icon={Users} tone="primary" />
          <StatCard label="Staff Doctors" value={doctors.length} icon={Stethoscope} tone="success" />
        </>)}
        {role === "volunteer" && (<>
          <StatCard label="Active Camps" value={activeCamps.length} icon={Tent} tone="primary" />
          <StatCard label="Pending Appointments" value={appointments.filter(a => a.status === "Pending").length} icon={ClipboardCheck} tone="warning" />
          <StatCard label="Patients Registered" value={patients.length} icon={UserPlus} tone="success" />
          <StatCard label="Attendance Rate" value="100%" icon={TrendingUp} tone="success" />
        </>)}
        {role === "admin" && (<>
          <StatCard label="Total Patients" value={patients.length} icon={Users} tone="primary" />
          <StatCard label="Active Doctors" value={doctors.length} icon={Stethoscope} tone="success" />
          <StatCard label="Prescriptions" value={prescriptions.length} icon={Pill} tone="warning" />
          <StatCard label="Total Appointments" value={appointments.length} icon={TrendingUp} tone="success" />
        </>)}
      </div>

      {/* Charts + Activity */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 p-6 hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Appointments Overview</h3>
              <p className="text-xs text-muted-foreground">Bookings & Completion rate</p>
            </div>
            <Activity className="h-5 w-5 text-primary" />
          </div>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrend}>
                <defs>
                  <linearGradient id="c1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="c2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--secondary)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--secondary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Area type="monotone" dataKey="appointments" stroke="var(--primary)" fill="url(#c1)" strokeWidth={2} />
                <Area type="monotone" dataKey="completed" stroke="var(--secondary)" fill="url(#c2)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 hover-lift">
          <h3 className="text-lg font-semibold">By department</h3>
          <p className="text-xs text-muted-foreground">Department breakdown</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={chartByDept} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={2}>
                  {chartByDept.map((_, i) => (
                    <Cell key={i} fill={["var(--chart-1)","var(--chart-2)","var(--chart-3)","var(--chart-4)","var(--chart-5)","var(--primary-glow)"][i % 6]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Upcoming / camps */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-6 hover-lift">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Upcoming appointments</h3>
            <Link to="/app/appointments"><Button size="sm" variant="ghost">View all</Button></Link>
          </div>
          {upcoming.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              <p>No upcoming appointments found.</p>
              <Link to="/app/appointments" className="mt-2 inline-block">
                <Button size="sm" variant="outline" className="mt-2">
                  <Plus className="mr-1 h-3.5 w-3.5" /> Book Appointment
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {upcoming.map(a => (
                <div key={a.id} className="flex items-center gap-3 rounded-xl border border-border/50 p-3 hover:bg-muted/30">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <HeartPulse className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{a.patientName}</p>
                    <p className="truncate text-xs text-muted-foreground">{a.doctorName} · {a.department}</p>
                  </div>
                  <div className="text-right text-xs">
                    <p className="font-medium">{a.date}</p>
                    <p className="text-muted-foreground">{a.time}</p>
                  </div>
                  <StatusBadge status={a.status} />
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-6 hover-lift">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Recent prescriptions</h3>
            <Link to="/app/prescriptions"><Button size="sm" variant="ghost">View all</Button></Link>
          </div>
          {prescriptions.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              <p>No prescriptions recorded yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {prescriptions.slice(0, 4).map(rx => (
                <div key={rx.id} className="flex items-center gap-3 rounded-xl border border-border/50 p-3 hover:bg-muted/30">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Pill className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{rx.patientName || rx.patientId}</p>
                    <p className="truncate text-xs text-muted-foreground">{rx.diagnosis} · {rx.doctorName}</p>
                  </div>
                  <div className="text-right text-xs">
                    <p className="font-medium">{rx.date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

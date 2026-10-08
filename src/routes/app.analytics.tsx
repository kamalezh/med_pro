import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/PageHeader";
import { Card } from "@/components/ui/card";
import { StatCard } from "@/components/app/StatCard";
import { ResponsiveContainer, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { Users, TrendingUp, Tent, Stethoscope } from "lucide-react";
import { useStorageData, getPatients, getAppointments, getDoctors, useFirebaseCamps } from "@/lib/storage";

export const Route = createFileRoute("/app/analytics")({ component: Analytics });

function Analytics() {
  const [patients] = useStorageData(getPatients);
  const [appointments] = useStorageData(getAppointments);
  const [camps] = useFirebaseCamps();
  const [doctors] = useStorageData(getDoctors);

  // Dynamic distribution by department
  const deptCounts: Record<string, number> = {};
  doctors.concat(patients.map(p => ({ department: p.condition || "General" } as any))).forEach(item => {
    const d = item.department || "General";
    deptCounts[d] = (deptCounts[d] || 0) + 1;
  });

  const chartByDept = Object.entries(deptCounts).map(([name, value]) => ({ name, value }));
  if (chartByDept.length === 0) {
    chartByDept.push({ name: "General", value: 0 });
  }

  // Dynamic camp participation
  const campData = camps.map(c => ({
    camp: c.name.split(" ")[0] || "Camp",
    registered: c.registered,
    capacity: c.capacity,
  }));
  if (campData.length === 0) {
    campData.push({ camp: "No Camps", registered: 0, capacity: 0 });
  }

  const appointmentTrend = [
    { month: "Total", appointments: appointments.length, completed: appointments.filter(a => a.status === "Completed").length }
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Analytics" description="Real-time performance metrics and distribution." crumbs={[{ label: "Analytics" }]} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Patients" value={patients.length} icon={Users} tone="primary" />
        <StatCard label="Total Appointments" value={appointments.length} icon={TrendingUp} tone="success" />
        <StatCard label="Active Camps" value={camps.length} icon={Tent} tone="warning" />
        <StatCard label="Staff Doctors" value={doctors.length} icon={Stethoscope} tone="success" />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="mb-4 font-semibold">Appointments Overview</h3>
          <div className="h-72">
            <ResponsiveContainer>
              <AreaChart data={appointmentTrend}>
                <defs>
                  <linearGradient id="a1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.4}/>
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Area dataKey="appointments" stroke="var(--primary)" fill="url(#a1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="mb-4 font-semibold">Camp Registration vs Capacity</h3>
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={campData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="camp" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Legend />
                <Bar dataKey="registered" fill="var(--primary)" radius={[8,8,0,0]} />
                <Bar dataKey="capacity" fill="var(--secondary)" radius={[8,8,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-6 sm:col-span-2">
          <h3 className="mb-4 font-semibold">Patients by Department / Condition</h3>
          <div className="h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={chartByDept} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90} paddingAngle={3}>
                  {chartByDept.map((_, i) => (
                    <Cell key={i} fill={["var(--chart-1)","var(--chart-2)","var(--chart-3)","var(--chart-4)","var(--chart-5)","var(--primary-glow)"][i % 6]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}

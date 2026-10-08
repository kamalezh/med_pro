import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { toast } from "sonner";
import { useStorageData, getAppointments, addAppointment, getDoctors, addDoctor, useFirebaseCamps, updateCamp } from "@/lib/storage";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Role } from "@/mock/data";
import { User, Stethoscope, ShieldCheck, ArrowLeft, Activity, Eye, EyeOff, Tent } from "lucide-react";
import { cn } from "@/lib/utils";
import { loginUserWithRole, UserRole } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — MediCamp" }, { name: "description", content: "Sign in as patient, doctor, volunteer or administrator." }] }),
  component: LoginPage,
});

const roles: { key: Role; label: string; desc: string; icon: typeof User }[] = [
  { key: "patient", label: "Patient", desc: "Select camp, view appointments & get auto queue token.", icon: User },
  { key: "doctor", label: "Doctor", desc: "Manage consultations and direct patient care.", icon: Stethoscope },
  { key: "admin", label: "Administrator", desc: "Oversee the hospital, staff, camps and reports.", icon: ShieldCheck },
];

type FormValues = { email: string; password: string; remember: boolean };

function LoginPage() {
  const [role, setRole] = useState<Role | null>(null);
  const [showPass, setShowPass] = useState(false);
  const [campsList] = useFirebaseCamps();
  const [selectedCamp, setSelectedCamp] = useState<string>("");
  const { login } = useApp();
  const nav = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    defaultValues: { email: "", password: "", remember: true },
  });

  const onSubmit = async (data: FormValues) => {
    if (!role) return;

    try {
      // 1. Firebase Authentication & Firestore details fetch
      const { userData } = await loginUserWithRole(
        data.email,
        data.password,
        role as UserRole
      );

      const dynamicName = userData.name || roles.find(r => r.key === role)?.label || "User";

      // 2. Pass dynamic data to AppContext login method
      const u = login(role, data.email, dynamicName as any);

      // If patient, auto queue up based on token for selected camp
      if (role === "patient") {
        const campName = selectedCamp || (campsList[0]?.name) || "General Medical Camp";
        const existingAppts = getAppointments();
        const campAppts = existingAppts.filter(a => a.department === campName || a.reason?.includes(campName));
        const nextToken = campAppts.length + 1;

        addAppointment({
          patientId: u.id,
          patientName: dynamicName,
          patientEmail: data.email,
          doctorId: "D100",
          doctorName: "Duty Specialist — " + campName,
          department: campName,
          date: new Date().toISOString().split("T")[0],
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: "Approved",
          type: "Consultation",
          token: nextToken,
          reason: `Auto Token Queue for ${campName}`,
        });

        // Register in camp count
        const currentCamp = campsList.find(c => c.name === campName);
        if (currentCamp) {
          updateCamp(currentCamp.id, { registered: currentCamp.registered + 1 });
        }

        toast.success(`Welcome ${dynamicName}! Auto-queued for ${campName} with Token #${nextToken}`);
        nav({ to: "/app/appointments" });
      } else if (role === "doctor") {
        const campName = selectedCamp || (campsList[0]?.name) || "General Medical Camp";
        const docName = dynamicName.startsWith("Dr.") ? dynamicName : `Dr. ${dynamicName}`;

        const u = login(role, data.email, docName);
        u.department = campName;
        try {
          localStorage.setItem("mcm_user", JSON.stringify(u));
          localStorage.setItem("mcm_doctor_assigned_camp", campName);
        } catch {}

        // Assign doctor to camp
        const currentCamp = campsList.find(c => c.name === campName);
        if (currentCamp && !currentCamp.doctorsAssigned.includes(docName)) {
          updateCamp(currentCamp.id, { doctorsAssigned: [...currentCamp.doctorsAssigned, docName] });
        }

        // Ensure doctor is registered in local doctors list
        const existingDocs = getDoctors();
        if (!existingDocs.some(d => d.email === data.email || d.name === docName)) {
          addDoctor({
            name: docName,
            department: campName,
            specialization: "Specialist Physician",
            experience: 8,
            rating: 5.0,
            patients: 12,
            availability: "Available",
            email: data.email,
            phone: "+1 555-0199",
          });
        }

        toast.success(`Welcome ${docName}! Assigned to ${campName} for consultation duty.`);
        nav({ to: "/app/appointments" });
      } else {
        toast.success(`Welcome back, ${dynamicName}!`);
        nav({ to: "/app" });
      }

    } catch (error: any) {
      let errorMessage = "Invalid email or password.";
      if (error.code === "auth/invalid-credential" || error.code === "auth/user-not-found") {
        errorMessage = "No account found with these credentials.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password. Please try again.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    }
  };

  return (
    <div className="grid min-h-screen mesh-bg lg:grid-cols-2">
      {/* LEFT — Brand panel */}
      <div className="relative hidden overflow-hidden gradient-hero p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <Link to="/" className="flex items-center gap-2 text-white">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/20 backdrop-blur"><Activity className="h-5 w-5" /></div>
          <span className="text-lg font-bold">MediCamp</span>
        </Link>
        <div>
          <h1 className="text-5xl font-extrabold leading-tight">Care that scales.</h1>
          <p className="mt-4 max-w-md text-lg text-white/85">One platform for camps, appointments, consultations and hospital operations.</p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[{v:"120K+",l:"Patients"},{v:"850+",l:"Doctors"},{v:"320",l:"Camps"}].map(s => (
              <div key={s.l} className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                <p className="text-2xl font-bold">{s.v}</p>
                <p className="text-xs opacity-90">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-white/70">© 2026 MediCamp Health Systems</p>
        <div className="pointer-events-none absolute -right-16 -top-16 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-secondary/40 blur-3xl" />
      </div>

      {/* RIGHT — Form */}
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground lg:hidden">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>

          {!role ? (
            <div className="animate-fade-in-up">
              <h2 className="text-3xl font-bold tracking-tight">Choose your role</h2>
              <p className="mt-2 text-sm text-muted-foreground">Pick how you're using MediCamp today.</p>
              <div className="mt-8 grid gap-3">
                {roles.map(r => {
                  const Icon = r.icon;
                  return (
                    <button
                      key={r.key}
                      onClick={() => setRole(r.key)}
                      className="glass group flex items-center gap-4 rounded-2xl p-4 text-left transition-all hover:shadow-glow hover:border-primary/40"
                    >
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl gradient-primary text-white shadow-soft">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold">{r.label}</p>
                        <p className="truncate text-xs text-muted-foreground">{r.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="animate-fade-in-up">
              <button onClick={() => setRole(null)} className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" /> Change role
              </button>
              <div className="mb-6 flex items-center gap-3">
                {(() => { const r = roles.find(x => x.key === role)!; const Icon = r.icon; return (
                  <>
                    <div className={cn("grid h-11 w-11 place-items-center rounded-xl gradient-primary text-white shadow-soft")}><Icon className="h-5 w-5" /></div>
                    <div><p className="text-xs text-muted-foreground">Signing in as</p><p className="font-semibold">{r.label}</p></div>
                  </>
                );})()}
              </div>
              <Card className="glass p-6 shadow-card">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {(role === "patient" || role === "doctor") && (
                    <div className="rounded-xl border border-primary/30 bg-primary/5 p-3 space-y-1.5">
                      <Label htmlFor="camp-select" className="font-semibold text-xs text-primary flex items-center gap-1.5">
                        <Tent className="h-4 w-4" /> {role === "patient" ? "Select Medical Camp (Auto-Queue)" : "Select Assigned Medical Camp"}
                      </Label>
                      <Select value={selectedCamp} onValueChange={setSelectedCamp}>
                        <SelectTrigger id="camp-select" className="h-9 bg-background text-sm">
                          <SelectValue placeholder="Choose active camp..." />
                        </SelectTrigger>
                        <SelectContent>
                          {campsList.length > 0 ? (
                            campsList.map((c) => (
                              <SelectItem key={c.id} value={c.name}>
                                {c.name} ({c.location})
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="General Community Camp">General Community Medical Camp</SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      <p className="text-[11px] text-muted-foreground">
                        {role === "patient"
                          ? "Signing in automatically registers you & assigns your queue token."
                          : "Assigns you as the on-duty consultation doctor for this camp."}
                      </p>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@example.com" {...register("email", { required: "Email is required" })} />
                    {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input id="password" type={showPass ? "text" : "password"} placeholder="••••••••" {...register("password", { required: "Password is required", minLength: { value: 4, message: "Too short" } })} />
                      <button type="button" onClick={() => setShowPass(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {errors.password && <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>}
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm">
                      <Checkbox {...register("remember")} defaultChecked /> Remember me
                    </label>
                    <button type="button" className="text-sm text-primary hover:underline" onClick={() => toast.info("Reset link sent to your email")}>
                      Forgot password?
                    </button>
                  </div>
                  <Button type="submit" disabled={isSubmitting} className="w-full gradient-primary text-white shadow-soft">
                    {isSubmitting ? "Signing in…" : "Sign in"}
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    Secured with Firebase Authentication.
                  </p>
                  <p className="text-center text-sm text-muted-foreground">
                    New user?{" "}
                    <Link to="/register" className="text-primary hover:underline">Register here</Link>
                  </p>
                </form>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
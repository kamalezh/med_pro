import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, ArrowLeft, User, Stethoscope, HandHeart, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/register/")({
  head: () => ({
    meta: [
      { title: "Create account — MediCamp" },
      { name: "description", content: "Register as a patient, doctor, volunteer or administrator on MediCamp." },
      { property: "og:title", content: "Create account — MediCamp" },
      { property: "og:description", content: "Register as a patient, doctor, volunteer or administrator on MediCamp." },
    ],
  }),
  component: RegisterRolePage,
});

const roles = [
  { key: "patient",   label: "Patient",       desc: "Book appointments, view reports and register for camps.", icon: User,         to: "/register/patient" as const },
  { key: "doctor",    label: "Doctor",        desc: "Manage consultations, queues and camp schedules.",        icon: Stethoscope,  to: "/register/doctor" as const },
  { key: "admin",     label: "Administrator", desc: "Oversee the hospital, staff, camps and reports.",         icon: ShieldCheck,  to: "/register/admin" as const },
];

function RegisterRolePage() {
  return (
    <div className="grid min-h-screen mesh-bg lg:grid-cols-2">
      {/* LEFT — Brand panel */}
      <div className="relative hidden overflow-hidden gradient-hero p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <Link to="/" className="flex items-center gap-2 text-white">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/20 backdrop-blur"><Activity className="h-5 w-5" /></div>
          <span className="text-lg font-bold">MediCamp</span>
        </Link>
        <div>
          <h1 className="text-5xl font-extrabold leading-tight">Join MediCamp.</h1>
          <p className="mt-4 max-w-md text-lg text-white/85">Create your account to access camps, appointments and enterprise healthcare tools.</p>
        </div>
        <p className="text-xs text-white/70">© 2026 MediCamp Health Systems</p>
        <div className="pointer-events-none absolute -right-16 -top-16 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-secondary/40 blur-3xl" />
      </div>

      {/* RIGHT — Role picker */}
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md animate-fade-in-up">
          <Link to="/" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground lg:hidden">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
          <h2 className="text-3xl font-bold tracking-tight">Choose your role</h2>
          <p className="mt-2 text-sm text-muted-foreground">Pick the account type you want to create.</p>
          <div className="mt-8 grid gap-3">
            {roles.map(r => {
              const Icon = r.icon;
              return (
                <Link
                  key={r.key}
                  to={r.to}
                  className="glass group flex items-center gap-4 rounded-2xl p-4 text-left transition-all hover:shadow-glow hover:border-primary/40"
                >
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl gradient-primary text-white shadow-soft">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{r.label}</p>
                    <p className="truncate text-xs text-muted-foreground">{r.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

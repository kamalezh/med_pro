import { Link } from "@tanstack/react-router";
import { Activity, ArrowLeft } from "lucide-react";
import type { ReactNode, ComponentType } from "react";

export function RegisterShell({
  title,
  subtitle,
  icon: Icon,
  children,
}: {
  title: string;
  subtitle: string;
  icon: ComponentType<{ className?: string }>;
  children: ReactNode;
}) {
  return (
    <div className="grid min-h-screen mesh-bg lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      <div className="relative hidden overflow-hidden gradient-hero p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <Link to="/" className="flex items-center gap-2 text-white">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/20 backdrop-blur"><Activity className="h-5 w-5" /></div>
          <span className="text-lg font-bold">MediCamp</span>
        </Link>
        <div>
          <h1 className="text-5xl font-extrabold leading-tight">Create your account.</h1>
          <p className="mt-4 max-w-md text-lg text-white/85">Join thousands of healthcare professionals and patients using MediCamp every day.</p>
        </div>
        <p className="text-xs text-white/70">© 2026 MediCamp Health Systems</p>
        <div className="pointer-events-none absolute -right-16 -top-16 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-secondary/40 blur-3xl" />
      </div>

      <div className="flex items-start justify-center p-6 sm:p-10">
        <div className="w-full max-w-2xl animate-fade-in-up">
          <Link to="/register" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Change role
          </Link>
          <div className="mb-6 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl gradient-primary text-white shadow-soft">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Registering as</p>
              <p className="font-semibold">{title}</p>
            </div>
          </div>
          <p className="mb-6 text-sm text-muted-foreground">{subtitle}</p>
          {children}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export const validators = {
  email: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Enter a valid email",
  phone: (v: string) => /^[+\d][\d\s\-()]{6,}$/.test(v) || "Enter a valid phone number",
  strongPassword: (v: string) =>
    (v.length >= 8 && /[A-Z]/.test(v) && /[a-z]/.test(v) && /\d/.test(v)) ||
    "Min 8 chars with upper, lower and a number",
};

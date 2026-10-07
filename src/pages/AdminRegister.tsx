import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { RegisterShell, validators } from "@/components/app/RegisterShell";
import { registerUserWithRole } from "@/lib/auth"; // Firebase Auth helper

type Values = {
  fullName: string; 
  email: string; 
  adminId: string;
  password: string; 
  confirm: string;
};

export default function AdminRegister() {
  const nav = useNavigate();
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<Values>();
  const password = watch("password");

  const submit = async (v: Values) => {
    try {
      // Firebase registration call for Admin
      await registerUserWithRole({
        email: v.email,
        password: v.password,
        name: v.fullName,
        role: "admin", // Set role to admin
        extraData: {
          adminId: v.adminId,
        },
      });

      toast.success(`Administrator account created for ${v.fullName}`);
      nav({ to: "/login" });
    } catch (error: any) {
      let errorMessage = "Failed to create account. Please try again.";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already registered.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    }
  };

  return (
    <RegisterShell title="Administrator" subtitle="Create an administrator account to manage MediCamp operations." icon={ShieldCheck}>
      <Card className="glass p-6 shadow-card">
        <form onSubmit={handleSubmit(submit)} className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label>Full name</Label>
            <Input {...register("fullName", { required: "Required" })} />
            {errors.fullName && <p className="mt-1 text-xs text-destructive">{errors.fullName.message}</p>}
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" {...register("email", { required: "Required", validate: validators.email })} />
            {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message as string}</p>}
          </div>
          <div>
            <Label>Employee / Admin ID</Label>
            <Input {...register("adminId", { required: "Required" })} />
            {errors.adminId && <p className="mt-1 text-xs text-destructive">{errors.adminId.message}</p>}
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" {...register("password", { required: "Required", validate: validators.strongPassword })} />
            {errors.password && <p className="mt-1 text-xs text-destructive">{errors.password.message as string}</p>}
          </div>
          <div>
            <Label>Confirm password</Label>
            <Input type="password" {...register("confirm", { required: "Required", validate: v => v === password || "Passwords do not match" })} />
            {errors.confirm && <p className="mt-1 text-xs text-destructive">{errors.confirm.message as string}</p>}
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" disabled={isSubmitting} className="w-full gradient-primary text-white shadow-soft">
              {isSubmitting ? "Creating account…" : "Create account"}
            </Button>
          </div>
        </form>
      </Card>
    </RegisterShell>
  );
}
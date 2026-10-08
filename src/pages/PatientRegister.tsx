import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { User } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RegisterShell, validators } from "@/components/app/RegisterShell";
import { registerUserWithRole } from "@/lib/auth";
import { addPatient, useStorageData, getCamps } from "@/lib/storage";

type Values = { fullName: string; email: string; phone: string; password: string; confirm: string; camp: string };

export default function PatientRegister() {
  const nav = useNavigate();
  const [camps] = useStorageData(getCamps);
  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<Values>();
  const password = watch("password");

  const submit = async (v: Values) => {
    try {
      await registerUserWithRole({
        email: v.email,
        password: v.password,
        name: v.fullName,
        role: "patient",
        extraData: {
          phone: v.phone,
        },
      });

      // Save to local patients list
      addPatient({
        name: v.fullName,
        email: v.email,
        phone: v.phone,
        age: 30,
        gender: "Other",
        bloodGroup: "O+",
        address: "Registered Online",
        lastVisit: new Date().toISOString().split("T")[0],
        status: "Active",
        condition: "General Checkup",
      });

      toast.success(`Account created successfully for ${v.fullName}!`);
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
    <RegisterShell title="Patient" subtitle="Fill in your details & pick a camp to get your live queue token." icon={User}>
      <Card className="glass p-6 shadow-card">
        <form onSubmit={handleSubmit(submit)} className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label>Full name</Label>
            <Input {...register("fullName", { required: "Required" })} />
            {errors.fullName && <p className="mt-1 text-xs text-destructive">{errors.fullName.message}</p>}
          </div>

          {/* Form fields */}

          <div><Label>Email</Label><Input type="email" {...register("email", { required: "Required", validate: validators.email })} />{errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message as string}</p>}</div>
          <div><Label>Phone number</Label><Input {...register("phone", { required: "Required", validate: validators.phone })} />{errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone.message as string}</p>}</div>
          <div>
            <Label>Medical Camp (Optional)</Label>
            <Select value={watch("camp")} onValueChange={v => setValue("camp", v)}>
              <SelectTrigger>
                <SelectValue placeholder={camps.length === 0 ? "No active camps" : "Choose a camp (Optional)"} />
              </SelectTrigger>
              <SelectContent>
                {camps.map(c => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div><Label>Password</Label><Input type="password" {...register("password", { required: "Required", validate: validators.strongPassword })} />{errors.password && <p className="mt-1 text-xs text-destructive">{errors.password.message as string}</p>}</div>
          <div><Label>Confirm password</Label><Input type="password" {...register("confirm", { required: "Required", validate: v => v === password || "Passwords do not match" })} />{errors.confirm && <p className="mt-1 text-xs text-destructive">{errors.confirm.message as string}</p>}</div>
          <div className="sm:col-span-2">
            <Button type="submit" disabled={isSubmitting} className="w-full gradient-primary text-white shadow-soft">
              {isSubmitting ? "Creating account & queueing…" : "Register & Get Token"}
            </Button>
          </div>
        </form>
      </Card>
    </RegisterShell>
  );
}
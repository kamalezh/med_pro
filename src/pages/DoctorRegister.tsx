import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { Stethoscope, Tent } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RegisterShell, validators } from "@/components/app/RegisterShell";
import { registerUserWithRole } from "@/lib/auth";
import { useFirebaseCamps, addDoctor } from "@/lib/storage";

type Values = {
  fullName: string; 
  email: string; 
  phone: string;
  regNumber: string; 
  specialization: string; 
  hospital: string;
  password: string; 
  confirm: string;
};

export default function DoctorRegister() {
  const nav = useNavigate();
  const [campsList] = useFirebaseCamps();
  const [selectedCamp, setSelectedCamp] = useState<string>("");
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<Values>();
  const password = watch("password");

  const submit = async (v: Values) => {
    try {
      await registerUserWithRole({
        email: v.email,
        password: v.password,
        name: v.fullName,
        role: "doctor",
        extraData: {
          phone: v.phone,
          regNumber: v.regNumber,
          specialization: v.specialization,
          hospital: v.hospital,
        },
      });

      const campName = selectedCamp || (campsList[0]?.name) || "General Medical Camp";
      const docName = v.fullName.startsWith("Dr.") ? v.fullName : `Dr. ${v.fullName}`;

      addDoctor({
        name: docName,
        department: v.specialization || campName,
        specialization: v.specialization || "General Medicine",
        experience: 5,
        rating: 5.0,
        patients: 0,
        availability: "Available",
        email: v.email,
        phone: v.phone,
      });

      toast.success(`Doctor account created for ${docName}! Assigned to ${campName}`);
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
    <RegisterShell title="Doctor" subtitle="Provide your professional details to create a doctor account." icon={Stethoscope}>
      <Card className="glass p-6 shadow-card">
        <form onSubmit={handleSubmit(submit)} className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label>Full name</Label>
            <Input {...register("fullName", { required: "Required" })} />
            {errors.fullName && <p className="mt-1 text-xs text-destructive">{errors.fullName.message}</p>}
          </div>

          <div className="sm:col-span-2 rounded-xl border border-primary/30 bg-primary/5 p-3 space-y-1.5">
            <Label htmlFor="doc-camp-select" className="font-semibold text-xs text-primary flex items-center gap-1.5">
              <Tent className="h-4 w-4" /> Select Assigned Medical Camp
            </Label>
            <Select value={selectedCamp} onValueChange={setSelectedCamp}>
              <SelectTrigger id="doc-camp-select" className="h-9 bg-background text-sm">
                <SelectValue placeholder="Choose camp for consultation duty..." />
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
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" {...register("email", { required: "Required", validate: validators.email })} />
            {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message as string}</p>}
          </div>
          <div>
            <Label>Phone number</Label>
            <Input {...register("phone", { required: "Required", validate: validators.phone })} />
            {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone.message as string}</p>}
          </div>
          <div>
            <Label>Medical registration number</Label>
            <Input {...register("regNumber", { required: "Required" })} />
            {errors.regNumber && <p className="mt-1 text-xs text-destructive">{errors.regNumber.message}</p>}
          </div>
          <div>
            <Label>Specialization</Label>
            <Input {...register("specialization", { required: "Required" })} />
            {errors.specialization && <p className="mt-1 text-xs text-destructive">{errors.specialization.message}</p>}
          </div>
          <div className="sm:col-span-2">
            <Label>Hospital / Clinic name</Label>
            <Input {...register("hospital", { required: "Required" })} />
            {errors.hospital && <p className="mt-1 text-xs text-destructive">{errors.hospital.message}</p>}
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
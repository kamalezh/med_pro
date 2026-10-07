import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { HandHeart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RegisterShell, validators } from "@/components/app/RegisterShell";
import { registerUserWithRole } from "@/lib/auth"; // Firebase Auth helper

type Values = {
  fullName: string; email: string; phone: string;
  age: string; address: string; skills: string; availability: string;
  password: string; confirm: string;
};

export default function VolunteerRegister() {
  const nav = useNavigate();
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<Values>();
  const password = watch("password");

  const submit = async (v: Values) => {
    try {
      // Firebase registration call
      await registerUserWithRole({
        email: v.email,
        password: v.password,
        name: v.fullName,
        role: "volunteer", // Set role to volunteer
        extraData: {
          phone: v.phone,
          age: Number(v.age),
          address: v.address,
          skills: v.skills,
          availability: v.availability,
        },
      });

      toast.success(`Volunteer account created for ${v.fullName}`);
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
    <RegisterShell title="Volunteer" subtitle="Tell us a bit about yourself to help at MediCamp events." icon={HandHeart}>
      <Card className="glass p-6 shadow-card">
        <form onSubmit={handleSubmit(submit)} className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2"><Label>Full name</Label><Input {...register("fullName", { required: "Required" })} />{errors.fullName && <p className="mt-1 text-xs text-destructive">{errors.fullName.message}</p>}</div>
          <div><Label>Email</Label><Input type="email" {...register("email", { required: "Required", validate: validators.email })} />{errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message as string}</p>}</div>
          <div><Label>Phone number</Label><Input {...register("phone", { required: "Required", validate: validators.phone })} />{errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone.message as string}</p>}</div>
          <div><Label>Age</Label><Input type="number" min={16} {...register("age", { required: "Required", min: { value: 16, message: "Must be 16+" } })} />{errors.age && <p className="mt-1 text-xs text-destructive">{errors.age.message as string}</p>}</div>
          <div><Label>Availability</Label><Input placeholder="Weekends, evenings…" {...register("availability", { required: "Required" })} />{errors.availability && <p className="mt-1 text-xs text-destructive">{errors.availability.message}</p>}</div>
          <div className="sm:col-span-2"><Label>Address</Label><Input {...register("address", { required: "Required" })} />{errors.address && <p className="mt-1 text-xs text-destructive">{errors.address.message}</p>}</div>
          <div className="sm:col-span-2"><Label>Skills</Label><Textarea rows={3} placeholder="First aid, translation, logistics…" {...register("skills", { required: "Required" })} />{errors.skills && <p className="mt-1 text-xs text-destructive">{errors.skills.message}</p>}</div>
          <div><Label>Password</Label><Input type="password" {...register("password", { required: "Required", validate: validators.strongPassword })} />{errors.password && <p className="mt-1 text-xs text-destructive">{errors.password.message as string}</p>}</div>
          <div><Label>Confirm password</Label><Input type="password" {...register("confirm", { required: "Required", validate: v => v === password || "Passwords do not match" })} />{errors.confirm && <p className="mt-1 text-xs text-destructive">{errors.confirm.message as string}</p>}</div>
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
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { PageHeader } from "@/components/app/PageHeader";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { QrCode } from "lucide-react";
import { useStorageData, getCamps, addPatient } from "@/lib/storage";

export const Route = createFileRoute("/app/patient-registration")({ component: RegisterPatient });

type FormValues = {
  name: string;
  age: string;
  gender: "Male" | "Female" | "Other";
  phone: string;
  email: string;
  bloodGroup: string;
  camp: string;
  address: string;
};

function RegisterPatient() {
  const [camps] = useStorageData(getCamps);
  const navigate = useNavigate();

  const { register, handleSubmit, reset, setValue, watch } = useForm<FormValues>({
    defaultValues: {
      name: "",
      age: "",
      gender: "Male",
      phone: "",
      email: "",
      bloodGroup: "O+",
      camp: camps[0]?.id || "",
      address: "",
    },
  });

  const submit = (data: FormValues) => {
    const newPatient = addPatient({
      name: data.name,
      age: parseInt(data.age) || 25,
      gender: data.gender,
      phone: data.phone,
      email: data.email || `${data.name.toLowerCase().replace(/\s+/g, ".")}@example.com`,
      bloodGroup: data.bloodGroup,
      address: data.address || "On-site registered",
      lastVisit: new Date().toISOString().split("T")[0],
      status: "Active",
      condition: "Registered at camp",
    });

    toast.success(`Patient "${newPatient.name}" registered (ID: ${newPatient.id})`);
    reset();
    navigate({ to: "/app/patients/$id", params: { id: newPatient.id } });
  };

  return (
    <div>
      <PageHeader
        title="Patient Registration"
        description="On-site registration for a medical camp."
        crumbs={[{ label: "Register Patient" }]}
        actions={<Button variant="outline"><QrCode className="mr-1 h-4 w-4" /> Scan QR</Button>}
      />
      <Card className="max-w-3xl p-6">
        <form onSubmit={handleSubmit(submit)} className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label>Full name *</Label>
            <Input {...register("name", { required: true })} required placeholder="e.g. John Smith" />
          </div>
          <div>
            <Label>Age *</Label>
            <Input type="number" {...register("age", { required: true })} required placeholder="35" />
          </div>
          <div>
            <Label>Gender</Label>
            <Select value={watch("gender")} onValueChange={v => setValue("gender", v as FormValues["gender"])}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Phone *</Label>
            <Input {...register("phone", { required: true })} required placeholder="+1 555-0199" />
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" {...register("email")} placeholder="john@example.com" />
          </div>
          <div>
            <Label>Blood group</Label>
            <Select value={watch("bloodGroup")} onValueChange={v => setValue("bloodGroup", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {["O+","A+","B+","AB+","O-","A-","B-","AB-"].map(x => (
                  <SelectItem key={x} value={x}>{x}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Select Medical Camp</Label>
            {camps.length === 0 ? (
              <p className="text-xs text-muted-foreground pt-2">No active camps available.</p>
            ) : (
              <Select value={watch("camp")} onValueChange={v => setValue("camp", v)}>
                <SelectTrigger><SelectValue placeholder="Choose a camp" /></SelectTrigger>
                <SelectContent>
                  {camps.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
            )}
          </div>
          <div className="sm:col-span-2">
            <Label>Address</Label>
            <Input {...register("address")} placeholder="123 Street, City" />
          </div>
          <div className="sm:col-span-2 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => reset()}>Reset</Button>
            <Button type="submit" className="gradient-primary text-white">Register & Issue QR</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

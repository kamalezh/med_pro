import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { PageHeader } from "@/components/app/PageHeader";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { departmentsList, Appointment } from "@/mock/data";
import { toast } from "sonner";
import { useStorageData, getDoctors, addAppointment } from "@/lib/storage";
import { useApp } from "@/context/AppContext";

export const Route = createFileRoute("/app/book-appointment")({ component: BookAppointment });

type FormData = {
  patientName: string;
  doctor: string;
  department: string;
  date: string;
  time: string;
  type: Appointment["type"];
  reason: string;
};

function BookAppointment() {
  const nav = useNavigate();
  const { user } = useApp();
  const [doctors] = useStorageData(getDoctors);

  const { register, handleSubmit, setValue, watch, formState: { isSubmitting } } = useForm<FormData>({
    defaultValues: {
      patientName: user?.name || "",
      doctor: "",
      department: departmentsList[0] || "",
      date: new Date().toISOString().split("T")[0],
      time: "10:00 AM",
      type: "Consultation",
      reason: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    const selectedDoc = doctors.find(d => d.id === data.doctor || d.name === data.doctor);
    const doctorName = selectedDoc ? selectedDoc.name : (data.doctor || "Duty Doctor");

    addAppointment({
      patientId: user?.id || "P100",
      patientName: data.patientName || user?.name || "Patient",
      patientEmail: user?.email,
      doctorId: selectedDoc?.id || "D100",
      doctorName,
      department: data.department || selectedDoc?.department || "General Medicine",
      date: data.date,
      time: data.time,
      status: "Approved",
      type: data.type,
      reason: data.reason || "General Consultation",
    });

    toast.success("Appointment booked successfully!");
    nav({ to: "/app/appointments" });
  };

  return (
    <div>
      <PageHeader title="Book an Appointment" crumbs={[{ label: "Appointments", to: "/app/appointments" }, { label: "Book" }]} />
      <Card className="max-w-3xl p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label>Patient Name *</Label>
            <Input {...register("patientName", { required: true })} required placeholder="Enter patient full name" />
          </div>
          <div>
            <Label>Department</Label>
            <Select value={watch("department")} onValueChange={(v) => setValue("department", v)}>
              <SelectTrigger><SelectValue placeholder="Choose department" /></SelectTrigger>
              <SelectContent>{departmentsList.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div>
            <Label>Doctor</Label>
            {doctors.length === 0 ? (
              <Input
                placeholder="Type doctor name"
                value={watch("doctor")}
                onChange={(e) => setValue("doctor", e.target.value)}
              />
            ) : (
              <Select value={watch("doctor")} onValueChange={(v) => setValue("doctor", v)}>
                <SelectTrigger><SelectValue placeholder="Choose doctor" /></SelectTrigger>
                <SelectContent>{doctors.map(d => <SelectItem key={d.id} value={d.id}>{d.name} — {d.department}</SelectItem>)}</SelectContent>
              </Select>
            )}
          </div>
          <div><Label>Date *</Label><Input type="date" {...register("date", { required: true })} required /></div>
          <div><Label>Time *</Label><Input placeholder="10:00 AM" {...register("time", { required: true })} required /></div>
          <div>
            <Label>Type</Label>
            <Select value={watch("type")} onValueChange={(v) => setValue("type", v as Appointment["type"])}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Consultation">Consultation</SelectItem>
                <SelectItem value="Follow-up">Follow-up</SelectItem>
                <SelectItem value="Check-up">Check-up</SelectItem>
                <SelectItem value="Emergency">Emergency</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="sm:col-span-2">
            <Label>Reason for visit</Label>
            <Textarea rows={3} {...register("reason")} placeholder="Briefly describe your symptoms or reason" />
          </div>
          <div className="sm:col-span-2 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => nav({ to: "/app/appointments" })}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting} className="gradient-primary text-white">{isSubmitting ? "Booking…" : "Confirm & Book"}</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

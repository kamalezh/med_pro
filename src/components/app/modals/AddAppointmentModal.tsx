import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addAppointment, getPatients, getDoctors } from "@/lib/storage";
import { toast } from "sonner";
import { Appointment, departments } from "@/mock/data";

import { useApp } from "@/context/AppContext";

interface AddAppointmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function AddAppointmentModal({ open, onOpenChange, onSuccess }: AddAppointmentModalProps) {
  const { user } = useApp();
  const [patientName, setPatientName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [department, setDepartment] = useState(departments[0]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState("10:00 AM");
  const [type, setType] = useState<Appointment["type"]>("Consultation");
  const [reason, setReason] = useState("");

  const existingPatients = getPatients();
  const existingDoctors = getDoctors();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !doctorName) {
      toast.error("Please enter patient name and doctor name");
      return;
    }

    const matchingPatient = existingPatients.find(p => p.name === patientName || p.id === patientName);

    addAppointment({
      patientId: matchingPatient?.id || user?.id || `P${Math.floor(1000 + Math.random() * 9000)}`,
      patientName,
      patientEmail: matchingPatient?.email || user?.email,
      doctorId: `D${Math.floor(100 + Math.random() * 900)}`,
      doctorName: doctorName.startsWith("Dr.") ? doctorName : `Dr. ${doctorName}`,
      department,
      date,
      time,
      status: "Approved",
      type,
      reason: reason || "General Consultation",
    });

    toast.success(`Appointment booked for ${patientName} with ${doctorName}`);
    onOpenChange(false);
    resetForm();
    if (onSuccess) onSuccess();
  };

  const resetForm = () => {
    setPatientName("");
    setDoctorName("");
    setDepartment(departments[0]);
    setDate(new Date().toISOString().split("T")[0]);
    setTime("10:00 AM");
    setType("Consultation");
    setReason("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Book New Appointment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-2 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="a-pname">Patient Name *</Label>
            {existingPatients.length > 0 ? (
              <div className="space-y-2">
                <Select
                  value={patientName}
                  onValueChange={(val) => setPatientName(val)}
                >
                  <SelectTrigger id="a-pname">
                    <SelectValue placeholder="Select patient or type custom name" />
                  </SelectTrigger>
                  <SelectContent>
                    {existingPatients.map((p) => (
                      <SelectItem key={p.id} value={p.name}>
                        {p.name} ({p.id})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Or type patient name..."
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                />
              </div>
            ) : (
              <Input
                id="a-pname"
                placeholder="e.g. Sarah Connor"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                required
              />
            )}
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="a-dname">Doctor Name *</Label>
            {existingDoctors.length > 0 ? (
              <div className="space-y-2">
                <Select
                  value={doctorName}
                  onValueChange={(val) => {
                    setDoctorName(val);
                    const docObj = existingDoctors.find((d) => d.name === val);
                    if (docObj) setDepartment(docObj.department);
                  }}
                >
                  <SelectTrigger id="a-dname">
                    <SelectValue placeholder="Select doctor or type custom name" />
                  </SelectTrigger>
                  <SelectContent>
                    {existingDoctors.map((d) => (
                      <SelectItem key={d.id} value={d.name}>
                        {d.name} — {d.department}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Or type doctor name..."
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                />
              </div>
            ) : (
              <Input
                id="a-dname"
                placeholder="e.g. Dr. Michael Chen"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                required
              />
            )}
          </div>

          <div>
            <Label htmlFor="a-dept">Department</Label>
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger id="a-dept">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {departments.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="a-type">Appointment Type</Label>
            <Select value={type} onValueChange={(v) => setType(v as Appointment["type"])}>
              <SelectTrigger id="a-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Consultation">Consultation</SelectItem>
                <SelectItem value="Follow-up">Follow-up</SelectItem>
                <SelectItem value="Emergency">Emergency</SelectItem>
                <SelectItem value="Check-up">Check-up</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="a-date">Date *</Label>
            <Input
              id="a-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="a-time">Time Slot *</Label>
            <Input
              id="a-time"
              placeholder="10:00 AM"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="a-reason">Reason for Visit</Label>
            <Input
              id="a-reason"
              placeholder="e.g. Chest discomfort, routine checkup, headache"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          <DialogFooter className="mt-4 sm:col-span-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="gradient-primary text-white">
              Confirm Appointment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

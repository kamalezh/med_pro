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
import { addDoctor } from "@/lib/storage";
import { toast } from "sonner";
import { departments, Doctor } from "@/mock/data";

interface AddDoctorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function AddDoctorModal({ open, onOpenChange, onSuccess }: AddDoctorModalProps) {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState(departments[0]);
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [availability, setAvailability] = useState<Doctor["availability"]>("Available");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      toast.error("Please enter doctor name");
      return;
    }

    const doctorName = name.startsWith("Dr.") ? name : `Dr. ${name}`;

    addDoctor({
      name: doctorName,
      department,
      specialization: specialization || `${department} Specialist`,
      experience: parseInt(experience) || 5,
      rating: 5.0,
      patients: 0,
      availability,
      email: email || `dr.${name.toLowerCase().replace(/[^a-z0-9]/g, "")}@medicamp.dev`,
      phone: phone || "+1 555-0199",
    });

    toast.success(`${doctorName} added successfully!`);
    onOpenChange(false);
    resetForm();
    if (onSuccess) onSuccess();
  };

  const resetForm = () => {
    setName("");
    setDepartment(departments[0]);
    setSpecialization("");
    setExperience("");
    setPhone("");
    setEmail("");
    setAvailability("Available");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add New Doctor</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-2 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="d-name">Full Name *</Label>
            <Input
              id="d-name"
              placeholder="e.g. Michael Chen or Dr. Michael Chen"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="d-dept">Department</Label>
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger id="d-dept">
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
            <Label htmlFor="d-spec">Specialization</Label>
            <Input
              id="d-spec"
              placeholder="e.g. Interventional Cardiology"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="d-exp">Experience (Years)</Label>
            <Input
              id="d-exp"
              type="number"
              placeholder="8"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="d-avail">Availability</Label>
            <Select value={availability} onValueChange={(v) => setAvailability(v as Doctor["availability"])}>
              <SelectTrigger id="d-avail">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="In Surgery">In Surgery</SelectItem>
                <SelectItem value="On Leave">On Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="d-phone">Phone Number</Label>
            <Input
              id="d-phone"
              placeholder="+1 555-0202"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="d-email">Email</Label>
            <Input
              id="d-email"
              type="email"
              placeholder="doctor@medicamp.dev"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <DialogFooter className="mt-4 sm:col-span-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="gradient-primary text-white">
              Save Doctor
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

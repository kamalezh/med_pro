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
import { addPatient } from "@/lib/storage";
import { toast } from "sonner";
import { Patient } from "@/mock/data";

interface AddPatientModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function AddPatientModal({ open, onOpenChange, onSuccess }: AddPatientModalProps) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<Patient["gender"]>("Male");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [bloodGroup, setBloodGroup] = useState("O+");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState<Patient["status"]>("Active");
  const [condition, setCondition] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      toast.error("Please fill in required fields (Name and Phone)");
      return;
    }

    addPatient({
      name,
      age: parseInt(age) || 25,
      gender,
      phone,
      email: email || `${name.toLowerCase().replace(/\s+/g, ".")}@example.com`,
      bloodGroup,
      address: address || "Not provided",
      lastVisit: new Date().toISOString().split("T")[0],
      status,
      condition: condition || "General checkup",
    });

    toast.success(`Patient "${name}" added successfully!`);
    onOpenChange(false);
    resetForm();
    if (onSuccess) onSuccess();
  };

  const resetForm = () => {
    setName("");
    setAge("");
    setGender("Male");
    setPhone("");
    setEmail("");
    setBloodGroup("O+");
    setAddress("");
    setStatus("Active");
    setCondition("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add New Patient</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-2 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="p-name">Full Name *</Label>
            <Input
              id="p-name"
              placeholder="e.g. Sarah Connor"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="p-age">Age</Label>
            <Input
              id="p-age"
              type="number"
              placeholder="32"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="p-gender">Gender</Label>
            <Select value={gender} onValueChange={(v) => setGender(v as Patient["gender"])}>
              <SelectTrigger id="p-gender">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="p-phone">Phone Number *</Label>
            <Input
              id="p-phone"
              placeholder="+1 555-0199"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="p-email">Email</Label>
            <Input
              id="p-email"
              type="email"
              placeholder="patient@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="p-blood">Blood Group</Label>
            <Select value={bloodGroup} onValueChange={setBloodGroup}>
              <SelectTrigger id="p-blood">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"].map((bg) => (
                  <SelectItem key={bg} value={bg}>
                    {bg}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="p-status">Status</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as Patient["status"])}>
              <SelectTrigger id="p-status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="p-address">Address</Label>
            <Input
              id="p-address"
              placeholder="123 Health Ave, City"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="p-condition">Medical Condition / Note</Label>
            <Input
              id="p-condition"
              placeholder="e.g. Hypertension check, General consultation"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            />
          </div>
          <DialogFooter className="mt-4 sm:col-span-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="gradient-primary text-white">
              Save Patient
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

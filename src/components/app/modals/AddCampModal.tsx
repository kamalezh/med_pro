import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addCamp } from "@/lib/storage";
import { toast } from "sonner";
import { Tent } from "lucide-react";

interface AddCampModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function AddCampModal({ open, onOpenChange, onSuccess }: AddCampModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [status, setStatus] = useState("Upcoming");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !date || !endDate || !location) {
      toast.error("Please fill in all required fields.");
      return;
    }

    addCamp({
      name,
      description,
      date,
      endDate,
      location,
      status: status as any,
      capacity: parseInt(capacity) || 100,
      doctorsAssigned: [],
      volunteersAssigned: [],
      services: ["General checkup", "Consultation"],
    });

    toast.success("Medical camp created successfully!");
    onOpenChange(false);
    resetForm();
    if (onSuccess) onSuccess();
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setDate("");
    setEndDate("");
    setLocation("");
    setCapacity("");
    setStatus("Upcoming");
  };

  return (
    <Dialog open={open} onOpenChange={(o) => {
      onOpenChange(o);
      if (!o) resetForm();
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold">
            <Tent className="h-5 w-5 text-primary" /> Create Medical Camp
          </DialogTitle>
          <DialogDescription>
            Schedule a new medical camp in the community.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div>
            <Label className="font-semibold">Camp Name *</Label>
            <Input 
              placeholder="e.g. Community Heart Health Drive" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="font-semibold">Start Date *</Label>
              <Input 
                type="date" 
                value={date} 
                onChange={e => setDate(e.target.value)} 
                required 
                className="mt-1"
              />
            </div>
            <div>
              <Label className="font-semibold">End Date *</Label>
              <Input 
                type="date" 
                value={endDate} 
                onChange={e => setEndDate(e.target.value)} 
                required 
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label className="font-semibold">Location *</Label>
            <Input 
              placeholder="e.g. Central Park" 
              value={location} 
              onChange={e => setLocation(e.target.value)} 
              required 
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="font-semibold">Patient Capacity</Label>
              <Input 
                type="number" 
                placeholder="100" 
                value={capacity} 
                onChange={e => setCapacity(e.target.value)} 
                className="mt-1"
              />
            </div>
            <div>
              <Label className="font-semibold">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Upcoming">Upcoming</SelectItem>
                  <SelectItem value="Ongoing">Ongoing</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="font-semibold">Description</Label>
            <Textarea 
              rows={2} 
              placeholder="Brief details about the camp..." 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              className="mt-1"
            />
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="gradient-primary text-white">
              Create Camp
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

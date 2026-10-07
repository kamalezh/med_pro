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
import { addLabReport } from "@/lib/storage";
import { toast } from "sonner";
import { LabReport, tests } from "@/mock/data";

interface AddLabReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function AddLabReportModal({ open, onOpenChange, onSuccess }: AddLabReportModalProps) {
  const [patientName, setPatientName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [testName, setTestName] = useState(tests[0]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [status, setStatus] = useState<LabReport["status"]>("Completed");
  const [result, setResult] = useState("Within normal range");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !doctorName) {
      toast.error("Please fill in patient name and doctor name");
      return;
    }

    addLabReport({
      patientId: patientName,
      doctorName: doctorName.startsWith("Dr.") ? doctorName : `Dr. ${doctorName}`,
      test: testName,
      date,
      status,
      result: status === "Completed" ? result : undefined,
    });

    toast.success(`Lab report for ${patientName} added successfully!`);
    onOpenChange(false);
    resetForm();
    if (onSuccess) onSuccess();
  };

  const resetForm = () => {
    setPatientName("");
    setDoctorName("");
    setTestName(tests[0]);
    setDate(new Date().toISOString().split("T")[0]);
    setStatus("Completed");
    setResult("Within normal range");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add Lab Report</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-2 sm:grid-cols-2">
          <div>
            <Label htmlFor="lab-pname">Patient Name *</Label>
            <Input
              id="lab-pname"
              placeholder="e.g. Sarah Johnson"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="lab-dname">Doctor Name *</Label>
            <Input
              id="lab-dname"
              placeholder="e.g. Dr. Michael Chen"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="lab-test">Diagnostic Test</Label>
            <Select value={testName} onValueChange={setTestName}>
              <SelectTrigger id="lab-test">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {tests.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="lab-date">Date</Label>
            <Input
              id="lab-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="lab-status">Status</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as LabReport["status"])}>
              <SelectTrigger id="lab-status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {status === "Completed" && (
            <div className="sm:col-span-2">
              <Label htmlFor="lab-result">Test Results / Findings</Label>
              <Input
                id="lab-result"
                placeholder="e.g. Hemoglobin 14.2 g/dL - Within normal range"
                value={result}
                onChange={(e) => setResult(e.target.value)}
              />
            </div>
          )}
          <DialogFooter className="mt-4 sm:col-span-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="gradient-primary text-white">
              Save Lab Report
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

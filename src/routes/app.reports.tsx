import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FileText, FileSpreadsheet, Users, Stethoscope, Tent, DollarSign } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/reports")({ component: ReportsPage });

const cats = [
  { key: "patients", label: "Patient Reports", icon: Users, items: ["New patients this month","Active vs inactive","Critical patients","Demographics breakdown"] },
  { key: "doctors", label: "Doctor Reports", icon: Stethoscope, items: ["Consultation load","Top performing doctors","Availability trends","Department utilization"] },
  { key: "camps", label: "Camp Reports", icon: Tent, items: ["Registration vs attendance","Camp outcomes","Volunteer hours","Locations covered"] },
  { key: "revenue", label: "Revenue Reports", icon: DollarSign, items: ["Monthly revenue","Revenue by department","Outstanding payments","Insurance breakdown"] },
];

function ReportsPage() {
  return (
    <div>
      <PageHeader title="Reports" description="Export analytics and operational reports."
        crumbs={[{ label: "Reports" }]}
        actions={<div className="flex gap-2">
          <Button variant="outline" onClick={() => toast.success("PDF exported")}><FileText className="mr-1 h-4 w-4" /> Export PDF</Button>
          <Button className="gradient-primary text-white" onClick={() => toast.success("Excel exported")}><FileSpreadsheet className="mr-1 h-4 w-4" /> Export Excel</Button>
        </div>} />
      <Tabs defaultValue="patients">
        <TabsList>{cats.map(c => <TabsTrigger key={c.key} value={c.key}>{c.label}</TabsTrigger>)}</TabsList>
        {cats.map(c => (
          <TabsContent key={c.key} value={c.key} className="mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              {c.items.map(i => (
                <Card key={i} className="p-5 hover-lift">
                  <div className="flex items-start gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary"><c.icon className="h-5 w-5" /></div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold">{i}</p>
                      <p className="mt-1 text-xs text-muted-foreground">Auto-generated · updated hourly</p>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => toast.success("Downloaded")}>Download</Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

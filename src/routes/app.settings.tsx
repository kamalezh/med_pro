import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/PageHeader";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useApp } from "@/context/AppContext";
import { toast } from "sonner";

export const Route = createFileRoute("/app/settings")({ component: SettingsPage });

function SettingsPage() {
  const { theme, toggleTheme } = useApp();
  return (
    <div>
      <PageHeader title="Hospital Settings" description="Global preferences and hospital info." crumbs={[{ label: "Settings" }]} />
      <Card className="p-6">
        <Tabs defaultValue="hospital">
          <TabsList>
            <TabsTrigger value="hospital">Hospital</TabsTrigger>
            <TabsTrigger value="theme">Theme</TabsTrigger>
            <TabsTrigger value="notif">Notifications</TabsTrigger>
          </TabsList>
          <TabsContent value="hospital" className="mt-4 grid gap-4 sm:grid-cols-2 max-w-3xl">
            <div><Label>Hospital name</Label><Input defaultValue="MediCamp Health Systems" /></div>
            <div><Label>Registration #</Label><Input defaultValue="HL-2019-04412" /></div>
            <div><Label>Phone</Label><Input defaultValue="+1 555-010-2030" /></div>
            <div><Label>Email</Label><Input defaultValue="ops@medicamp.health" /></div>
            <div className="sm:col-span-2"><Label>Address</Label><Input defaultValue="500 Health Ave, Boston, MA" /></div>
            <div className="sm:col-span-2 flex justify-end"><Button className="gradient-primary text-white" onClick={() => toast.success("Saved")}>Save</Button></div>
          </TabsContent>
          <TabsContent value="theme" className="mt-4 max-w-md space-y-4">
            <div className="flex items-center justify-between rounded-xl border border-border/60 p-4">
              <div><p className="font-medium">Dark mode</p><p className="text-xs text-muted-foreground">Currently: {theme}</p></div>
              <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border/60 p-4">
              <div><p className="font-medium">Compact tables</p><p className="text-xs text-muted-foreground">Denser rows for power users</p></div>
              <Switch />
            </div>
          </TabsContent>
          <TabsContent value="notif" className="mt-4 max-w-md space-y-4">
            {["Email notifications","SMS alerts","Push notifications","Appointment reminders","Camp updates"].map(x => (
              <div key={x} className="flex items-center justify-between rounded-xl border border-border/60 p-4">
                <p className="font-medium">{x}</p><Switch defaultChecked />
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

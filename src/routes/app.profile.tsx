import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { PageHeader } from "@/components/app/PageHeader";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useApp } from "@/context/AppContext";
import { toast } from "sonner";
import { Camera } from "lucide-react";

export const Route = createFileRoute("/app/profile")({ component: Profile });

function Profile() {
  const { user } = useApp();
  const profileForm = useForm({ defaultValues: { name: user?.name, email: user?.email, phone: user?.phone, address: user?.address, emergency: user?.emergencyContact } });
  const pwForm = useForm({ defaultValues: { current: "", next: "", confirm: "" } });

  const saveProfile = () => toast.success("Profile updated");
  const savePassword = () => { pwForm.reset(); toast.success("Password changed"); };

  if (!user) return null;

  return (
    <div>
      <PageHeader title="Profile" description="Manage your account and preferences." crumbs={[{ label: "Profile" }]} />
      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <Card className="p-6 text-center">
          <div className="relative mx-auto grid h-28 w-28 place-items-center rounded-full gradient-primary text-3xl font-bold text-white shadow-glow">
            {user.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
            <button className="absolute bottom-1 right-1 grid h-8 w-8 place-items-center rounded-full bg-background text-foreground shadow-soft border border-border" onClick={() => toast.info("Upload dialog")}>
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <h2 className="mt-4 text-xl font-bold">{user.name}</h2>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <p className="mt-1 text-xs capitalize text-primary">{user.role}</p>
          <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs">
            <div className="rounded-lg bg-muted/50 p-3"><p className="text-lg font-bold">12</p><p className="text-muted-foreground">Visits</p></div>
            <div className="rounded-lg bg-muted/50 p-3"><p className="text-lg font-bold">4</p><p className="text-muted-foreground">Camps</p></div>
            <div className="rounded-lg bg-muted/50 p-3"><p className="text-lg font-bold">98</p><p className="text-muted-foreground">Score</p></div>
          </div>
        </Card>

        <Card className="p-6">
          <Tabs defaultValue="profile">
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="emergency">Emergency</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <form onSubmit={profileForm.handleSubmit(saveProfile)} className="mt-4 grid gap-4 sm:grid-cols-2">
                <div><Label>Full name</Label><Input {...profileForm.register("name")} /></div>
                <div><Label>Email</Label><Input type="email" {...profileForm.register("email")} /></div>
                <div><Label>Phone</Label><Input {...profileForm.register("phone")} /></div>
                <div className="sm:col-span-2"><Label>Address</Label><Input {...profileForm.register("address")} /></div>
                <div className="sm:col-span-2 flex justify-end"><Button className="gradient-primary text-white" type="submit">Save changes</Button></div>
              </form>
            </TabsContent>
            <TabsContent value="password">
              <form onSubmit={pwForm.handleSubmit(savePassword)} className="mt-4 grid max-w-md gap-4">
                <div><Label>Current password</Label><Input type="password" {...pwForm.register("current", { required: true })} /></div>
                <div><Label>New password</Label><Input type="password" {...pwForm.register("next", { required: true, minLength: 6 })} /></div>
                <div><Label>Confirm new password</Label><Input type="password" {...pwForm.register("confirm", { required: true })} /></div>
                <div className="flex justify-end"><Button className="gradient-primary text-white" type="submit">Update password</Button></div>
              </form>
            </TabsContent>
            <TabsContent value="emergency">
              <form onSubmit={profileForm.handleSubmit(saveProfile)} className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2"><Label>Emergency contact</Label><Input {...profileForm.register("emergency")} placeholder="Name — Phone number" /></div>
                <div className="sm:col-span-2 flex justify-end"><Button className="gradient-primary text-white" type="submit">Save</Button></div>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}

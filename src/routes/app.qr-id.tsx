import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from "qrcode.react";
import { useApp } from "@/context/AppContext";
import { Download, Share2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/qr-id")({ component: QrID });

function QrID() {
  const { user } = useApp();
  if (!user) return null;
  const payload = JSON.stringify({ id: user.id, name: user.name, email: user.email, role: user.role });

  return (
    <div>
      <PageHeader title="Patient QR ID" description="Show this at any camp or reception for instant check-in." crumbs={[{ label: "QR ID" }]} />
      <Card className="mx-auto max-w-md p-8 text-center">
        <div className="mx-auto grid h-64 w-64 place-items-center rounded-2xl bg-white p-4 shadow-card">
          <QRCodeSVG value={payload} size={224} level="H" />
        </div>
        <h2 className="mt-6 text-xl font-semibold">{user.name}</h2>
        <p className="text-sm text-muted-foreground">Patient ID · {user.id}</p>
        <p className="mt-1 text-xs text-muted-foreground">{user.email}</p>
        <div className="mt-6 flex justify-center gap-2">
          <Button variant="outline" onClick={() => toast.success("QR downloaded")}><Download className="mr-1 h-4 w-4" /> Download</Button>
          <Button className="gradient-primary text-white" onClick={() => toast.success("Share link copied")}><Share2 className="mr-1 h-4 w-4" /> Share</Button>
        </div>
      </Card>
    </div>
  );
}

import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useApp } from "@/context/AppContext";
import { AppSidebar } from "@/components/app/Sidebar";
import { Topbar } from "@/components/app/Topbar";

export const Route = createFileRoute("/app")({
  head: () => ({ meta: [{ title: "Dashboard — MediCamp" }, { name: "robots", content: "noindex" }] }),
  component: AppLayout,
});

function AppLayout() {
  const { user } = useApp();
  const nav = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Client-only redirect (SSR renders empty shell, no crash)
    if (typeof window !== "undefined" && !user) {
      const t = setTimeout(() => {
        // Re-check because AppProvider hydrates from localStorage after mount
        const raw = localStorage.getItem("mcm_user");
        if (!raw) nav({ to: "/login" });
      }, 50);
      return () => clearTimeout(t);
    }
  }, [user, nav]);

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:pl-72">
        <Topbar onMenu={() => setSidebarOpen(true)} />
        <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
        <footer className="border-t border-border/50 py-4 text-center text-xs text-muted-foreground">
          © 2026 MediCamp · v1.0 · All rights reserved
        </footer>
      </div>
    </div>
  );
}

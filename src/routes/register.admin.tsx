import { createFileRoute } from "@tanstack/react-router";
import AdminRegister from "@/pages/AdminRegister";

export const Route = createFileRoute("/register/admin")({
  head: () => ({ meta: [{ title: "Admin registration — MediCamp" }, { name: "description", content: "Create a MediCamp admin account." }] }),
  component: AdminRegister,
});

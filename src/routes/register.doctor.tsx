import { createFileRoute } from "@tanstack/react-router";
import DoctorRegister from "@/pages/DoctorRegister";

export const Route = createFileRoute("/register/doctor")({
  head: () => ({ meta: [{ title: "Doctor registration — MediCamp" }, { name: "description", content: "Create a MediCamp doctor account." }] }),
  component: DoctorRegister,
});

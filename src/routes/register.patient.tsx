import { createFileRoute } from "@tanstack/react-router";
import PatientRegister from "@/pages/PatientRegister";

export const Route = createFileRoute("/register/patient")({
  head: () => ({ meta: [{ title: "Patient registration — MediCamp" }, { name: "description", content: "Create a MediCamp patient account." }] }),
  component: PatientRegister,
});

import { createFileRoute } from "@tanstack/react-router";
import VolunteerRegister from "@/pages/VolunteerRegister";

export const Route = createFileRoute("/register/volunteer")({
  head: () => ({ meta: [{ title: "Volunteer registration — MediCamp" }, { name: "description", content: "Create a MediCamp volunteer account." }] }),
  component: VolunteerRegister,
});

import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { l as Tent, r as User } from "../_libs/lucide-react.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { S as useStorageData, b as saveCamps, d as getAppointments, f as getCamps, o as addPatient, t as addAppointment } from "./storage-MMnSl_7q.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
import { t as useForm } from "../_libs/react-hook-form.mjs";
import { n as registerUserWithRole } from "./auth-CplBjQL6.mjs";
import { n as validators, t as RegisterShell } from "./RegisterShell-DRXa16Ni.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/register.patient-D1t_NPYc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PatientRegister() {
	const nav = useNavigate();
	const [campsList] = useStorageData(getCamps);
	const [selectedCamp, setSelectedCamp] = (0, import_react.useState)("");
	const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
	const password = watch("password");
	const submit = async (v) => {
		try {
			await registerUserWithRole({
				email: v.email,
				password: v.password,
				name: v.fullName,
				role: "patient",
				extraData: { phone: v.phone }
			});
			const p = addPatient({
				name: v.fullName,
				email: v.email,
				phone: v.phone,
				age: 30,
				gender: "Other",
				bloodGroup: "O+",
				address: "Registered Online",
				lastVisit: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
				status: "Active",
				condition: "General Camp Visit"
			});
			const campName = selectedCamp || campsList[0]?.name || "General Medical Camp";
			const nextToken = getAppointments().filter((a) => a.department === campName || a.reason?.includes(campName)).length + 1;
			addAppointment({
				patientId: p.id,
				patientName: v.fullName,
				patientEmail: v.email,
				doctorId: "D100",
				doctorName: "Duty Specialist — " + campName,
				department: campName,
				date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
				time: (/* @__PURE__ */ new Date()).toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit"
				}),
				status: "Approved",
				type: "Consultation",
				token: nextToken,
				reason: `Auto Token Queue for ${campName}`
			});
			const updatedCamps = campsList.map((c) => c.name === campName ? {
				...c,
				registered: c.registered + 1
			} : c);
			if (updatedCamps.length > 0) saveCamps(updatedCamps);
			toast.success(`Account created for ${v.fullName}! Queued for ${campName} with Token #${nextToken}`);
			nav({ to: "/login" });
		} catch (error) {
			let errorMessage = "Failed to create account. Please try again.";
			if (error.code === "auth/email-already-in-use") errorMessage = "This email is already registered.";
			else if (error.message) errorMessage = error.message;
			toast.error(errorMessage);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RegisterShell, {
		title: "Patient",
		subtitle: "Fill in your details & pick a camp to get your live queue token.",
		icon: User,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "glass p-6 shadow-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit(submit),
				className: "grid gap-4 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Full name" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...register("fullName", { required: "Required" }) }),
							errors.fullName && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-destructive",
								children: errors.fullName.message
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-2 rounded-xl border border-primary/30 bg-primary/5 p-3 space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
							htmlFor: "reg-camp-select",
							className: "font-semibold text-xs text-primary flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tent, { className: "h-4 w-4" }), " Select Medical Camp (Auto Queue Token)"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: selectedCamp,
							onValueChange: setSelectedCamp,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								id: "reg-camp-select",
								className: "h-9 bg-background text-sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select medical camp to join queue..." })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: campsList.length > 0 ? campsList.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
								value: c.name,
								children: [
									c.name,
									" (",
									c.location,
									")"
								]
							}, c.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "General Community Camp",
								children: "General Community Medical Camp"
							}) })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Email" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "email",
							...register("email", {
								required: "Required",
								validate: validators.email
							})
						}),
						errors.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-destructive",
							children: errors.email.message
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Phone number" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...register("phone", {
							required: "Required",
							validate: validators.phone
						}) }),
						errors.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-destructive",
							children: errors.phone.message
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Password" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "password",
							...register("password", {
								required: "Required",
								validate: validators.strongPassword
							})
						}),
						errors.password && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-destructive",
							children: errors.password.message
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Confirm password" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "password",
							...register("confirm", {
								required: "Required",
								validate: (v) => v === password || "Passwords do not match"
							})
						}),
						errors.confirm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-destructive",
							children: errors.confirm.message
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "sm:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: isSubmitting,
							className: "w-full gradient-primary text-white shadow-soft",
							children: isSubmitting ? "Creating account & queueing…" : "Register & Get Token"
						})
					})
				]
			})
		})
	});
}
var SplitComponent = PatientRegister;
//#endregion
export { SplitComponent as component };

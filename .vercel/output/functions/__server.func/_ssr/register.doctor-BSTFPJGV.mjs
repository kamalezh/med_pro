import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Button } from "./button-BLZ6ednA.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { l as Stethoscope, s as Tent } from "../_libs/lucide-react.mjs";
import { S as useStorageData, b as saveCamps, f as getCamps, r as addDoctor } from "./storage-5gaUGoAc.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as useForm } from "../_libs/react-hook-form.mjs";
import { n as registerUserWithRole } from "./auth-CplBjQL6.mjs";
import { n as validators, t as RegisterShell } from "./RegisterShell-DRXa16Ni.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/register.doctor-BSTFPJGV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DoctorRegister() {
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
				role: "doctor",
				extraData: {
					phone: v.phone,
					regNumber: v.regNumber,
					specialization: v.specialization,
					hospital: v.hospital
				}
			});
			const campName = selectedCamp || campsList[0]?.name || "General Medical Camp";
			const docName = v.fullName.startsWith("Dr.") ? v.fullName : `Dr. ${v.fullName}`;
			addDoctor({
				name: docName,
				department: v.specialization || campName,
				specialization: v.specialization || "General Medicine",
				experience: 5,
				rating: 5,
				patients: 0,
				availability: "Available",
				email: v.email,
				phone: v.phone
			});
			const updatedCamps = campsList.map((c) => {
				if (c.name === campName && !c.doctorsAssigned.includes(docName)) return {
					...c,
					doctorsAssigned: [...c.doctorsAssigned, docName]
				};
				return c;
			});
			if (updatedCamps.length > 0) saveCamps(updatedCamps);
			toast.success(`Doctor account created for ${docName}! Assigned to ${campName}`);
			nav({ to: "/login" });
		} catch (error) {
			let errorMessage = "Failed to create account. Please try again.";
			if (error.code === "auth/email-already-in-use") errorMessage = "This email is already registered.";
			else if (error.message) errorMessage = error.message;
			toast.error(errorMessage);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RegisterShell, {
		title: "Doctor",
		subtitle: "Provide your professional details to create a doctor account.",
		icon: Stethoscope,
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
							htmlFor: "doc-camp-select",
							className: "font-semibold text-xs text-primary flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tent, { className: "h-4 w-4" }), " Select Assigned Medical Camp"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: selectedCamp,
							onValueChange: setSelectedCamp,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								id: "doc-camp-select",
								className: "h-9 bg-background text-sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Choose camp for consultation duty..." })
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Medical registration number" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...register("regNumber", { required: "Required" }) }),
						errors.regNumber && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-destructive",
							children: errors.regNumber.message
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Specialization" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...register("specialization", { required: "Required" }) }),
						errors.specialization && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-destructive",
							children: errors.specialization.message
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Hospital / Clinic name" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...register("hospital", { required: "Required" }) }),
							errors.hospital && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-destructive",
								children: errors.hospital.message
							})
						]
					}),
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
							children: isSubmitting ? "Creating account…" : "Create account"
						})
					})
				]
			})
		})
	});
}
var SplitComponent = DoctorRegister;
//#endregion
export { SplitComponent as component };

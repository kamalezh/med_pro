import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Button } from "./button-BLZ6ednA.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as User } from "../_libs/lucide-react.mjs";
import { o as addPatient } from "./storage-5gaUGoAc.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as useForm } from "../_libs/react-hook-form.mjs";
import { n as registerUserWithRole } from "./auth-CplBjQL6.mjs";
import { n as validators, t as RegisterShell } from "./RegisterShell-DRXa16Ni.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/register.patient-vrQudOl6.js
var import_jsx_runtime = require_jsx_runtime();
function PatientRegister() {
	const nav = useNavigate();
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
			addPatient({
				name: v.fullName,
				email: v.email,
				phone: v.phone,
				age: 30,
				gender: "Other",
				bloodGroup: "O+",
				address: "Registered Online",
				lastVisit: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
				status: "Active",
				condition: "General Checkup"
			});
			toast.success(`Account created successfully for ${v.fullName}!`);
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

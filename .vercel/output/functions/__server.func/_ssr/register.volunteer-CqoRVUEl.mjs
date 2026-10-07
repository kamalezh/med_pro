import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Button } from "./button-BLZ6ednA.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { N as HandHeart } from "../_libs/lucide-react.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { t as useForm } from "../_libs/react-hook-form.mjs";
import { n as registerUserWithRole } from "./auth-CplBjQL6.mjs";
import { n as validators, t as RegisterShell } from "./RegisterShell-DRXa16Ni.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/register.volunteer-CqoRVUEl.js
var import_jsx_runtime = require_jsx_runtime();
function VolunteerRegister() {
	const nav = useNavigate();
	const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
	const password = watch("password");
	const submit = async (v) => {
		try {
			await registerUserWithRole({
				email: v.email,
				password: v.password,
				name: v.fullName,
				role: "volunteer",
				extraData: {
					phone: v.phone,
					age: Number(v.age),
					address: v.address,
					skills: v.skills,
					availability: v.availability
				}
			});
			toast.success(`Volunteer account created for ${v.fullName}`);
			nav({ to: "/login" });
		} catch (error) {
			let errorMessage = "Failed to create account. Please try again.";
			if (error.code === "auth/email-already-in-use") errorMessage = "This email is already registered.";
			else if (error.message) errorMessage = error.message;
			toast.error(errorMessage);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RegisterShell, {
		title: "Volunteer",
		subtitle: "Tell us a bit about yourself to help at MediCamp events.",
		icon: HandHeart,
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Age" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							min: 16,
							...register("age", {
								required: "Required",
								min: {
									value: 16,
									message: "Must be 16+"
								}
							})
						}),
						errors.age && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-destructive",
							children: errors.age.message
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Availability" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "Weekends, evenings…",
							...register("availability", { required: "Required" })
						}),
						errors.availability && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-destructive",
							children: errors.availability.message
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Address" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...register("address", { required: "Required" }) }),
							errors.address && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-destructive",
								children: errors.address.message
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Skills" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								rows: 3,
								placeholder: "First aid, translation, logistics…",
								...register("skills", { required: "Required" })
							}),
							errors.skills && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-destructive",
								children: errors.skills.message
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
var SplitComponent = VolunteerRegister;
//#endregion
export { SplitComponent as component };

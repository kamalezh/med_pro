import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { y as QrCode } from "../_libs/lucide-react.mjs";
import { t as PageHeader } from "./PageHeader-BAvHonDt.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { S as useStorageData, f as getCamps, o as addPatient } from "./storage-MMnSl_7q.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
import { t as useForm } from "../_libs/react-hook-form.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.patient-registration-DUBUiETc.js
var import_jsx_runtime = require_jsx_runtime();
function RegisterPatient() {
	const [camps] = useStorageData(getCamps);
	const navigate = useNavigate();
	const { register, handleSubmit, reset, setValue, watch } = useForm({ defaultValues: {
		name: "",
		age: "",
		gender: "Male",
		phone: "",
		email: "",
		bloodGroup: "O+",
		camp: camps[0]?.id || "",
		address: ""
	} });
	const submit = (data) => {
		const newPatient = addPatient({
			name: data.name,
			age: parseInt(data.age) || 25,
			gender: data.gender,
			phone: data.phone,
			email: data.email || `${data.name.toLowerCase().replace(/\s+/g, ".")}@example.com`,
			bloodGroup: data.bloodGroup,
			address: data.address || "On-site registered",
			lastVisit: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
			status: "Active",
			condition: "Registered at camp"
		});
		toast.success(`Patient "${newPatient.name}" registered (ID: ${newPatient.id})`);
		reset();
		navigate({
			to: "/app/patients/$id",
			params: { id: newPatient.id }
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Patient Registration",
		description: "On-site registration for a medical camp.",
		crumbs: [{ label: "Register Patient" }],
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "outline",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "mr-1 h-4 w-4" }), " Scan QR"]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "max-w-3xl p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleSubmit(submit),
			className: "grid gap-4 sm:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sm:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Full name *" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						...register("name", { required: true }),
						required: true,
						placeholder: "e.g. John Smith"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Age *" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "number",
					...register("age", { required: true }),
					required: true,
					placeholder: "35"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Gender" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: watch("gender"),
					onValueChange: (v) => setValue("gender", v),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "Male",
							children: "Male"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "Female",
							children: "Female"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "Other",
							children: "Other"
						})
					] })]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Phone *" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					...register("phone", { required: true }),
					required: true,
					placeholder: "+1 555-0199"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Email" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "email",
					...register("email"),
					placeholder: "john@example.com"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Blood group" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: watch("bloodGroup"),
					onValueChange: (v) => setValue("bloodGroup", v),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: [
						"O+",
						"A+",
						"B+",
						"AB+",
						"O-",
						"A-",
						"B-",
						"AB-"
					].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: x,
						children: x
					}, x)) })]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Select Medical Camp" }), camps.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground pt-2",
					children: "No active camps available."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: watch("camp"),
					onValueChange: (v) => setValue("camp", v),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Choose a camp" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: camps.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: c.id,
						children: c.name
					}, c.id)) })]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sm:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Address" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						...register("address"),
						placeholder: "123 Street, City"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sm:col-span-2 flex justify-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						onClick: () => reset(),
						children: "Reset"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "gradient-primary text-white",
						children: "Register & Issue QR"
					})]
				})
			]
		})
	})] });
}
//#endregion
export { RegisterPatient as component };

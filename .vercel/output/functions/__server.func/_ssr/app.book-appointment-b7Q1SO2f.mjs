import { r as departmentsList } from "./data--WGVlUji.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useApp } from "./AppContext-UvazMoqe.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Button } from "./button-BLZ6ednA.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { S as useStorageData, p as getDoctors, t as addAppointment } from "./storage-5gaUGoAc.mjs";
import { t as PageHeader } from "./PageHeader-BAvHonDt.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { t as useForm } from "../_libs/react-hook-form.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.book-appointment-b7Q1SO2f.js
var import_jsx_runtime = require_jsx_runtime();
function BookAppointment() {
	const nav = useNavigate();
	const { user } = useApp();
	const [doctors] = useStorageData(getDoctors);
	const { register, handleSubmit, setValue, watch, formState: { isSubmitting } } = useForm({ defaultValues: {
		patientName: user?.name || "",
		doctor: "",
		department: departmentsList[0] || "",
		date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
		time: "10:00 AM",
		type: "Consultation",
		reason: ""
	} });
	const onSubmit = async (data) => {
		const selectedDoc = doctors.find((d) => d.id === data.doctor || d.name === data.doctor);
		const doctorName = selectedDoc ? selectedDoc.name : data.doctor || "Duty Doctor";
		addAppointment({
			patientId: user?.id || "P100",
			patientName: data.patientName || user?.name || "Patient",
			patientEmail: user?.email,
			doctorId: selectedDoc?.id || "D100",
			doctorName,
			department: data.department || selectedDoc?.department || "General Medicine",
			date: data.date,
			time: data.time,
			status: "Approved",
			type: data.type,
			reason: data.reason || "General Consultation"
		});
		toast.success("Appointment booked successfully!");
		nav({ to: "/app/appointments" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Book an Appointment",
		crumbs: [{
			label: "Appointments",
			to: "/app/appointments"
		}, { label: "Book" }]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "max-w-3xl p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleSubmit(onSubmit),
			className: "grid gap-5 sm:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sm:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Patient Name *" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						...register("patientName", { required: true }),
						required: true,
						placeholder: "Enter patient full name"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Department" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: watch("department"),
					onValueChange: (v) => setValue("department", v),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Choose department" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: departmentsList.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: d,
						children: d
					}, d)) })]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Doctor" }), doctors.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					placeholder: "Type doctor name",
					value: watch("doctor"),
					onChange: (e) => setValue("doctor", e.target.value)
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: watch("doctor"),
					onValueChange: (v) => setValue("doctor", v),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Choose doctor" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: doctors.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
						value: d.id,
						children: [
							d.name,
							" — ",
							d.department
						]
					}, d.id)) })]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Date *" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "date",
					...register("date", { required: true }),
					required: true
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Time *" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					placeholder: "10:00 AM",
					...register("time", { required: true }),
					required: true
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Type" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: watch("type"),
					onValueChange: (v) => setValue("type", v),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "Consultation",
							children: "Consultation"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "Follow-up",
							children: "Follow-up"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "Check-up",
							children: "Check-up"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "Emergency",
							children: "Emergency"
						})
					] })]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sm:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Reason for visit" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						rows: 3,
						...register("reason"),
						placeholder: "Briefly describe your symptoms or reason"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sm:col-span-2 flex justify-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						onClick: () => nav({ to: "/app/appointments" }),
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: isSubmitting,
						className: "gradient-primary text-white",
						children: isSubmitting ? "Booking…" : "Confirm & Book"
					})]
				})
			]
		})
	})] });
}
//#endregion
export { BookAppointment as component };

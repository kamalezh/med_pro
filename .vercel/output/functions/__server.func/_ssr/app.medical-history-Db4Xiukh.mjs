import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Button } from "./button-BLZ6ednA.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { B as Download, F as FileText, nt as CalendarClock, v as Plus } from "../_libs/lucide-react.mjs";
import { i as addMedicalHistory, m as getMedicalHistory, x as useStorageData } from "./storage-D8YOCuo1.mjs";
import { t as PageHeader } from "./PageHeader-BAvHonDt.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as EmptyState } from "./EmptyState-yxIRwAHL.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./dialog-CzUx__WV.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.medical-history-Db4Xiukh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function History() {
	const [addOpen, setAddOpen] = (0, import_react.useState)(false);
	const [medicalHistory] = useStorageData(getMedicalHistory);
	const [date, setDate] = (0, import_react.useState)((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
	const [type, setType] = (0, import_react.useState)("Consultation");
	const [description, setDescription] = (0, import_react.useState)("");
	const [doctor, setDoctor] = (0, import_react.useState)("");
	const handleAddHistory = (e) => {
		e.preventDefault();
		if (!description) {
			toast.error("Please enter a description");
			return;
		}
		addMedicalHistory({
			date,
			type,
			description,
			doctor: doctor || "Attending Physician"
		});
		toast.success("Medical history entry added");
		setAddOpen(false);
		setDescription("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Medical History",
			description: "Complete timeline of medical activity and records.",
			crumbs: [{ label: "Medical History" }],
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					onClick: () => toast.success("PDF export generated"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "mr-1 h-4 w-4" }), " Export PDF"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "gradient-primary text-white",
					onClick: () => setAddOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 h-4 w-4" }), " Add Record"]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "p-6",
			children: medicalHistory.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: FileText,
				title: "No medical history recorded",
				description: "Click 'Add Record' to log consultations, prescriptions, vaccinations, or surgeries.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "gradient-primary text-white",
					onClick: () => setAddOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 h-4 w-4" }), " Add Record"]
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "relative border-l-2 border-primary/30 ml-2",
				children: medicalHistory.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "mb-6 ml-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute -left-3 grid h-6 w-6 place-items-center rounded-full gradient-primary text-white shadow-glow",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "h-3 w-3" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass rounded-xl p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "secondary",
									children: e.type
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
									className: "text-xs text-muted-foreground",
									children: e.date
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm",
								children: e.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: ["— ", e.doctor]
							})
						]
					})]
				}, e.id))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: addOpen,
			onOpenChange: setAddOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "sm:max-w-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "text-xl font-bold",
					children: "Add Medical History Record"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleAddHistory,
					className: "space-y-4 py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Date" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: date,
							onChange: (e) => setDate(e.target.value),
							required: true
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Record Type" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "e.g. Consultation, Vaccination, Surgery",
							value: type,
							onChange: (e) => setType(e.target.value),
							required: true
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Description / Note" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "e.g. Routine checkup, all indicators normal",
							value: description,
							onChange: (e) => setDescription(e.target.value),
							required: true
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Attending Doctor / Staff" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "e.g. Dr. Michael Chen",
							value: doctor,
							onChange: (e) => setDoctor(e.target.value)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							onClick: () => setAddOpen(false),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							className: "gradient-primary text-white",
							children: "Save Record"
						})] })
					]
				})]
			})
		})
	] });
}
//#endregion
export { History as component };

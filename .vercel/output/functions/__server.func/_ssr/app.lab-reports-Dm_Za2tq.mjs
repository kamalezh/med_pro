import { o as __toESM } from "../_runtime.mjs";
import { c as tests } from "./data--WGVlUji.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Button } from "./button-BLZ6ednA.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { B as Download, I as FileSpreadsheet, v as Plus } from "../_libs/lucide-react.mjs";
import { p as getLabReports, r as addLabReport, x as useStorageData } from "./storage-D8YOCuo1.mjs";
import { t as PageHeader } from "./PageHeader-BAvHonDt.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
import { t as EmptyState } from "./EmptyState-yxIRwAHL.mjs";
import { t as StatusBadge } from "./StatusBadge-4Y7LwOPl.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./dialog-CzUx__WV.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.lab-reports-Dm_Za2tq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AddLabReportModal({ open, onOpenChange, onSuccess }) {
	const [patientName, setPatientName] = (0, import_react.useState)("");
	const [doctorName, setDoctorName] = (0, import_react.useState)("");
	const [testName, setTestName] = (0, import_react.useState)(tests[0]);
	const [date, setDate] = (0, import_react.useState)((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
	const [status, setStatus] = (0, import_react.useState)("Completed");
	const [result, setResult] = (0, import_react.useState)("Within normal range");
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!patientName || !doctorName) {
			toast.error("Please fill in patient name and doctor name");
			return;
		}
		addLabReport({
			patientId: patientName,
			doctorName: doctorName.startsWith("Dr.") ? doctorName : `Dr. ${doctorName}`,
			test: testName,
			date,
			status,
			result: status === "Completed" ? result : void 0
		});
		toast.success(`Lab report for ${patientName} added successfully!`);
		onOpenChange(false);
		resetForm();
		if (onSuccess) onSuccess();
	};
	const resetForm = () => {
		setPatientName("");
		setDoctorName("");
		setTestName(tests[0]);
		setDate((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
		setStatus("Completed");
		setResult("Within normal range");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sm:max-w-lg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				className: "text-xl font-bold",
				children: "Add Lab Report"
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "grid gap-4 py-2 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "lab-pname",
						children: "Patient Name *"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "lab-pname",
						placeholder: "e.g. Sarah Johnson",
						value: patientName,
						onChange: (e) => setPatientName(e.target.value),
						required: true
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "lab-dname",
						children: "Doctor Name *"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "lab-dname",
						placeholder: "e.g. Dr. Michael Chen",
						value: doctorName,
						onChange: (e) => setDoctorName(e.target.value),
						required: true
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "lab-test",
						children: "Diagnostic Test"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: testName,
						onValueChange: setTestName,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							id: "lab-test",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: tests.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: t,
							children: t
						}, t)) })]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "lab-date",
						children: "Date"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "lab-date",
						type: "date",
						value: date,
						onChange: (e) => setDate(e.target.value)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "lab-status",
						children: "Status"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: status,
						onValueChange: (v) => setStatus(v),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							id: "lab-status",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "Completed",
								children: "Completed"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "In Progress",
								children: "In Progress"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "Pending",
								children: "Pending"
							})
						] })]
					})] }),
					status === "Completed" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "lab-result",
							children: "Test Results / Findings"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "lab-result",
							placeholder: "e.g. Hemoglobin 14.2 g/dL - Within normal range",
							value: result,
							onChange: (e) => setResult(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
						className: "mt-4 sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							onClick: () => onOpenChange(false),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							className: "gradient-primary text-white",
							children: "Save Lab Report"
						})]
					})
				]
			})]
		})
	});
}
function Lab() {
	const [addModalOpen, setAddModalOpen] = (0, import_react.useState)(false);
	const [labReports] = useStorageData(getLabReports);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Lab Reports & Requests",
			description: "All laboratory investigations and results.",
			crumbs: [{ label: "Lab Reports" }],
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				className: "gradient-primary text-white",
				onClick: () => setAddModalOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 h-4 w-4" }), " Add Lab Report"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "p-4 sm:p-6",
			children: labReports.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: FileSpreadsheet,
				title: "No lab reports available",
				description: "Click the button below to add your first lab report or request.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "gradient-primary text-white",
					onClick: () => setAddModalOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 h-4 w-4" }), " Add Lab Report"]
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto rounded-xl border border-border/60",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "ID" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Patient / Test" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Requested by" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Date" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Result" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right",
						children: "Action"
					})
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: labReports.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "font-mono text-xs",
						children: l.id
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: l.test
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: l.patientId
					})] }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: l.doctorName }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: l.date }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-sm text-muted-foreground",
						children: l.result ?? "Pending"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: l.status }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-right",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => toast.success("Lab report downloaded"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" })
						})
					})
				] }, l.id)) })] })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddLabReportModal, {
			open: addModalOpen,
			onOpenChange: setAddModalOpen
		})
	] });
}
//#endregion
export { Lab as component };

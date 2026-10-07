import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useApp } from "./AppContext-UvazMoqe.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Button } from "./button-BLZ6ednA.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { B as Download, o as Trash2, v as Plus, y as Pill } from "../_libs/lucide-react.mjs";
import { g as getPrescriptions, h as getPatients, o as addPrescription, x as useStorageData } from "./storage-D8YOCuo1.mjs";
import { t as PageHeader } from "./PageHeader-BAvHonDt.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as EmptyState } from "./EmptyState-yxIRwAHL.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./dialog-CzUx__WV.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.prescriptions-BlBSNap7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AddPrescriptionModal({ open, onOpenChange, onSuccess }) {
	const [patientName, setPatientName] = (0, import_react.useState)("");
	const [doctorName, setDoctorName] = (0, import_react.useState)("");
	const [diagnosis, setDiagnosis] = (0, import_react.useState)("");
	const [date, setDate] = (0, import_react.useState)((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
	const [notes, setNotes] = (0, import_react.useState)("Take medication after meals.");
	const [medicines, setMedicines] = (0, import_react.useState)([{
		name: "Paracetamol 500mg",
		dosage: "1 tablet",
		frequency: "3x daily",
		duration: "5 days"
	}]);
	const existingPatients = getPatients();
	const handleAddMed = () => {
		setMedicines([...medicines, {
			name: "",
			dosage: "1 tablet",
			frequency: "2x daily",
			duration: "7 days"
		}]);
	};
	const handleRemoveMed = (index) => {
		setMedicines(medicines.filter((_, i) => i !== index));
	};
	const handleMedChange = (index, field, val) => {
		const updated = [...medicines];
		updated[index] = {
			...updated[index],
			[field]: val
		};
		setMedicines(updated);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!patientName || !doctorName || !diagnosis) {
			toast.error("Please fill in patient name, doctor name, and diagnosis");
			return;
		}
		const matchingPatient = existingPatients.find((p) => p.name.toLowerCase() === patientName.toLowerCase() || p.id.toLowerCase() === patientName.toLowerCase());
		addPrescription({
			patientId: matchingPatient?.id || patientName,
			patientName: matchingPatient?.name || patientName,
			patientEmail: matchingPatient?.email,
			doctorName: doctorName.startsWith("Dr.") ? doctorName : `Dr. ${doctorName}`,
			date,
			diagnosis,
			medicines: medicines.filter((m) => m.name.trim() !== ""),
			notes: notes || "Take after meals."
		});
		toast.success(`Prescription created for ${patientName}`);
		onOpenChange(false);
		resetForm();
		if (onSuccess) onSuccess();
	};
	const resetForm = () => {
		setPatientName("");
		setDoctorName("");
		setDiagnosis("");
		setDate((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
		setNotes("Take medication after meals.");
		setMedicines([{
			name: "Paracetamol 500mg",
			dosage: "1 tablet",
			frequency: "3x daily",
			duration: "5 days"
		}]);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sm:max-w-xl max-h-[90vh] overflow-y-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				className: "text-xl font-bold",
				children: "New Prescription"
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "grid gap-4 py-2 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "rx-pname",
						children: "Patient Name *"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "rx-pname",
						placeholder: "e.g. Sarah Johnson",
						value: patientName,
						onChange: (e) => setPatientName(e.target.value),
						required: true
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "rx-dname",
						children: "Doctor Name *"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "rx-dname",
						placeholder: "e.g. Dr. Michael Chen",
						value: doctorName,
						onChange: (e) => setDoctorName(e.target.value),
						required: true
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "rx-diag",
						children: "Diagnosis *"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "rx-diag",
						placeholder: "e.g. Acute Bronchitis",
						value: diagnosis,
						onChange: (e) => setDiagnosis(e.target.value),
						required: true
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "rx-date",
						children: "Date"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "rx-date",
						type: "date",
						value: date,
						onChange: (e) => setDate(e.target.value)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-2 space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "font-semibold",
								children: "Prescribed Medicines"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								size: "sm",
								variant: "outline",
								onClick: handleAddMed,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 h-3.5 w-3.5" }), " Add Medicine"]
							})]
						}), medicines.map((med, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-12 gap-2 items-center rounded-lg border p-2 bg-muted/20",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "col-span-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										placeholder: "Medicine name",
										value: med.name,
										onChange: (e) => handleMedChange(idx, "name", e.target.value)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "col-span-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										placeholder: "Dosage",
										value: med.dosage,
										onChange: (e) => handleMedChange(idx, "dosage", e.target.value)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "col-span-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										placeholder: "Freq",
										value: med.frequency,
										onChange: (e) => handleMedChange(idx, "frequency", e.target.value)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "col-span-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										placeholder: "Duration",
										value: med.duration,
										onChange: (e) => handleMedChange(idx, "duration", e.target.value)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "col-span-1 text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										size: "icon",
										variant: "ghost",
										onClick: () => handleRemoveMed(idx),
										disabled: medicines.length === 1,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 text-destructive" })
									})
								})
							]
						}, idx))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "rx-notes",
							children: "Notes / Instructions"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "rx-notes",
							placeholder: "e.g. Drink plenty of water, follow up in 10 days",
							value: notes,
							onChange: (e) => setNotes(e.target.value),
							rows: 2
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
							children: "Save Prescription"
						})]
					})
				]
			})]
		})
	});
}
function Rx() {
	const { user } = useApp();
	const [addModalOpen, setAddModalOpen] = (0, import_react.useState)(false);
	const [allPrescriptions] = useStorageData(getPrescriptions);
	const isPatient = user?.role === "patient";
	const canAdd = user?.role === "doctor" || user?.role === "admin";
	const prescriptions = isPatient ? allPrescriptions.filter((rx) => {
		if (!user) return false;
		const uEmail = (user.email || "").toLowerCase();
		const uName = (user.name || "").toLowerCase();
		const uId = (user.id || "").toLowerCase();
		const rxEmail = (rx.patientEmail || "").toLowerCase();
		const rxId = (rx.patientId || "").toLowerCase();
		const rxName = (rx.patientName || rx.patientId || "").toLowerCase();
		const uEmailPrefix = uEmail.split("@")[0];
		if (rxEmail && uEmail && rxEmail === uEmail) return true;
		if (rxId && uId && rxId === uId) return true;
		if (rxName && uName && (rxName === uName || rxName.includes(uName) || uName.includes(rxName))) return true;
		if (uEmailPrefix && (rxId.includes(uEmailPrefix) || rxName.includes(uEmailPrefix))) return true;
		return false;
	}) : allPrescriptions;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: isPatient ? "My Prescriptions" : "All Prescriptions",
			description: isPatient ? "Your personal prescribed medicines and dosages." : "All medicines prescribed by care team.",
			crumbs: [{ label: "Prescriptions" }],
			actions: canAdd ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				className: "gradient-primary text-white",
				onClick: () => setAddModalOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 h-4 w-4" }), " Add Prescription"]
			}) : void 0
		}),
		prescriptions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: Pill,
			title: isPatient ? "No prescriptions issued for you yet" : "No prescriptions created yet",
			description: isPatient ? "When your doctor conducts a consultation and issues a prescription, it will appear here." : "Click the button below to add a prescription for a patient.",
			action: canAdd ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				className: "gradient-primary text-white",
				onClick: () => setAddModalOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 h-4 w-4" }), " Add Prescription"]
			}) : void 0
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 lg:grid-cols-2",
			children: prescriptions.map((rx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-6 hover-lift",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { className: "h-5 w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold",
								children: rx.diagnosis
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									"Patient: ",
									rx.patientName || rx.patientId,
									" · ",
									rx.doctorName,
									" · ",
									rx.date
								]
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							children: rx.id
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-2",
						children: rx.medicines.map((m, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: m.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									m.dosage,
									" · ",
									m.frequency
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								children: m.duration
							})]
						}, idx))
					}),
					rx.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-xs text-muted-foreground",
						children: ["Notes: ", rx.notes]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "ghost",
						className: "mt-3",
						onClick: () => toast.success("Prescription downloaded"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "mr-1 h-4 w-4" }), " Download PDF"]
					})
				]
			}, rx.id))
		}),
		canAdd && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddPrescriptionModal, {
			open: addModalOpen,
			onOpenChange: setAddModalOpen
		})
	] });
}
//#endregion
export { Rx as component };

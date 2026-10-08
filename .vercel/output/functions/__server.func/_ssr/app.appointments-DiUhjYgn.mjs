import { o as __toESM } from "../_runtime.mjs";
import { n as departments } from "./data--WGVlUji.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useApp } from "./AppContext-UvazMoqe.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Button } from "./button-BLZ6ednA.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { Q as Check, g as Search, l as Stethoscope, o as Trash2, ot as Ban, t as X, tt as Calendar, v as Plus } from "../_libs/lucide-react.mjs";
import { S as useStorageData, d as getAppointments, g as getPatients, p as getDoctors, s as addPrescription, t as addAppointment, y as saveAppointments } from "./storage-5gaUGoAc.mjs";
import { t as PageHeader } from "./PageHeader-BAvHonDt.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
import { t as EmptyState } from "./EmptyState-yxIRwAHL.mjs";
import { t as StatusBadge } from "./StatusBadge-4Y7LwOPl.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
import { t as usePagination } from "./usePagination-qbXCEir3.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, t as Dialog } from "./dialog-CwLzEEob.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.appointments-DiUhjYgn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AddAppointmentModal({ open, onOpenChange, onSuccess }) {
	const { user } = useApp();
	const [patientName, setPatientName] = (0, import_react.useState)("");
	const [doctorName, setDoctorName] = (0, import_react.useState)("");
	const [department, setDepartment] = (0, import_react.useState)(departments[0]);
	const [date, setDate] = (0, import_react.useState)((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
	const [time, setTime] = (0, import_react.useState)("10:00 AM");
	const [type, setType] = (0, import_react.useState)("Consultation");
	const [reason, setReason] = (0, import_react.useState)("");
	const existingPatients = getPatients();
	const existingDoctors = getDoctors();
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!patientName || !doctorName) {
			toast.error("Please enter patient name and doctor name");
			return;
		}
		const matchingPatient = existingPatients.find((p) => p.name === patientName || p.id === patientName);
		addAppointment({
			patientId: matchingPatient?.id || user?.id || `P${Math.floor(1e3 + Math.random() * 9e3)}`,
			patientName,
			patientEmail: matchingPatient?.email || user?.email,
			doctorId: `D${Math.floor(100 + Math.random() * 900)}`,
			doctorName: doctorName.startsWith("Dr.") ? doctorName : `Dr. ${doctorName}`,
			department,
			date,
			time,
			status: "Approved",
			type,
			reason: reason || "General Consultation"
		});
		toast.success(`Appointment booked for ${patientName} with ${doctorName}`);
		onOpenChange(false);
		resetForm();
		if (onSuccess) onSuccess();
	};
	const resetForm = () => {
		setPatientName("");
		setDoctorName("");
		setDepartment(departments[0]);
		setDate((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
		setTime("10:00 AM");
		setType("Consultation");
		setReason("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sm:max-w-lg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				className: "text-xl font-bold",
				children: "Book New Appointment"
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "grid gap-4 py-2 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "a-pname",
							children: "Patient Name *"
						}), existingPatients.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: patientName,
								onValueChange: (val) => setPatientName(val),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									id: "a-pname",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select patient or type custom name" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: existingPatients.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
									value: p.name,
									children: [
										p.name,
										" (",
										p.id,
										")"
									]
								}, p.id)) })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "Or type patient name...",
								value: patientName,
								onChange: (e) => setPatientName(e.target.value)
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "a-pname",
							placeholder: "e.g. Sarah Connor",
							value: patientName,
							onChange: (e) => setPatientName(e.target.value),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "a-dname",
							children: "Doctor Name *"
						}), existingDoctors.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: doctorName,
								onValueChange: (val) => {
									setDoctorName(val);
									const docObj = existingDoctors.find((d) => d.name === val);
									if (docObj) setDepartment(docObj.department);
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									id: "a-dname",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select doctor or type custom name" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: existingDoctors.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
									value: d.name,
									children: [
										d.name,
										" — ",
										d.department
									]
								}, d.id)) })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "Or type doctor name...",
								value: doctorName,
								onChange: (e) => setDoctorName(e.target.value)
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "a-dname",
							placeholder: "e.g. Dr. Michael Chen",
							value: doctorName,
							onChange: (e) => setDoctorName(e.target.value),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "a-dept",
						children: "Department"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: department,
						onValueChange: setDepartment,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							id: "a-dept",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: departments.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: d,
							children: d
						}, d)) })]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "a-type",
						children: "Appointment Type"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: type,
						onValueChange: (v) => setType(v),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							id: "a-type",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "Consultation",
								children: "Consultation"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "Follow-up",
								children: "Follow-up"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "Emergency",
								children: "Emergency"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "Check-up",
								children: "Check-up"
							})
						] })]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "a-date",
						children: "Date *"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "a-date",
						type: "date",
						value: date,
						onChange: (e) => setDate(e.target.value),
						required: true
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "a-time",
						children: "Time Slot *"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "a-time",
						placeholder: "10:00 AM",
						value: time,
						onChange: (e) => setTime(e.target.value),
						required: true
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "a-reason",
							children: "Reason for Visit"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "a-reason",
							placeholder: "e.g. Chest discomfort, routine checkup, headache",
							value: reason,
							onChange: (e) => setReason(e.target.value)
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
							children: "Confirm Appointment"
						})]
					})
				]
			})]
		})
	});
}
function ConsultationModal({ appointment, open, onOpenChange, onSuccess }) {
	const { user } = useApp();
	const [symptoms, setSymptoms] = (0, import_react.useState)("");
	const [diagnosis, setDiagnosis] = (0, import_react.useState)(appointment?.reason || "");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [followUp, setFollowUp] = (0, import_react.useState)("");
	const [meds, setMeds] = (0, import_react.useState)([{
		name: "Paracetamol 500mg",
		dosage: "1 tablet",
		frequency: "3x daily",
		duration: "5 days"
	}]);
	if (!appointment) return null;
	const patientObj = getPatients().find((p) => p.name === appointment.patientName || p.id === appointment.patientId);
	const handleAddMed = () => {
		setMeds([...meds, {
			name: "",
			dosage: "1 tablet",
			frequency: "2x daily",
			duration: "7 days"
		}]);
	};
	const handleRemoveMed = (index) => {
		setMeds(meds.filter((_, i) => i !== index));
	};
	const handleMedChange = (index, field, val) => {
		const updated = [...meds];
		updated[index] = {
			...updated[index],
			[field]: val
		};
		setMeds(updated);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!diagnosis) {
			toast.error("Please enter a primary diagnosis");
			return;
		}
		const doctorName = user?.name ? user.name.startsWith("Dr.") ? user.name : `Dr. ${user.name}` : appointment.doctorName;
		addPrescription({
			patientId: appointment.patientId || appointment.patientName,
			patientName: appointment.patientName,
			patientEmail: appointment.patientEmail || patientObj?.email,
			doctorName,
			date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
			diagnosis,
			medicines: meds.filter((m) => m.name.trim() !== ""),
			notes: notes || "Take medication after meals."
		});
		saveAppointments(getAppointments().map((a) => a.id === appointment.id ? {
			...a,
			status: "Completed"
		} : a));
		toast.success(`Consultation completed for ${appointment.patientName}!`);
		onOpenChange(false);
		resetForm();
		if (onSuccess) onSuccess();
	};
	const resetForm = () => {
		setSymptoms("");
		setDiagnosis("");
		setNotes("");
		setFollowUp("");
		setMeds([{
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
			className: "sm:max-w-2xl max-h-[90vh] overflow-y-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
					className: "text-xl font-bold flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stethoscope, { className: "h-5 w-5 text-primary" }), " Start Patient Consultation"]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl bg-muted/40 p-4 border border-border/60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-12 w-12 place-items-center rounded-full gradient-primary text-base font-bold text-white shadow-soft",
								children: appointment.patientName.split(" ").map((n) => n[0]).slice(0, 2).join("")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-bold text-base",
								children: appointment.patientName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									appointment.department,
									" · Token #",
									appointment.token,
									" · ",
									appointment.time
								]
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							className: "font-mono text-xs",
							children: appointment.id
						})]
					}), patientObj && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-border/40 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Age/Gender:"
								}),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-medium",
									children: [
										patientObj.age,
										"y · ",
										patientObj.gender
									]
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Blood Group:"
								}),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold text-destructive",
									children: patientObj.bloodGroup
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Phone:"
								}),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono",
									children: patientObj.phone
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Condition:"
								}),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate font-medium",
									children: patientObj.condition || "N/A"
								})
							] })
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					className: "space-y-4 py-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "font-semibold",
							children: "Symptoms & Clinical History"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							rows: 2,
							placeholder: "Describe symptoms, temperature, blood pressure, duration of illness...",
							value: symptoms,
							onChange: (e) => setSymptoms(e.target.value),
							className: "mt-1"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "font-semibold",
							children: "Primary Diagnosis *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "e.g. Acute Bronchitis, Hypertension, Viral Fever",
							value: diagnosis,
							onChange: (e) => setDiagnosis(e.target.value),
							required: true,
							className: "mt-1"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "font-semibold",
									children: "Prescription Medicines"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									size: "sm",
									variant: "outline",
									onClick: handleAddMed,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 h-3.5 w-3.5" }), " Add Medicine"]
								})]
							}), meds.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-12 gap-2 items-center rounded-lg border p-2 bg-muted/20",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "col-span-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											placeholder: "Medicine name",
											value: m.name,
											onChange: (e) => handleMedChange(i, "name", e.target.value)
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "col-span-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											placeholder: "Dosage",
											value: m.dosage,
											onChange: (e) => handleMedChange(i, "dosage", e.target.value)
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "col-span-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											placeholder: "Freq",
											value: m.frequency,
											onChange: (e) => handleMedChange(i, "frequency", e.target.value)
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "col-span-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											placeholder: "Duration",
											value: m.duration,
											onChange: (e) => handleMedChange(i, "duration", e.target.value)
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "col-span-1 text-right",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "icon",
											variant: "ghost",
											type: "button",
											onClick: () => handleRemoveMed(i),
											disabled: meds.length === 1,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 text-destructive" })
										})
									})
								]
							}, i))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "font-semibold",
							children: "Doctor's Clinical Notes & Advice"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							rows: 2,
							placeholder: "Dietary instructions, rest, lifestyle changes...",
							value: notes,
							onChange: (e) => setNotes(e.target.value),
							className: "mt-1"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "font-semibold",
							children: "Recommended Follow-up Date"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: followUp,
							onChange: (e) => setFollowUp(e.target.value),
							className: "mt-1 sm:w-1/2"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								onClick: () => onOpenChange(false),
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: "gradient-primary text-white",
								children: "Complete Consultation & Issue Rx"
							})]
						})
					]
				})
			]
		})
	});
}
function AppointmentsPage() {
	const { user } = useApp();
	const [q, setQ] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("all");
	const [addModalOpen, setAddModalOpen] = (0, import_react.useState)(false);
	const [consultModalOpen, setConsultModalOpen] = (0, import_react.useState)(false);
	const [selectedApptForConsult, setSelectedApptForConsult] = (0, import_react.useState)(null);
	const [items] = useStorageData(getAppointments);
	const isPatient = user?.role === "patient";
	const isDoctor = user?.role === "doctor";
	const assignedCamp = user?.department || (typeof window !== "undefined" ? localStorage.getItem("mcm_doctor_assigned_camp") : "") || "";
	const filtered = (0, import_react.useMemo)(() => items.filter((a) => {
		if (isPatient) {
			const uEmail = (user?.email || "").toLowerCase();
			const uName = (user?.name || "").toLowerCase();
			const uId = (user?.id || "").toLowerCase();
			const aEmail = (a.patientEmail || "").toLowerCase();
			const aName = (a.patientName || "").toLowerCase();
			const aId = (a.patientId || "").toLowerCase();
			const uEmailPrefix = uEmail.split("@")[0];
			if (!(aEmail && uEmail && aEmail === uEmail || aId && uId && aId === uId || aName && uName && (aName === uName || aName.includes(uName) || uName.includes(aName)) || uEmailPrefix && (aName.includes(uEmailPrefix) || aId.includes(uEmailPrefix)))) return false;
		}
		if (isDoctor && assignedCamp) {
			const aDept = (a.department || "").toLowerCase();
			const aReason = (a.reason || "").toLowerCase();
			const campLow = assignedCamp.toLowerCase();
			const docNameLow = (user?.name || "").toLowerCase();
			const aDocLow = (a.doctorName || "").toLowerCase();
			if (!(aDept.includes(campLow) || campLow.includes(aDept) || aReason.includes(campLow) || aDocLow.includes(docNameLow) || docNameLow.includes(aDocLow) || a.doctorId === user?.id)) return false;
		}
		return (status === "all" || a.status === status) && (q === "" || a.patientName.toLowerCase().includes(q.toLowerCase()) || a.doctorName.toLowerCase().includes(q.toLowerCase()));
	}), [
		items,
		q,
		status,
		isPatient,
		isDoctor,
		assignedCamp,
		user
	]);
	const p = usePagination(filtered, 8);
	const setStatusFor = (id, s) => {
		saveAppointments(items.map((a) => a.id === id ? {
			...a,
			status: s
		} : a));
		toast.success(`Appointment ${s.toLowerCase()}`);
	};
	const handleStartConsultation = (appt) => {
		setSelectedApptForConsult(appt);
		setConsultModalOpen(true);
	};
	const canManage = user?.role === "doctor" || user?.role === "admin";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Appointments & Direct Consultation",
			description: "Manage bookings, approve requests, and launch direct patient consultations.",
			crumbs: [{ label: "Appointments" }],
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				className: "gradient-primary text-white",
				onClick: () => setAddModalOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 h-4 w-4" }), " Book Appointment"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-4 sm:p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:flex-wrap",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative min-w-0 sm:w-72",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Search patient or doctor…",
						value: q,
						onChange: (e) => setQ(e.target.value),
						className: "pl-9"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: status,
					onValueChange: setStatus,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "w-40",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "all",
							children: "All statuses"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "Pending",
							children: "Pending"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "Approved",
							children: "Approved"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "Completed",
							children: "Completed"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "Cancelled",
							children: "Cancelled"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "Rejected",
							children: "Rejected"
						})
					] })]
				})]
			}), filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: Calendar,
				title: items.length === 0 ? "No appointments booked yet" : "No matching appointments found",
				description: items.length === 0 ? "Click the button below to schedule your first appointment." : "Try clearing or changing your search filters.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "gradient-primary text-white",
					onClick: () => setAddModalOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 h-4 w-4" }), " Book Appointment"]
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto rounded-xl border border-border/60",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "ID" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Patient" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Doctor" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Department" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Date / Time" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Token" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Type" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right",
						children: "Actions"
					})
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: p.current.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "font-mono text-xs",
						children: a.id
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "font-medium",
						children: a.patientName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: a.doctorName }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "secondary",
						children: a.department
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm",
						children: a.date
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground",
						children: a.time
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "rounded-md bg-primary/10 px-2 py-1 text-xs font-mono text-primary",
						children: ["#", a.token]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "outline",
						children: a.type
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: a.status }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-right",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inline-flex items-center gap-1.5 justify-end",
							children: [
								canManage && a.status !== "Completed" && a.status !== "Cancelled" && a.status !== "Rejected" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									className: "gradient-primary text-white text-xs h-8 px-2.5 shadow-soft",
									onClick: () => handleStartConsultation(a),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stethoscope, { className: "mr-1 h-3.5 w-3.5" }), " Consult"]
								}),
								canManage && a.status === "Pending" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "icon",
									variant: "ghost",
									className: "h-8 w-8 text-success",
									title: "Approve",
									onClick: () => setStatusFor(a.id, "Approved"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "icon",
									variant: "ghost",
									className: "h-8 w-8 text-destructive",
									title: "Reject",
									onClick: () => setStatusFor(a.id, "Rejected"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
								})] }),
								a.status !== "Cancelled" && a.status !== "Completed" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "icon",
									variant: "ghost",
									className: "h-8 w-8",
									title: "Cancel",
									onClick: () => setStatusFor(a.id, "Cancelled"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, { className: "h-4 w-4" })
								})
							]
						})
					})
				] }, a.id)) })] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pager, { p })] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddAppointmentModal, {
			open: addModalOpen,
			onOpenChange: setAddModalOpen
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConsultationModal, {
			appointment: selectedApptForConsult,
			open: consultModalOpen,
			onOpenChange: setConsultModalOpen
		})
	] });
}
function Pager({ p }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 flex items-center justify-between text-sm text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
			"Page ",
			p.page,
			" of ",
			p.totalPages || 1,
			" · ",
			p.total,
			" results"
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "outline",
				onClick: p.prev,
				disabled: p.page === 1,
				children: "Prev"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "outline",
				onClick: p.next,
				disabled: p.page === p.totalPages || p.totalPages === 0,
				children: "Next"
			})]
		})]
	});
}
//#endregion
export { AppointmentsPage as component };

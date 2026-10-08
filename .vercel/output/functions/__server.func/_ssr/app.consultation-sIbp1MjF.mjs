import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useApp } from "./AppContext-UvazMoqe.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Button } from "./button-BLZ6ednA.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { T as Mail, b as Phone, g as Search, j as HeartPulse, n as Users, o as Trash2, q as CircleCheck, r as User, tt as Calendar, ut as Activity, v as Plus, w as MapPin, z as ExternalLink } from "../_libs/lucide-react.mjs";
import { S as useStorageData, g as getPatients, s as addPrescription } from "./storage-5gaUGoAc.mjs";
import { t as PageHeader } from "./PageHeader-BAvHonDt.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as StatusBadge } from "./StatusBadge-4Y7LwOPl.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { t as useForm } from "../_libs/react-hook-form.mjs";
import { t as AddPatientModal } from "./AddPatientModal-DngNbUeI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.consultation-sIbp1MjF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ConsultPage() {
	const { user } = useApp();
	const [patients] = useStorageData(getPatients);
	const [meds, setMeds] = (0, import_react.useState)([{
		name: "",
		dosage: "",
		freq: "",
		duration: ""
	}]);
	const [searchQ, setSearchQ] = (0, import_react.useState)("");
	const [patientId, setPatientId] = (0, import_react.useState)(patients[0]?.id || "");
	const [addPatientOpen, setAddPatientOpen] = (0, import_react.useState)(false);
	const { register, handleSubmit, reset } = useForm({ defaultValues: {
		symptoms: "",
		diagnosis: "",
		notes: "",
		followUp: ""
	} });
	const filteredPatients = patients.filter((p) => p.name.toLowerCase().includes(searchQ.toLowerCase()) || p.id.toLowerCase().includes(searchQ.toLowerCase()) || p.phone && p.phone.includes(searchQ));
	const selectedPatient = patients.find((x) => x.id === patientId || x.name === patientId);
	const submit = (data) => {
		if (!data.diagnosis) {
			toast.error("Please enter a diagnosis");
			return;
		}
		const doctorName = user?.name ? user.name.startsWith("Dr.") ? user.name : `Dr. ${user.name}` : "Dr. Medical Officer";
		addPrescription({
			patientId: selectedPatient ? selectedPatient.name : patientId || "Patient",
			doctorName,
			date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
			diagnosis: data.diagnosis,
			medicines: meds.filter((m) => m.name.trim() !== "").map((m) => ({
				name: m.name,
				dosage: m.dosage || "1 tablet",
				frequency: m.freq || "2x daily",
				duration: m.duration || "5 days"
			})),
			notes: data.notes || "Take medication after meals."
		});
		toast.success("Consultation saved & prescription issued successfully!");
		reset();
		setMeds([{
			name: "",
			dosage: "",
			freq: "",
			duration: ""
		}]);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Consultation & Diagnosis",
			description: "Select registered patients to review health details, record clinical descriptions, diagnosis and prescriptions.",
			crumbs: [{ label: "Consultation" }],
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				className: "gradient-primary text-white",
				onClick: () => setAddPatientOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 h-4 w-4" }), " Register New Patient"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-[380px_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-4 sm:p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center justify-between mb-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4 text-primary" }),
									" Registered Patients (",
									patients.length,
									")"
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "Search name, ID or phone...",
								value: searchQ,
								onChange: (e) => setSearchQ(e.target.value),
								className: "pl-8 text-xs h-9"
							})]
						}),
						patients.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl bg-muted/30 p-4 text-center text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium text-foreground mb-1",
									children: "No registered patients found"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-3",
									children: "Register a patient first to start consultation."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									className: "gradient-primary text-white text-xs",
									onClick: () => setAddPatientOpen(true),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 h-3 w-3" }), " Register Patient"]
								})
							]
						}) : filteredPatients.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "py-4 text-center text-xs text-muted-foreground",
							children: [
								"No matching patients for \"",
								searchQ,
								"\""
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "max-h-56 overflow-y-auto space-y-1.5 pr-1",
							children: filteredPatients.map((p) => {
								const isSelected = p.id === patientId;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setPatientId(p.id),
									className: `w-full text-left rounded-xl p-2.5 transition-all flex items-center justify-between border ${isSelected ? "bg-primary/10 border-primary shadow-soft text-foreground" : "border-border/50 hover:bg-muted/50"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2.5 min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold ${isSelected ? "gradient-primary text-white" : "bg-muted text-muted-foreground"}`,
											children: p.name.split(" ").map((n) => n[0]).slice(0, 2).join("")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "truncate text-xs font-semibold",
												children: p.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "truncate text-[10px] text-muted-foreground",
												children: [
													p.id,
													" · ",
													p.age,
													"y · ",
													p.bloodGroup
												]
											})]
										})]
									}), isSelected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-primary shrink-0 ml-1" })]
								}, p.id);
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-3.5 w-3.5 text-primary" }), " Patient Details Info"]
					}), selectedPatient ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center pt-2 border-t border-border/60",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mx-auto grid h-16 w-16 place-items-center rounded-full gradient-primary text-lg font-bold text-white shadow-glow",
										children: selectedPatient.name.split(" ").map((n) => n[0]).slice(0, 2).join("")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "mt-2 text-base font-bold",
										children: selectedPatient.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs font-mono text-muted-foreground",
										children: ["Patient ID: ", selectedPatient.id]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-2 flex justify-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: selectedPatient.status })
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 rounded-xl bg-muted/40 p-3 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between border-b border-border/40 pb-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted-foreground flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartPulse, { className: "h-3.5 w-3.5 text-primary" }), " Age / Gender"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-semibold",
											children: [
												selectedPatient.age,
												" yrs · ",
												selectedPatient.gender
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between border-b border-border/40 pb-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted-foreground flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-3.5 w-3.5 text-destructive" }), " Blood Group"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded bg-destructive/10 px-2 py-0.5 font-mono font-bold text-destructive",
											children: selectedPatient.bloodGroup
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between border-b border-border/40 pb-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted-foreground flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-3.5 w-3.5 text-primary" }), " Phone"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono",
											children: selectedPatient.phone
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between border-b border-border/40 pb-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted-foreground flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-3.5 w-3.5 text-primary" }), " Email"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "truncate max-w-[170px]",
											children: selectedPatient.email
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between border-b border-border/40 pb-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted-foreground flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5 text-primary" }), " Address"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "truncate max-w-[170px]",
											children: selectedPatient.address
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between pt-0.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted-foreground flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3.5 w-3.5 text-primary" }), " Last Visit"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: selectedPatient.lastVisit })]
									})
								]
							}),
							selectedPatient.condition && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl bg-primary/10 p-3 text-xs border border-primary/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold text-primary",
									children: "Condition / Chief Complaint:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-foreground",
									children: selectedPatient.condition
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/app/patients/$id",
								params: { id: selectedPatient.id },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									size: "sm",
									className: "w-full text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "mr-1 h-3.5 w-3.5" }), " Full Medical History & Profile"]
								})
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl bg-muted/30 p-5 text-center text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "mx-auto h-7 w-7 text-muted-foreground/50 mb-1.5" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium text-foreground",
								children: "No patient selected"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1",
								children: "Pick a patient from the registered list above."
							})
						]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "p-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit(submit),
					className: "space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "font-semibold text-sm",
							children: "Patient Symptoms & History Notes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							rows: 3,
							placeholder: "Describe patient reported symptoms, chief complaints, temperature, blood pressure, duration of illness…",
							...register("symptoms"),
							className: "mt-1.5"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "font-semibold text-sm",
							children: "Primary Diagnosis *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "Enter clinical diagnosis (e.g. Acute Bronchitis, Type 2 Diabetes, Hypertension Stage 1)",
							...register("diagnosis", { required: true }),
							required: true,
							className: "mt-1.5"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "font-semibold text-sm",
								children: "Prescription & Medication Schedule"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								size: "sm",
								variant: "outline",
								onClick: () => setMeds((m) => [...m, {
									name: "",
									dosage: "1 tablet",
									freq: "2x daily",
									duration: "5 days"
								}]),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 h-3.5 w-3.5" }), " Add Medicine"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2",
							children: meds.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-12 items-center gap-2 rounded-lg border p-2 bg-muted/20",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "col-span-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											placeholder: "Medicine name",
											value: m.name,
											onChange: (e) => setMeds((x) => x.map((y, j) => j === i ? {
												...y,
												name: e.target.value
											} : y))
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "col-span-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											placeholder: "Dosage (e.g. 500mg)",
											value: m.dosage,
											onChange: (e) => setMeds((x) => x.map((y, j) => j === i ? {
												...y,
												dosage: e.target.value
											} : y))
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "col-span-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											placeholder: "Freq (3x daily)",
											value: m.freq,
											onChange: (e) => setMeds((x) => x.map((y, j) => j === i ? {
												...y,
												freq: e.target.value
											} : y))
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "col-span-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											placeholder: "Duration (5 days)",
											value: m.duration,
											onChange: (e) => setMeds((x) => x.map((y, j) => j === i ? {
												...y,
												duration: e.target.value
											} : y))
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "col-span-1 text-right",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "icon",
											variant: "ghost",
											type: "button",
											onClick: () => setMeds((x) => x.filter((_, j) => j !== i)),
											disabled: meds.length === 1,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 text-destructive" })
										})
									})
								]
							}, i))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "font-semibold text-sm",
							children: "Doctor's Clinical Description & Advice"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							rows: 3,
							placeholder: "Dietary recommendations, rest, lifestyle changes, special clinical instructions…",
							...register("notes"),
							className: "mt-1.5"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid sm:grid-cols-2 gap-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "font-semibold text-sm",
								children: "Recommended Follow-up Date"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "date",
								...register("followUp"),
								className: "mt-1.5"
							})] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-end gap-3 pt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: "gradient-primary text-white shadow-soft",
								children: "Save Consultation & Issue Prescription"
							})
						})
					]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddPatientModal, {
			open: addPatientOpen,
			onOpenChange: setAddPatientOpen
		})
	] });
}
//#endregion
export { ConsultPage as component };

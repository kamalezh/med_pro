import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useApp } from "./AppContext-UvazMoqe.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Button } from "./button-BLZ6ednA.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { L as Eye, g as Search, n as Users, o as Trash2, v as Plus } from "../_libs/lucide-react.mjs";
import { S as useStorageData, d as getAppointments, g as getPatients, l as deletePatient } from "./storage-5gaUGoAc.mjs";
import { t as PageHeader } from "./PageHeader-BAvHonDt.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
import { t as EmptyState } from "./EmptyState-yxIRwAHL.mjs";
import { t as StatusBadge } from "./StatusBadge-4Y7LwOPl.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
import { t as usePagination } from "./usePagination-qbXCEir3.mjs";
import { t as AddPatientModal } from "./AddPatientModal-DngNbUeI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.patients-DI1BeLhr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PatientsPage() {
	const { user } = useApp();
	const [q, setQ] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("all");
	const [addModalOpen, setAddModalOpen] = (0, import_react.useState)(false);
	const [items] = useStorageData(getPatients);
	const [appointments] = useStorageData(getAppointments);
	const isDoctor = user?.role === "doctor";
	const assignedCamp = user?.department || (typeof window !== "undefined" ? localStorage.getItem("mcm_doctor_assigned_camp") : "") || "";
	const campPatientSet = (0, import_react.useMemo)(() => {
		if (!isDoctor || !assignedCamp) return null;
		const campLow = assignedCamp.toLowerCase();
		const docNameLow = (user?.name || "").toLowerCase();
		const campAppts = appointments.filter((a) => {
			const aDept = (a.department || "").toLowerCase();
			const aReason = (a.reason || "").toLowerCase();
			const aDocLow = (a.doctorName || "").toLowerCase();
			return aDept.includes(campLow) || campLow.includes(aDept) || aReason.includes(campLow) || aDocLow.includes(docNameLow) || a.doctorId === user?.id;
		});
		const set = /* @__PURE__ */ new Set();
		campAppts.forEach((a) => {
			if (a.patientId) set.add(a.patientId.toLowerCase());
			if (a.patientName) set.add(a.patientName.toLowerCase());
			if (a.patientEmail) set.add(a.patientEmail.toLowerCase());
		});
		return set;
	}, [
		appointments,
		isDoctor,
		assignedCamp,
		user
	]);
	const filtered = (0, import_react.useMemo)(() => items.filter((p) => {
		if (isDoctor && campPatientSet) {
			const pId = p.id.toLowerCase();
			const pName = p.name.toLowerCase();
			const pEmail = (p.email || "").toLowerCase();
			const pCond = (p.condition || "").toLowerCase();
			const campLow = (assignedCamp || "").toLowerCase();
			if (!(campPatientSet.has(pId) || campPatientSet.has(pName) || pEmail && campPatientSet.has(pEmail) || pCond.includes(campLow))) return false;
		}
		return (status === "all" || p.status === status) && (p.name.toLowerCase().includes(q.toLowerCase()) || p.id.toLowerCase().includes(q.toLowerCase()));
	}), [
		items,
		q,
		status,
		isDoctor,
		campPatientSet,
		assignedCamp
	]);
	const p = usePagination(filtered, 10);
	const handleDelete = (id, name) => {
		deletePatient(id);
		toast.success(`Patient "${name}" deleted`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Patients",
			description: isDoctor && assignedCamp ? `Patients registered & queued for ${assignedCamp}` : `${items.length} registered patients`,
			crumbs: [{ label: "Patients" }],
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				className: "gradient-primary text-white",
				onClick: () => setAddModalOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 h-4 w-4" }), " Add Patient"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-4 sm:p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:flex-wrap",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative min-w-0 sm:w-72",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Search name or ID…",
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
							children: "All Statuses"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "Active",
							children: "Active"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "Inactive",
							children: "Inactive"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "Critical",
							children: "Critical"
						})
					] })]
				})]
			}), filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: Users,
				title: items.length === 0 ? "No patients registered yet" : "No matching patients found",
				description: items.length === 0 ? "Click the button below to register your first patient." : "Try adjusting your search query or filter.",
				action: items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "gradient-primary text-white",
					onClick: () => setAddModalOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 h-4 w-4" }), " Add Patient"]
				}) : void 0
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto rounded-xl border border-border/60",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "ID" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Name" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Age" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Gender" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Blood" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Contact" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Last Visit" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right",
						children: "Actions"
					})
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: p.current.map((pt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "font-mono text-xs",
						children: pt.id
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-8 w-8 place-items-center rounded-full gradient-primary text-xs font-bold text-white",
							children: pt.name.split(" ").map((n) => n[0]).slice(0, 2).join("")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: pt.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: pt.email
						})] })]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: pt.age }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: pt.gender }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-md bg-destructive/10 px-2 py-0.5 text-xs font-mono text-destructive",
						children: pt.bloodGroup
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-xs",
						children: pt.phone
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-xs",
						children: pt.lastVisit
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: pt.status }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-right",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inline-flex gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/app/patients/$id",
								params: { id: pt.id },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "icon",
									variant: "ghost",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								onClick: () => handleDelete(pt.id, pt.name),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 text-destructive" })
							})]
						})
					})
				] }, pt.id)) })] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
			})] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddPatientModal, {
			open: addModalOpen,
			onOpenChange: setAddModalOpen
		})
	] });
}
//#endregion
export { PatientsPage as component };

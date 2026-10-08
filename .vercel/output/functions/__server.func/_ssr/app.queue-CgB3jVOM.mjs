import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-BLZ6ednA.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { D as ListOrdered, Q as Check, _ as QrCode, f as SkipForward } from "../_libs/lucide-react.mjs";
import { S as useStorageData, g as getPatients, x as savePatients } from "./storage-5gaUGoAc.mjs";
import { t as PageHeader } from "./PageHeader-BAvHonDt.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as EmptyState } from "./EmptyState-yxIRwAHL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.queue-CgB3jVOM.js
var import_jsx_runtime = require_jsx_runtime();
function QueuePage() {
	const [patients] = useStorageData(getPatients);
	const queue = patients.map((p, i) => ({
		...p,
		token: i + 1
	}));
	const done = (id, name) => {
		savePatients(patients.filter((x) => x.id !== id));
		toast.success(`Served patient "${name}"`);
	};
	const skip = (id) => {
		toast.info("Patient moved down in queue");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Queue Management",
		description: "Live patient queue for active camp/clinic.",
		crumbs: [{ label: "Queue" }],
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "outline",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "mr-1 h-4 w-4" }), " Scan patient QR"]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "p-4 sm:p-6",
		children: queue.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: ListOrdered,
			title: "Queue clear — no active patients in queue",
			description: "Register a patient or schedule an appointment to populate the queue."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: queue.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-4 rounded-xl border border-border/60 p-4 hover:bg-muted/30",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `grid h-12 w-12 shrink-0 place-items-center rounded-xl text-lg font-bold ${i === 0 ? "gradient-primary text-white shadow-glow" : "bg-muted text-foreground"}`,
						children: p.token
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate font-medium",
							children: p.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "truncate text-xs text-muted-foreground",
							children: [
								p.condition || "General Consultation",
								" · ",
								p.age,
								"y"
							]
						})]
					}),
					i === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-success/15 px-3 py-1 text-xs font-medium text-success animate-pulse",
						children: "Now serving"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon",
							variant: "ghost",
							title: "Skip / Move down",
							onClick: () => skip(p.id),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipForward, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon",
							className: "gradient-primary text-white",
							title: "Mark complete",
							onClick: () => done(p.id, p.name),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
						})]
					})
				]
			}, p.id))
		})
	})] });
}
//#endregion
export { QueuePage as component };

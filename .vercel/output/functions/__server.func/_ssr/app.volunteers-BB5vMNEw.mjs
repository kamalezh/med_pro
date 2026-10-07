import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-BLZ6ednA.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { v as Plus } from "../_libs/lucide-react.mjs";
import { t as PageHeader } from "./PageHeader-BAvHonDt.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
import { t as StatusBadge } from "./StatusBadge-4Y7LwOPl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.volunteers-BB5vMNEw.js
var import_jsx_runtime = require_jsx_runtime();
var volunteers = Array.from({ length: 14 }, (_, i) => ({
	id: `V${100 + i}`,
	name: [
		"Emma Wilson",
		"Liam Turner",
		"Ava Martinez",
		"Noah Green",
		"Sophia Kim",
		"Ethan Brooks",
		"Mia Patel",
		"Lucas Diaz",
		"Isabella Chen",
		"Aiden Ross",
		"Harper Ali",
		"Mason Reed",
		"Charlotte Nu",
		"Elijah Vaz"
	][i],
	email: `vol${i + 1}@med.com`,
	phone: `+1 555-33${String(10 + i).padStart(2, "0")}`,
	camps: i % 4 + 1,
	hours: 20 + i * 3,
	status: [
		"Active",
		"Active",
		"On Leave",
		"Active"
	][i % 4]
}));
function VolunteersPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Volunteers",
		description: `${volunteers.length} volunteers`,
		crumbs: [{ label: "Volunteers" }],
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			className: "gradient-primary text-white",
			onClick: () => toast.success("Invite sent"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 h-4 w-4" }), " Add Volunteer"]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "p-4 sm:p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto rounded-xl border border-border/60",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "ID" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Name" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Email" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Phone" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Camps" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Hours" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" })
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: volunteers.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-mono text-xs",
					children: v.id
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-medium",
					children: v.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: v.email }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: v.phone }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: v.camps }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, { children: [v.hours, "h"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: v.status }) })
			] }, v.id)) })] })
		})
	})] });
}
//#endregion
export { VolunteersPage as component };

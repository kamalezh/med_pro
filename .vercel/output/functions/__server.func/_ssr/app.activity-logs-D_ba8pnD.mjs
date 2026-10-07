import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { ut as Activity } from "../_libs/lucide-react.mjs";
import { l as getActivityLogs, x as useStorageData } from "./storage-D8YOCuo1.mjs";
import { t as PageHeader } from "./PageHeader-BAvHonDt.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
import { t as EmptyState } from "./EmptyState-yxIRwAHL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.activity-logs-D_ba8pnD.js
var import_jsx_runtime = require_jsx_runtime();
function LogsPage() {
	const [activityLogs] = useStorageData(getActivityLogs);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Activity Logs",
		description: "System-wide audit trail for actions.",
		crumbs: [{ label: "Activity" }]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "p-4 sm:p-6",
		children: activityLogs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: Activity,
			title: "No activity recorded yet",
			description: "Actions performed in the application will automatically appear in this audit log."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto rounded-xl border border-border/60",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "ID" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "User" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Action" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Target" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Time" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "IP" })
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: activityLogs.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-mono text-xs",
					children: l.id
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-medium",
					children: l.user
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "secondary",
					children: l.action
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: l.target }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "text-xs text-muted-foreground",
					children: l.time
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-mono text-xs",
					children: l.ip
				})
			] }, l.id)) })] })
		})
	})] });
}
//#endregion
export { LogsPage as component };

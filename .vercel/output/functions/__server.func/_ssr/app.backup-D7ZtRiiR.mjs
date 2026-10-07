import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-BLZ6ednA.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { B as Download, H as Database, M as HardDrive, U as Clock } from "../_libs/lucide-react.mjs";
import { t as PageHeader } from "./PageHeader-BAvHonDt.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as StatCard } from "./StatCard-BEHM0qq2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.backup-D7ZtRiiR.js
var import_jsx_runtime = require_jsx_runtime();
function BackupPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Backup",
			description: "Automated backups and disaster recovery.",
			crumbs: [{ label: "Backup" }],
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				className: "gradient-primary text-white",
				onClick: () => toast.success("Backup started"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "mr-1 h-4 w-4" }), " Backup now"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 grid gap-4 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Last backup",
					value: "4h ago",
					icon: Clock,
					tone: "success"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Storage used",
					value: "18.4 GB",
					icon: HardDrive,
					tone: "primary"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Retention",
					value: "30 days",
					icon: Database,
					tone: "warning"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mb-4 font-semibold",
				children: "Recent backups"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: [
					{
						id: "B1",
						date: "2026-01-20 03:00",
						size: "2.4 GB",
						type: "Full"
					},
					{
						id: "B2",
						date: "2026-01-19 03:00",
						size: "1.1 GB",
						type: "Incremental"
					},
					{
						id: "B3",
						date: "2026-01-18 03:00",
						size: "1.2 GB",
						type: "Incremental"
					},
					{
						id: "B4",
						date: "2026-01-17 03:00",
						size: "2.3 GB",
						type: "Full"
					}
				].map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between rounded-xl border border-border/60 p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: b.date
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								b.type,
								" · ",
								b.size
							]
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: () => toast.success("Downloading…"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "mr-1 h-4 w-4" }), " Restore"]
					})]
				}, b.id))
			})]
		})
	] });
}
//#endregion
export { BackupPage as component };

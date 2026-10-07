import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as MapPin, l as Tent, n as Users } from "../_libs/lucide-react.mjs";
import { t as PageHeader } from "./PageHeader-BAvHonDt.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { S as useStorageData, f as getCamps } from "./storage-MMnSl_7q.mjs";
import { t as EmptyState } from "./EmptyState-yxIRwAHL.mjs";
import { t as StatusBadge } from "./StatusBadge-4Y7LwOPl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.assigned-camps-D4E__Qc6.js
var import_jsx_runtime = require_jsx_runtime();
function AssignedCamps() {
	const [camps] = useStorageData(getCamps);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Assigned Camps",
		description: "Camps assigned to your care schedule.",
		crumbs: [{ label: "Assigned Camps" }]
	}), camps.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: Tent,
		title: "No assigned camps yet",
		description: "Camps assigned to you will appear here."
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-4 lg:grid-cols-2",
		children: camps.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-5 hover-lift",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold",
						children: c.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "mr-1 inline h-3 w-3" }), c.location]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: [
							c.date,
							" — ",
							c.endDate
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 flex items-center gap-1 text-xs text-primary",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-3 w-3" }),
							" ",
							c.registered,
							" registered"
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: c.status })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/app/camps/$id",
					params: { id: c.id },
					className: "flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						className: "w-full",
						children: "Details"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/app/queue",
					className: "flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						className: "w-full gradient-primary text-white",
						children: "Manage queue"
					})
				})]
			})]
		}, c.id))
	})] });
}
//#endregion
export { AssignedCamps as component };

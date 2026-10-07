import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-BLZ6ednA.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { F as FileText, I as FileSpreadsheet, V as DollarSign, l as Stethoscope, n as Users, s as Tent } from "../_libs/lucide-react.mjs";
import { t as PageHeader } from "./PageHeader-BAvHonDt.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CCJRliUM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.reports-Dt90t_Dq.js
var import_jsx_runtime = require_jsx_runtime();
var cats = [
	{
		key: "patients",
		label: "Patient Reports",
		icon: Users,
		items: [
			"New patients this month",
			"Active vs inactive",
			"Critical patients",
			"Demographics breakdown"
		]
	},
	{
		key: "doctors",
		label: "Doctor Reports",
		icon: Stethoscope,
		items: [
			"Consultation load",
			"Top performing doctors",
			"Availability trends",
			"Department utilization"
		]
	},
	{
		key: "camps",
		label: "Camp Reports",
		icon: Tent,
		items: [
			"Registration vs attendance",
			"Camp outcomes",
			"Volunteer hours",
			"Locations covered"
		]
	},
	{
		key: "revenue",
		label: "Revenue Reports",
		icon: DollarSign,
		items: [
			"Monthly revenue",
			"Revenue by department",
			"Outstanding payments",
			"Insurance breakdown"
		]
	}
];
function ReportsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Reports",
		description: "Export analytics and operational reports.",
		crumbs: [{ label: "Reports" }],
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				onClick: () => toast.success("PDF exported"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "mr-1 h-4 w-4" }), " Export PDF"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				className: "gradient-primary text-white",
				onClick: () => toast.success("Excel exported"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "mr-1 h-4 w-4" }), " Export Excel"]
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
		defaultValue: "patients",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsList, { children: cats.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
			value: c.key,
			children: c.label
		}, c.key)) }), cats.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
			value: c.key,
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: c.items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "p-5 hover-lift",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(c.icon, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold",
									children: i
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: "Auto-generated · updated hourly"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => toast.success("Downloaded"),
								children: "Download"
							})
						]
					})
				}, i))
			})
		}, c.key))]
	})] });
}
//#endregion
export { ReportsPage as component };

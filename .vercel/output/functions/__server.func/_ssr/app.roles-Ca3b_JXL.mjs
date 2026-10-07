import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { d as Stethoscope, g as ShieldCheck, r as User } from "../_libs/lucide-react.mjs";
import { t as PageHeader } from "./PageHeader-BAvHonDt.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as Switch } from "./switch-Cn1w-cIH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.roles-Ca3b_JXL.js
var import_jsx_runtime = require_jsx_runtime();
var perms = [
	"View patients",
	"Edit patients",
	"Manage appointments",
	"View reports",
	"Manage camps",
	"Manage users",
	"Access analytics",
	"Configure settings"
];
var roles = [
	{
		key: "admin",
		label: "Administrator",
		icon: ShieldCheck,
		defaults: perms.map(() => true)
	},
	{
		key: "doctor",
		label: "Doctor",
		icon: Stethoscope,
		defaults: [
			true,
			true,
			true,
			true,
			false,
			false,
			false,
			false
		]
	},
	{
		key: "patient",
		label: "Patient",
		icon: User,
		defaults: [
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false
		]
	}
];
function RolesPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Role Management",
		description: "Configure permissions per role.",
		crumbs: [{ label: "Roles" }]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-4 lg:grid-cols-2",
		children: roles.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-10 w-10 place-items-center rounded-xl gradient-primary text-white",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(r.icon, { className: "h-5 w-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-semibold",
					children: r.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: [
						r.defaults.filter(Boolean).length,
						" of ",
						perms.length,
						" permissions"
					]
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: perms.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between rounded-lg bg-muted/30 px-3 py-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, { defaultChecked: r.defaults[i] })]
				}, p))
			})]
		}, r.key))
	})] });
}
//#endregion
export { RolesPage as component };

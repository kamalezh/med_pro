import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/StatCard-BEHM0qq2.js
var import_jsx_runtime = require_jsx_runtime();
var toneClass = {
	primary: "from-primary/15 to-primary-glow/10 text-primary",
	success: "from-success/15 to-success/5 text-success",
	warning: "from-warning/20 to-warning/5 text-warning",
	destructive: "from-destructive/15 to-destructive/5 text-destructive"
};
function StatCard({ label, value, delta, icon: Icon, tone = "primary", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: cn("relative overflow-hidden border-border/60 p-5 hover-lift shadow-soft bg-card/80", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("absolute inset-0 bg-gradient-to-br opacity-70 pointer-events-none", toneClass[tone].split(" ").slice(0, 2).join(" ")) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex items-start justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-wider text-muted-foreground",
					children: label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-3xl font-bold tracking-tight",
					children: value
				}),
				delta && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-success",
					children: delta
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-background/70 backdrop-blur", toneClass[tone].split(" ").slice(-1)[0]),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-6 w-6" })
			})]
		})]
	});
}
//#endregion
export { StatCard as t };

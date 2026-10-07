import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { Y as ChevronRight, k as House } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/PageHeader-BAvHonDt.js
var import_jsx_runtime = require_jsx_runtime();
function PageHeader({ title, description, crumbs, actions }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6 animate-fade-in-up",
		children: [crumbs && crumbs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "mb-2 flex items-center gap-1 text-xs text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/app",
				className: "flex items-center gap-1 hover:text-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "h-3 w-3" })
			}), crumbs.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3 w-3" }), c.to ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: c.to,
					className: "hover:text-foreground",
					children: c.label
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-foreground",
					children: c.label
				})]
			}, i))]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:flex-wrap sm:items-center sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "truncate text-2xl font-bold tracking-tight sm:text-3xl",
					children: title
				}), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: description
				})]
			}), actions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex shrink-0 items-center gap-2",
				children: actions
			})]
		})]
	});
}
//#endregion
export { PageHeader as t };

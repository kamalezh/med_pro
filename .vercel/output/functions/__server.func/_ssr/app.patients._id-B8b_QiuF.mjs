import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.patients._id-B8b_QiuF.js
var import_jsx_runtime = require_jsx_runtime();
var SplitNotFoundComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "p-12 text-center text-muted-foreground",
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "text-lg font-semibold mb-2",
			children: "Patient not found"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-4",
			children: "The patient record you are looking for does not exist or has been removed."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/app/patients",
			className: "text-primary hover:underline",
			children: "Back to Patients List"
		})
	]
});
//#endregion
export { SplitNotFoundComponent as notFoundComponent };

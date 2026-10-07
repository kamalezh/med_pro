import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/StatusBadge-4Y7LwOPl.js
var import_jsx_runtime = require_jsx_runtime();
var map = {
	Active: "bg-success/15 text-success border-success/20",
	Available: "bg-success/15 text-success border-success/20",
	Approved: "bg-success/15 text-success border-success/20",
	Completed: "bg-primary/15 text-primary border-primary/20",
	Upcoming: "bg-primary/15 text-primary border-primary/20",
	Ongoing: "bg-warning/20 text-warning-foreground border-warning/20",
	Pending: "bg-warning/20 text-warning-foreground border-warning/20",
	"In Progress": "bg-warning/20 text-warning-foreground border-warning/20",
	"In Surgery": "bg-warning/20 text-warning-foreground border-warning/20",
	Inactive: "bg-muted text-muted-foreground border-border",
	"On Leave": "bg-muted text-muted-foreground border-border",
	Cancelled: "bg-destructive/15 text-destructive border-destructive/20",
	Rejected: "bg-destructive/15 text-destructive border-destructive/20",
	Critical: "bg-destructive/15 text-destructive border-destructive/20"
};
function StatusBadge({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: "outline",
		className: cn("font-medium", map[status] ?? "bg-muted text-muted-foreground"),
		children: status
	});
}
//#endregion
export { StatusBadge as t };

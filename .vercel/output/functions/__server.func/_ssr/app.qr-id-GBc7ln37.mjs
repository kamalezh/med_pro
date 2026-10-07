import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useApp } from "./AppContext-UvazMoqe.mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { H as Download, _ as Share2 } from "../_libs/lucide-react.mjs";
import { t as PageHeader } from "./PageHeader-BAvHonDt.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as QRCodeSVG } from "../_libs/qrcode.react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.qr-id-GBc7ln37.js
var import_jsx_runtime = require_jsx_runtime();
function QrID() {
	const { user } = useApp();
	if (!user) return null;
	const payload = JSON.stringify({
		id: user.id,
		name: user.name,
		email: user.email,
		role: user.role
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Patient QR ID",
		description: "Show this at any camp or reception for instant check-in.",
		crumbs: [{ label: "QR ID" }]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "mx-auto max-w-md p-8 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto grid h-64 w-64 place-items-center rounded-2xl bg-white p-4 shadow-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QRCodeSVG, {
					value: payload,
					size: 224,
					level: "H"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-6 text-xl font-semibold",
				children: user.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted-foreground",
				children: ["Patient ID · ", user.id]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: user.email
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex justify-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					onClick: () => toast.success("QR downloaded"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "mr-1 h-4 w-4" }), " Download"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "gradient-primary text-white",
					onClick: () => toast.success("Share link copied"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "mr-1 h-4 w-4" }), " Share"]
				})]
			})
		]
	})] });
}
//#endregion
export { QrID as component };

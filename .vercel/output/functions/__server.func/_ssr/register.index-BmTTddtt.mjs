import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as Stethoscope, lt as ArrowLeft, m as ShieldCheck, r as User, ut as Activity } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/register.index-BmTTddtt.js
var import_jsx_runtime = require_jsx_runtime();
var roles = [
	{
		key: "patient",
		label: "Patient",
		desc: "Book appointments, view reports and register for camps.",
		icon: User,
		to: "/register/patient"
	},
	{
		key: "doctor",
		label: "Doctor",
		desc: "Manage consultations, queues and camp schedules.",
		icon: Stethoscope,
		to: "/register/doctor"
	},
	{
		key: "admin",
		label: "Administrator",
		desc: "Oversee the hospital, staff, camps and reports.",
		icon: ShieldCheck,
		to: "/register/admin"
	}
];
function RegisterRolePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-h-screen mesh-bg lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative hidden overflow-hidden gradient-hero p-12 text-white lg:flex lg:flex-col lg:justify-between",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-2 text-white",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-9 w-9 place-items-center rounded-xl bg-white/20 backdrop-blur",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-lg font-bold",
						children: "MediCamp"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-5xl font-extrabold leading-tight",
					children: "Join MediCamp."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-md text-lg text-white/85",
					children: "Create your account to access camps, appointments and enterprise healthcare tools."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-white/70",
					children: "© 2026 MediCamp Health Systems"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -right-16 -top-16 h-96 w-96 rounded-full bg-white/10 blur-3xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-secondary/40 blur-3xl" })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center justify-center p-6 sm:p-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-md animate-fade-in-up",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground lg:hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back to home"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl font-bold tracking-tight",
						children: "Choose your role"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Pick the account type you want to create."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 grid gap-3",
						children: roles.map((r) => {
							const Icon = r.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: r.to,
								className: "glass group flex items-center gap-4 rounded-2xl p-4 text-left transition-all hover:shadow-glow hover:border-primary/40",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-12 w-12 shrink-0 place-items-center rounded-xl gradient-primary text-white shadow-soft",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold",
										children: r.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-xs text-muted-foreground",
										children: r.desc
									})]
								})]
							}, r.key);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-6 text-center text-sm text-muted-foreground",
						children: [
							"Already have an account?",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								className: "text-primary hover:underline",
								children: "Sign in"
							})
						]
					})
				]
			})
		})]
	});
}
//#endregion
export { RegisterRolePage as component };

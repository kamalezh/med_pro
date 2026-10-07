import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { E as MapPin, F as HandHeart, d as Stethoscope, n as Users, rt as Calendar } from "../_libs/lucide-react.mjs";
import { t as PageHeader } from "./PageHeader-BAvHonDt.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { b as saveCamps, f as getCamps, p as getDoctors } from "./storage-MMnSl_7q.mjs";
import { t as StatusBadge } from "./StatusBadge-4Y7LwOPl.mjs";
import { t as Route } from "./app.camps._id-XzEIEiN9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.camps._id-CwCgrmgX.js
var import_jsx_runtime = require_jsx_runtime();
function CampDetail() {
	const { camp } = Route.useLoaderData();
	const assignedDocs = getDoctors().filter((d) => camp.doctorsAssigned?.includes(d.id));
	const handleRegister = () => {
		saveCamps(getCamps().map((c) => {
			if (c.id === camp.id) return {
				...c,
				registered: c.registered + 1
			};
			return c;
		}));
		toast.success(`Registered for ${camp.name}!`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: camp.name,
		crumbs: [{
			label: "Camps",
			to: "/app/camps"
		}, { label: camp.name }],
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className: "gradient-primary text-white",
			onClick: handleRegister,
			children: "Register for Camp"
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "lg:col-span-2 overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-48 gradient-hero" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: camp.status }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1 text-sm text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-4 w-4 shrink-0" }),
									camp.date,
									" — ",
									camp.endDate
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1 text-sm text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 shrink-0" }), camp.location]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 text-xl font-semibold",
						children: "About this camp"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: camp.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-6 font-semibold",
						children: "Services offered"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 flex flex-wrap gap-2",
						children: camp.services?.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground",
							children: s
						}, s))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-6 font-semibold",
						children: "Assigned doctors"
					}),
					assignedDocs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: "No doctors assigned yet."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 grid gap-3 sm:grid-cols-2",
						children: assignedDocs.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 rounded-xl border border-border/60 p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-10 w-10 place-items-center rounded-full gradient-primary text-sm font-bold text-white",
								children: d.name.replace("Dr. ", "").split(" ").map((n) => n[0]).slice(0, 2).join("")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm font-medium",
									children: d.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-xs text-muted-foreground",
									children: d.department
								})]
							})]
						}, d.id))
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-widest text-muted-foreground",
						children: "Registration"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-3xl font-bold",
						children: [camp.registered, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-base text-muted-foreground",
							children: ["/", camp.capacity || 200]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 h-2 w-full overflow-hidden rounded-full bg-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full gradient-primary",
							style: { width: `${Math.min(100, camp.registered / (camp.capacity || 1) * 100)}%` }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid grid-cols-3 gap-3 text-center text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg bg-muted/50 p-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "mx-auto h-4 w-4 text-primary" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 font-bold",
										children: camp.registered
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-muted-foreground",
										children: "Patients"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg bg-muted/50 p-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stethoscope, { className: "mx-auto h-4 w-4 text-primary" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 font-bold",
										children: camp.doctorsAssigned?.length || 0
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-muted-foreground",
										children: "Doctors"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg bg-muted/50 p-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HandHeart, { className: "mx-auto h-4 w-4 text-primary" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 font-bold",
										children: camp.volunteersAssigned?.length || 0
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-muted-foreground",
										children: "Volunteers"
									})
								]
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold",
						children: "Need help?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: "Call our camp coordinator for questions."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						className: "mt-3 w-full",
						children: "+1 (555) 010-2030"
					})
				]
			})]
		})]
	})] });
}
//#endregion
export { CampDetail as component };

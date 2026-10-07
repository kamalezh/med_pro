import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useApp, t as AppProvider } from "./AppContext-UvazMoqe.mjs";
import { t as Button } from "./button-BkEeRci-.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { E as MapPin, Y as CircleCheck, b as Plus, l as Tent, n as Users, o as UserCheck, v as Search } from "../_libs/lucide-react.mjs";
import { t as PageHeader } from "./PageHeader-BAvHonDt.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { S as useStorageData, b as saveCamps, f as getCamps, n as addCamp } from "./storage-MMnSl_7q.mjs";
import { t as EmptyState } from "./EmptyState-yxIRwAHL.mjs";
import { t as StatusBadge } from "./StatusBadge-4Y7LwOPl.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./dialog-CzUx__WV.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
import { t as Route$34 } from "./app.camps._id-XzEIEiN9.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CCJRliUM.mjs";
import { t as Route$35 } from "./app.patients._id-XP6Vf0Xk.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-FXHjKqhx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-DphI8FcL.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	window.__lovableReportRuntimeError?.({
		message,
		stack: error instanceof Error ? error.stack : void 0,
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-screen place-items-center mesh-bg px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass max-w-md rounded-2xl p-10 text-center shadow-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-6xl font-bold gradient-text",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 text-xl font-semibold",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mt-6 inline-flex rounded-md gradient-primary px-4 py-2 text-sm font-medium text-white shadow-soft",
					children: "Go home"
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-screen place-items-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass max-w-md rounded-2xl p-10 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong. Try refreshing."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "rounded-md gradient-primary px-4 py-2 text-sm font-medium text-white",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "rounded-md border border-input px-4 py-2 text-sm font-medium",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$33 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "MediCamp — Enterprise Medical Camp Management" },
			{
				name: "description",
				content: "Run medical camps, hospital appointments and patient care from one premium platform. Trusted by leading healthcare organizations."
			},
			{
				name: "author",
				content: "MediCamp"
			},
			{
				property: "og:title",
				content: "MediCamp — Enterprise Medical Camp Management"
			},
			{
				property: "og:description",
				content: "Run medical camps, hospital appointments and patient care from one premium platform. Trusted by leading healthcare organizations."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: "MediCamp — Enterprise Medical Camp Management"
			},
			{
				name: "twitter:description",
				content: "Run medical camps, hospital appointments and patient care from one premium platform. Trusted by leading healthcare organizations."
			},
			{
				property: "og:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fd4089f5-fe8b-448a-991e-5246546c82ea/id-preview-4f6042fe--61e2fa60-89d0-47e4-a92b-ba5e9825ecad.lovable.app-1784346606850.png"
			},
			{
				name: "twitter:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fd4089f5-fe8b-448a-991e-5246546c82ea/id-preview-4f6042fe--61e2fa60-89d0-47e4-a92b-ba5e9825ecad.lovable.app-1784346606850.png"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: ""
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$33.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
			position: "top-right",
			richColors: true,
			closeButton: true
		})] })
	});
}
var $$splitComponentImporter$31 = () => import("./routes-DkqsZNO2.mjs");
var Route$32 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "MediCamp — Enterprise Medical Camp Management" },
		{
			name: "description",
			content: "Run medical camps, hospital appointments and patient care from one premium platform. Trusted by leading healthcare organizations."
		},
		{
			property: "og:title",
			content: "MediCamp — Enterprise Medical Camp Management"
		},
		{
			property: "og:description",
			content: "Run medical camps, hospital appointments and patient care from one premium platform. Trusted by leading healthcare organizations."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$31, "component")
});
var $$splitComponentImporter$30 = () => import("./app-CUo33yM1.mjs");
var Route$31 = createFileRoute("/app")({
	head: () => ({ meta: [{ title: "Dashboard — MediCamp" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$30, "component")
});
var $$splitComponentImporter$29 = () => import("./login-CUUUkitV.mjs");
var Route$30 = createFileRoute("/login")({
	head: () => ({ meta: [{ title: "Sign in — MediCamp" }, {
		name: "description",
		content: "Sign in as patient, doctor, volunteer or administrator."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$29, "component")
});
var $$splitComponentImporter$28 = () => import("./app.index-D_ZNlqsN.mjs");
var Route$29 = createFileRoute("/app/")({ component: lazyRouteComponent($$splitComponentImporter$28, "component") });
var $$splitComponentImporter$27 = () => import("./app.activity-logs-DMjpg8GS.mjs");
var Route$28 = createFileRoute("/app/activity-logs")({ component: lazyRouteComponent($$splitComponentImporter$27, "component") });
var $$splitComponentImporter$26 = () => import("./app.analytics-w3hrvK4B.mjs");
var Route$27 = createFileRoute("/app/analytics")({ component: lazyRouteComponent($$splitComponentImporter$26, "component") });
var $$splitComponentImporter$25 = () => import("./app.appointments-F8_2dCc6.mjs");
var Route$26 = createFileRoute("/app/appointments")({ component: lazyRouteComponent($$splitComponentImporter$25, "component") });
var $$splitComponentImporter$24 = () => import("./app.assigned-camps-D4E__Qc6.mjs");
var Route$25 = createFileRoute("/app/assigned-camps")({ component: lazyRouteComponent($$splitComponentImporter$24, "component") });
var $$splitComponentImporter$23 = () => import("./app.attendance-Wvs2A-aD.mjs");
var Route$24 = createFileRoute("/app/attendance")({ component: lazyRouteComponent($$splitComponentImporter$23, "component") });
var $$splitComponentImporter$22 = () => import("./app.backup-DZD3ThHI.mjs");
var Route$23 = createFileRoute("/app/backup")({ component: lazyRouteComponent($$splitComponentImporter$22, "component") });
var $$splitComponentImporter$21 = () => import("./app.book-appointment-DcUhPbcV.mjs");
var Route$22 = createFileRoute("/app/book-appointment")({ component: lazyRouteComponent($$splitComponentImporter$21, "component") });
function AddCampModal({ open, onOpenChange, onSuccess }) {
	const [name, setName] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [location, setLocation] = (0, import_react.useState)("");
	const [date, setDate] = (0, import_react.useState)("");
	const [endDate, setEndDate] = (0, import_react.useState)("");
	const [capacity, setCapacity] = (0, import_react.useState)("200");
	const [status, setStatus] = (0, import_react.useState)("Upcoming");
	const [servicesStr, setServicesStr] = (0, import_react.useState)("General checkup, BP & Blood Sugar, Free Medication");
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!name || !location || !date) {
			toast.error("Please fill in camp name, location, and date");
			return;
		}
		const services = servicesStr.split(",").map((s) => s.trim()).filter(Boolean);
		addCamp({
			name,
			description: description || "Free health screening and consultation open to the public.",
			date,
			endDate: endDate || date,
			location,
			status,
			capacity: parseInt(capacity) || 200,
			doctorsAssigned: [],
			volunteersAssigned: [],
			services: services.length > 0 ? services : ["General checkup", "Free Medicine"]
		});
		toast.success(`Camp "${name}" created successfully!`);
		onOpenChange(false);
		resetForm();
		if (onSuccess) onSuccess();
	};
	const resetForm = () => {
		setName("");
		setDescription("");
		setLocation("");
		setDate("");
		setEndDate("");
		setCapacity("200");
		setStatus("Upcoming");
		setServicesStr("General checkup, BP & Blood Sugar, Free Medication");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sm:max-w-lg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				className: "text-xl font-bold",
				children: "Create New Medical Camp"
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "grid gap-4 py-2 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "c-name",
							children: "Camp Name *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "c-name",
							placeholder: "e.g. Community Heart Health & Screening",
							value: name,
							onChange: (e) => setName(e.target.value),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "c-location",
							children: "Location *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "c-location",
							placeholder: "e.g. Central Park Community Center, Block B",
							value: location,
							onChange: (e) => setLocation(e.target.value),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "c-date",
						children: "Start Date *"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "c-date",
						type: "date",
						value: date,
						onChange: (e) => setDate(e.target.value),
						required: true
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "c-enddate",
						children: "End Date"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "c-enddate",
						type: "date",
						value: endDate,
						onChange: (e) => setEndDate(e.target.value)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "c-capacity",
						children: "Target Capacity"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "c-capacity",
						type: "number",
						placeholder: "200",
						value: capacity,
						onChange: (e) => setCapacity(e.target.value)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "c-status",
						children: "Status"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: status,
						onValueChange: (v) => setStatus(v),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							id: "c-status",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "Upcoming",
								children: "Upcoming"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "Ongoing",
								children: "Ongoing"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "Completed",
								children: "Completed"
							})
						] })]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "c-services",
							children: "Services Offered (comma separated)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "c-services",
							placeholder: "General checkup, Eye test, Dental screening, Free medicine",
							value: servicesStr,
							onChange: (e) => setServicesStr(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "c-desc",
							children: "Description"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "c-desc",
							placeholder: "Provide camp details, instructions for attendees...",
							value: description,
							onChange: (e) => setDescription(e.target.value),
							rows: 3
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
						className: "mt-4 sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							onClick: () => onOpenChange(false),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							className: "gradient-primary text-white",
							children: "Create Camp"
						})]
					})
				]
			})]
		})
	});
}
var Route$21 = createFileRoute("/app/camps")({ component: CampsPage });
function CampsPage() {
	const [q, setQ] = (0, import_react.useState)("");
	const [tab, setTab] = (0, import_react.useState)("all");
	const [addModalOpen, setAddModalOpen] = (0, import_react.useState)(false);
	const { user } = useApp();
	const [camps] = useStorageData(getCamps);
	const [participatingIds, setParticipatingIds] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		try {
			const stored = localStorage.getItem("mcm_participating_camps");
			if (stored) setParticipatingIds(JSON.parse(stored));
		} catch {}
	}, []);
	const list = camps.filter((c) => (tab === "all" || c.status.toLowerCase() === tab) && c.name.toLowerCase().includes(q.toLowerCase()));
	const isAdmin = user?.role === "admin";
	const handleParticipateCamp = (campId, campName) => {
		if (participatingIds.includes(campId)) {
			toast.info(`You are already participating in ${campName}`);
			return;
		}
		const updatedCamps = camps.map((c) => {
			if (c.id === campId) return {
				...c,
				registered: c.registered + 1
			};
			return c;
		});
		const updatedParticipating = [...participatingIds, campId];
		setParticipatingIds(updatedParticipating);
		try {
			localStorage.setItem("mcm_participating_camps", JSON.stringify(updatedParticipating));
		} catch {}
		saveCamps(updatedCamps);
		toast.success(`You are now participating in ${campName}!`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Medical Camps",
			description: "Explore community health camps and participate to get free screenings and consultations.",
			crumbs: [{ label: "Camps" }],
			actions: isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				className: "gradient-primary text-white",
				onClick: () => setAddModalOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 h-4 w-4" }), " New Camp"]
			}) : void 0
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:flex-wrap",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative min-w-0 sm:w-72",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					placeholder: "Search camps…",
					value: q,
					onChange: (e) => setQ(e.target.value),
					className: "pl-9"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				value: tab,
				onValueChange: setTab,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "all",
						children: "All"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "upcoming",
						children: "Upcoming"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "ongoing",
						children: "Ongoing"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "completed",
						children: "Completed"
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, { value: tab })]
			})]
		}),
		list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: Tent,
			title: camps.length === 0 ? "No medical camps created yet" : "No matching camps found",
			description: camps.length === 0 ? "Medical camps will appear here when scheduled by hospital administrators." : "Try adjusting your search criteria or tab filters.",
			action: isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				className: "gradient-primary text-white",
				onClick: () => setAddModalOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 h-4 w-4" }), " New Camp"]
			}) : void 0
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
			children: list.map((c) => {
				const isParticipating = participatingIds.includes(c.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "overflow-hidden hover-lift flex flex-col justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative h-32 gradient-hero",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-0 grid place-items-center opacity-30",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tent, { className: "h-16 w-16 text-white" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute right-3 top-3 flex items-center gap-2",
							children: [isParticipating && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								className: "bg-success text-white font-medium",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "mr-1 h-3 w-3" }), " Participating"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: c.status })]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-semibold",
								children: c.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 line-clamp-2 text-xs text-muted-foreground",
								children: c.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 space-y-1 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3 shrink-0" }),
										" ",
										c.location
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-3 w-3 shrink-0" }),
										" ",
										c.registered,
										"/",
										c.capacity,
										" participants registered"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full gradient-primary",
									style: { width: `${Math.min(100, c.registered / (c.capacity || 1) * 100)}%` }
								})
							})
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-5 pt-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
							}), c.status !== "Completed" && (isParticipating ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "secondary",
								className: "flex-1 text-success font-semibold",
								disabled: true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mr-1 h-3.5 w-3.5" }), " Enrolled"]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								className: "flex-1 gradient-primary text-white shadow-soft",
								onClick: () => handleParticipateCamp(c.id, c.name),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "mr-1 h-3.5 w-3.5" }), " Participate in Camp"]
							}))]
						})
					})]
				}, c.id);
			})
		}),
		isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddCampModal, {
			open: addModalOpen,
			onOpenChange: setAddModalOpen
		})
	] });
}
var $$splitComponentImporter$20 = () => import("./app.consultation-OxchABKC.mjs");
var Route$20 = createFileRoute("/app/consultation")({ component: lazyRouteComponent($$splitComponentImporter$20, "component") });
var $$splitComponentImporter$19 = () => import("./app.doctors-DRce7GgT.mjs");
var Route$19 = createFileRoute("/app/doctors")({ component: lazyRouteComponent($$splitComponentImporter$19, "component") });
var $$splitComponentImporter$18 = () => import("./app.lab-reports-R9w1Fakk.mjs");
var Route$18 = createFileRoute("/app/lab-reports")({ component: lazyRouteComponent($$splitComponentImporter$18, "component") });
var $$splitComponentImporter$17 = () => import("./app.medical-history-DDApxPUN.mjs");
var Route$17 = createFileRoute("/app/medical-history")({ component: lazyRouteComponent($$splitComponentImporter$17, "component") });
var $$splitComponentImporter$16 = () => import("./app.patient-registration-DUBUiETc.mjs");
var Route$16 = createFileRoute("/app/patient-registration")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
var $$splitComponentImporter$15 = () => import("./app.patients-B-3ViYLC.mjs");
var Route$15 = createFileRoute("/app/patients")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
var $$splitComponentImporter$14 = () => import("./app.prescriptions-C-gSEoOW.mjs");
var Route$14 = createFileRoute("/app/prescriptions")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./app.profile-Dtmi-CVF.mjs");
var Route$13 = createFileRoute("/app/profile")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./app.qr-id-GBc7ln37.mjs");
var Route$12 = createFileRoute("/app/qr-id")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./app.queue-TJwrgLCm.mjs");
var Route$11 = createFileRoute("/app/queue")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./app.reports-qqYlMLiP.mjs");
var Route$10 = createFileRoute("/app/reports")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./app.roles-Ca3b_JXL.mjs");
var Route$9 = createFileRoute("/app/roles")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./app.schedule-okHUrjcI.mjs");
var Route$8 = createFileRoute("/app/schedule")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./app.settings-D8pIlPKn.mjs");
var Route$7 = createFileRoute("/app/settings")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./app.users-ltkBiaJb.mjs");
var Route$6 = createFileRoute("/app/users")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./app.volunteers-B9AEu5kW.mjs");
var Route$5 = createFileRoute("/app/volunteers")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./register.index-BmTTddtt.mjs");
var Route$4 = createFileRoute("/register/")({
	head: () => ({ meta: [
		{ title: "Create account — MediCamp" },
		{
			name: "description",
			content: "Register as a patient, doctor, volunteer or administrator on MediCamp."
		},
		{
			property: "og:title",
			content: "Create account — MediCamp"
		},
		{
			property: "og:description",
			content: "Register as a patient, doctor, volunteer or administrator on MediCamp."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./register.admin-D6n6efNb.mjs");
var Route$3 = createFileRoute("/register/admin")({
	head: () => ({ meta: [{ title: "Admin registration — MediCamp" }, {
		name: "description",
		content: "Create a MediCamp admin account."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./register.doctor-BwrOYim1.mjs");
var Route$2 = createFileRoute("/register/doctor")({
	head: () => ({ meta: [{ title: "Doctor registration — MediCamp" }, {
		name: "description",
		content: "Create a MediCamp doctor account."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./register.patient-D1t_NPYc.mjs");
var Route$1 = createFileRoute("/register/patient")({
	head: () => ({ meta: [{ title: "Patient registration — MediCamp" }, {
		name: "description",
		content: "Create a MediCamp patient account."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./register.volunteer-BB2aLdBw.mjs");
var Route = createFileRoute("/register/volunteer")({
	head: () => ({ meta: [{ title: "Volunteer registration — MediCamp" }, {
		name: "description",
		content: "Create a MediCamp volunteer account."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$32.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$33
});
var AppRoute = Route$31.update({
	id: "/app",
	path: "/app",
	getParentRoute: () => Route$33
});
var LoginRoute = Route$30.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$33
});
var AppIndexRoute = Route$29.update({
	id: "/",
	path: "/",
	getParentRoute: () => AppRoute
});
var AppActivityLogsRoute = Route$28.update({
	id: "/activity-logs",
	path: "/activity-logs",
	getParentRoute: () => AppRoute
});
var AppAnalyticsRoute = Route$27.update({
	id: "/analytics",
	path: "/analytics",
	getParentRoute: () => AppRoute
});
var AppAppointmentsRoute = Route$26.update({
	id: "/appointments",
	path: "/appointments",
	getParentRoute: () => AppRoute
});
var AppAssignedCampsRoute = Route$25.update({
	id: "/assigned-camps",
	path: "/assigned-camps",
	getParentRoute: () => AppRoute
});
var AppAttendanceRoute = Route$24.update({
	id: "/attendance",
	path: "/attendance",
	getParentRoute: () => AppRoute
});
var AppBackupRoute = Route$23.update({
	id: "/backup",
	path: "/backup",
	getParentRoute: () => AppRoute
});
var AppBookAppointmentRoute = Route$22.update({
	id: "/book-appointment",
	path: "/book-appointment",
	getParentRoute: () => AppRoute
});
var AppCampsRoute = Route$21.update({
	id: "/camps",
	path: "/camps",
	getParentRoute: () => AppRoute
});
var AppConsultationRoute = Route$20.update({
	id: "/consultation",
	path: "/consultation",
	getParentRoute: () => AppRoute
});
var AppDoctorsRoute = Route$19.update({
	id: "/doctors",
	path: "/doctors",
	getParentRoute: () => AppRoute
});
var AppLabReportsRoute = Route$18.update({
	id: "/lab-reports",
	path: "/lab-reports",
	getParentRoute: () => AppRoute
});
var AppMedicalHistoryRoute = Route$17.update({
	id: "/medical-history",
	path: "/medical-history",
	getParentRoute: () => AppRoute
});
var AppPatientRegistrationRoute = Route$16.update({
	id: "/patient-registration",
	path: "/patient-registration",
	getParentRoute: () => AppRoute
});
var AppPatientsRoute = Route$15.update({
	id: "/patients",
	path: "/patients",
	getParentRoute: () => AppRoute
});
var AppPrescriptionsRoute = Route$14.update({
	id: "/prescriptions",
	path: "/prescriptions",
	getParentRoute: () => AppRoute
});
var AppProfileRoute = Route$13.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => AppRoute
});
var AppQrIdRoute = Route$12.update({
	id: "/qr-id",
	path: "/qr-id",
	getParentRoute: () => AppRoute
});
var AppQueueRoute = Route$11.update({
	id: "/queue",
	path: "/queue",
	getParentRoute: () => AppRoute
});
var AppReportsRoute = Route$10.update({
	id: "/reports",
	path: "/reports",
	getParentRoute: () => AppRoute
});
var AppRolesRoute = Route$9.update({
	id: "/roles",
	path: "/roles",
	getParentRoute: () => AppRoute
});
var AppScheduleRoute = Route$8.update({
	id: "/schedule",
	path: "/schedule",
	getParentRoute: () => AppRoute
});
var AppSettingsRoute = Route$7.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AppRoute
});
var AppUsersRoute = Route$6.update({
	id: "/users",
	path: "/users",
	getParentRoute: () => AppRoute
});
var AppVolunteersRoute = Route$5.update({
	id: "/volunteers",
	path: "/volunteers",
	getParentRoute: () => AppRoute
});
var RegisterIndexRoute = Route$4.update({
	id: "/register/",
	path: "/register/",
	getParentRoute: () => Route$33
});
var RegisterAdminRoute = Route$3.update({
	id: "/register/admin",
	path: "/register/admin",
	getParentRoute: () => Route$33
});
var RegisterDoctorRoute = Route$2.update({
	id: "/register/doctor",
	path: "/register/doctor",
	getParentRoute: () => Route$33
});
var RegisterPatientRoute = Route$1.update({
	id: "/register/patient",
	path: "/register/patient",
	getParentRoute: () => Route$33
});
var RegisterVolunteerRoute = Route.update({
	id: "/register/volunteer",
	path: "/register/volunteer",
	getParentRoute: () => Route$33
});
var AppCampsIdRoute = Route$34.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => AppCampsRoute
});
var AppPatientsIdRoute = Route$35.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => AppPatientsRoute
});
var AppCampsRouteChildren = { AppCampsIdRoute };
var AppCampsRouteWithChildren = AppCampsRoute._addFileChildren(AppCampsRouteChildren);
var AppPatientsRouteChildren = { AppPatientsIdRoute };
var AppRouteChildren = {
	AppActivityLogsRoute,
	AppAnalyticsRoute,
	AppAppointmentsRoute,
	AppAssignedCampsRoute,
	AppAttendanceRoute,
	AppBackupRoute,
	AppBookAppointmentRoute,
	AppCampsRoute: AppCampsRouteWithChildren,
	AppConsultationRoute,
	AppDoctorsRoute,
	AppLabReportsRoute,
	AppMedicalHistoryRoute,
	AppPatientRegistrationRoute,
	AppPatientsRoute: AppPatientsRoute._addFileChildren(AppPatientsRouteChildren),
	AppPrescriptionsRoute,
	AppProfileRoute,
	AppQrIdRoute,
	AppQueueRoute,
	AppReportsRoute,
	AppRolesRoute,
	AppScheduleRoute,
	AppSettingsRoute,
	AppUsersRoute,
	AppVolunteersRoute,
	AppIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AppRoute: AppRoute._addFileChildren(AppRouteChildren),
	LoginRoute,
	RegisterAdminRoute,
	RegisterDoctorRoute,
	RegisterPatientRoute,
	RegisterVolunteerRoute,
	RegisterIndexRoute
};
var routeTree = Route$33._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };

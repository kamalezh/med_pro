import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as AppProvider } from "./AppContext-UvazMoqe.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$32 } from "./app.patients._id-DU5qCzS9.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-1oar34cW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-BEbYkAmB.css";
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
var Route$31 = createRootRouteWithContext()({
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
	const { queryClient } = Route$31.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
			position: "top-right",
			richColors: true,
			closeButton: true
		})] })
	});
}
var $$splitComponentImporter$30 = () => import("./routes-OFTkEVmE.mjs");
var Route$30 = createFileRoute("/")({
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
	component: lazyRouteComponent($$splitComponentImporter$30, "component")
});
var $$splitComponentImporter$29 = () => import("./app-RKBES5s1.mjs");
var Route$29 = createFileRoute("/app")({
	head: () => ({ meta: [{ title: "Dashboard — MediCamp" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$29, "component")
});
var $$splitComponentImporter$28 = () => import("./login-DcvQpHpE.mjs");
var Route$28 = createFileRoute("/login")({
	head: () => ({ meta: [{ title: "Sign in — MediCamp" }, {
		name: "description",
		content: "Sign in as patient, doctor, volunteer or administrator."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$28, "component")
});
var $$splitComponentImporter$27 = () => import("./app.index-B854-Zkf.mjs");
var Route$27 = createFileRoute("/app/")({ component: lazyRouteComponent($$splitComponentImporter$27, "component") });
var $$splitComponentImporter$26 = () => import("./app.activity-logs-D_ba8pnD.mjs");
var Route$26 = createFileRoute("/app/activity-logs")({ component: lazyRouteComponent($$splitComponentImporter$26, "component") });
var $$splitComponentImporter$25 = () => import("./app.analytics-E4x7BJCB.mjs");
var Route$25 = createFileRoute("/app/analytics")({ component: lazyRouteComponent($$splitComponentImporter$25, "component") });
var $$splitComponentImporter$24 = () => import("./app.appointments-BylbLlTP.mjs");
var Route$24 = createFileRoute("/app/appointments")({ component: lazyRouteComponent($$splitComponentImporter$24, "component") });
var $$splitComponentImporter$23 = () => import("./app.attendance-CrMhtwjq.mjs");
var Route$23 = createFileRoute("/app/attendance")({ component: lazyRouteComponent($$splitComponentImporter$23, "component") });
var $$splitComponentImporter$22 = () => import("./app.backup-D7ZtRiiR.mjs");
var Route$22 = createFileRoute("/app/backup")({ component: lazyRouteComponent($$splitComponentImporter$22, "component") });
var $$splitComponentImporter$21 = () => import("./app.book-appointment-B3grAyxo.mjs");
var Route$21 = createFileRoute("/app/book-appointment")({ component: lazyRouteComponent($$splitComponentImporter$21, "component") });
var $$splitComponentImporter$20 = () => import("./app.consultation-CdDt_BUa.mjs");
var Route$20 = createFileRoute("/app/consultation")({ component: lazyRouteComponent($$splitComponentImporter$20, "component") });
var $$splitComponentImporter$19 = () => import("./app.doctors-Ba0ZXTfn.mjs");
var Route$19 = createFileRoute("/app/doctors")({ component: lazyRouteComponent($$splitComponentImporter$19, "component") });
var $$splitComponentImporter$18 = () => import("./app.lab-reports-Dm_Za2tq.mjs");
var Route$18 = createFileRoute("/app/lab-reports")({ component: lazyRouteComponent($$splitComponentImporter$18, "component") });
var $$splitComponentImporter$17 = () => import("./app.medical-history-Db4Xiukh.mjs");
var Route$17 = createFileRoute("/app/medical-history")({ component: lazyRouteComponent($$splitComponentImporter$17, "component") });
var $$splitComponentImporter$16 = () => import("./app.patient-registration-DpQbmOAU.mjs");
var Route$16 = createFileRoute("/app/patient-registration")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
var $$splitComponentImporter$15 = () => import("./app.patients-9To0IWsD.mjs");
var Route$15 = createFileRoute("/app/patients")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
var $$splitComponentImporter$14 = () => import("./app.prescriptions-BlBSNap7.mjs");
var Route$14 = createFileRoute("/app/prescriptions")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./app.profile-ueTJFuyq.mjs");
var Route$13 = createFileRoute("/app/profile")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./app.qr-id-D72StT_B.mjs");
var Route$12 = createFileRoute("/app/qr-id")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./app.queue-1kjERbyL.mjs");
var Route$11 = createFileRoute("/app/queue")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./app.reports-Dt90t_Dq.mjs");
var Route$10 = createFileRoute("/app/reports")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./app.roles-Ca3b_JXL.mjs");
var Route$9 = createFileRoute("/app/roles")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./app.schedule-daGPlMlO.mjs");
var Route$8 = createFileRoute("/app/schedule")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./app.settings-C5SiPBKv.mjs");
var Route$7 = createFileRoute("/app/settings")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./app.users-Cne59mWe.mjs");
var Route$6 = createFileRoute("/app/users")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./app.volunteers-BB5vMNEw.mjs");
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
var $$splitComponentImporter$3 = () => import("./register.admin-CPLf_5AA.mjs");
var Route$3 = createFileRoute("/register/admin")({
	head: () => ({ meta: [{ title: "Admin registration — MediCamp" }, {
		name: "description",
		content: "Create a MediCamp admin account."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./register.doctor-CGZv8thH.mjs");
var Route$2 = createFileRoute("/register/doctor")({
	head: () => ({ meta: [{ title: "Doctor registration — MediCamp" }, {
		name: "description",
		content: "Create a MediCamp doctor account."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./register.patient-B_-ZdJXr.mjs");
var Route$1 = createFileRoute("/register/patient")({
	head: () => ({ meta: [{ title: "Patient registration — MediCamp" }, {
		name: "description",
		content: "Create a MediCamp patient account."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./register.volunteer-CqoRVUEl.mjs");
var Route = createFileRoute("/register/volunteer")({
	head: () => ({ meta: [{ title: "Volunteer registration — MediCamp" }, {
		name: "description",
		content: "Create a MediCamp volunteer account."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$30.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$31
});
var AppRoute = Route$29.update({
	id: "/app",
	path: "/app",
	getParentRoute: () => Route$31
});
var LoginRoute = Route$28.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$31
});
var AppIndexRoute = Route$27.update({
	id: "/",
	path: "/",
	getParentRoute: () => AppRoute
});
var AppActivityLogsRoute = Route$26.update({
	id: "/activity-logs",
	path: "/activity-logs",
	getParentRoute: () => AppRoute
});
var AppAnalyticsRoute = Route$25.update({
	id: "/analytics",
	path: "/analytics",
	getParentRoute: () => AppRoute
});
var AppAppointmentsRoute = Route$24.update({
	id: "/appointments",
	path: "/appointments",
	getParentRoute: () => AppRoute
});
var AppAttendanceRoute = Route$23.update({
	id: "/attendance",
	path: "/attendance",
	getParentRoute: () => AppRoute
});
var AppBackupRoute = Route$22.update({
	id: "/backup",
	path: "/backup",
	getParentRoute: () => AppRoute
});
var AppBookAppointmentRoute = Route$21.update({
	id: "/book-appointment",
	path: "/book-appointment",
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
	getParentRoute: () => Route$31
});
var RegisterAdminRoute = Route$3.update({
	id: "/register/admin",
	path: "/register/admin",
	getParentRoute: () => Route$31
});
var RegisterDoctorRoute = Route$2.update({
	id: "/register/doctor",
	path: "/register/doctor",
	getParentRoute: () => Route$31
});
var RegisterPatientRoute = Route$1.update({
	id: "/register/patient",
	path: "/register/patient",
	getParentRoute: () => Route$31
});
var RegisterVolunteerRoute = Route.update({
	id: "/register/volunteer",
	path: "/register/volunteer",
	getParentRoute: () => Route$31
});
var AppPatientsRouteChildren = { AppPatientsIdRoute: Route$32.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => AppPatientsRoute
}) };
var AppRouteChildren = {
	AppActivityLogsRoute,
	AppAnalyticsRoute,
	AppAppointmentsRoute,
	AppAttendanceRoute,
	AppBackupRoute,
	AppBookAppointmentRoute,
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
var routeTree = Route$31._addFileChildren(rootRouteChildren)._addFileTypes();
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

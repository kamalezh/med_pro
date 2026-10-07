import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { d as Stethoscope, l as Tent, n as Users, s as TrendingUp } from "../_libs/lucide-react.mjs";
import { t as PageHeader } from "./PageHeader-BAvHonDt.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { S as useStorageData, d as getAppointments, f as getCamps, g as getPatients, p as getDoctors } from "./storage-MMnSl_7q.mjs";
import { t as StatCard } from "./StatCard-BEHM0qq2.mjs";
import { a as XAxis, c as Bar, d as ResponsiveContainer, f as Tooltip, i as YAxis, l as Pie, n as PieChart, o as Area, p as Legend, r as BarChart, s as CartesianGrid, t as AreaChart, u as Cell } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.analytics-w3hrvK4B.js
var import_jsx_runtime = require_jsx_runtime();
function Analytics() {
	const [patients] = useStorageData(getPatients);
	const [appointments] = useStorageData(getAppointments);
	const [camps] = useStorageData(getCamps);
	const [doctors] = useStorageData(getDoctors);
	const deptCounts = {};
	doctors.concat(patients.map((p) => ({ department: p.condition || "General" }))).forEach((item) => {
		const d = item.department || "General";
		deptCounts[d] = (deptCounts[d] || 0) + 1;
	});
	const chartByDept = Object.entries(deptCounts).map(([name, value]) => ({
		name,
		value
	}));
	if (chartByDept.length === 0) chartByDept.push({
		name: "General",
		value: 0
	});
	const campData = camps.map((c) => ({
		camp: c.name.split(" ")[0] || "Camp",
		registered: c.registered,
		capacity: c.capacity
	}));
	if (campData.length === 0) campData.push({
		camp: "No Camps",
		registered: 0,
		capacity: 0
	});
	const appointmentTrend = [{
		month: "Total",
		appointments: appointments.length,
		completed: appointments.filter((a) => a.status === "Completed").length
	}];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Analytics",
				description: "Real-time performance metrics and distribution.",
				crumbs: [{ label: "Analytics" }]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Total Patients",
						value: patients.length,
						icon: Users,
						tone: "primary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Total Appointments",
						value: appointments.length,
						icon: TrendingUp,
						tone: "success"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Active Camps",
						value: camps.length,
						icon: Tent,
						tone: "warning"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Staff Doctors",
						value: doctors.length,
						icon: Stethoscope,
						tone: "success"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-4 font-semibold",
							children: "Appointments Overview"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-72",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
								data: appointmentTrend,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
										id: "a1",
										x1: "0",
										y1: "0",
										x2: "0",
										y2: "1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "0%",
											stopColor: "var(--primary)",
											stopOpacity: .4
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "100%",
											stopColor: "var(--primary)",
											stopOpacity: 0
										})]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "var(--border)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "month",
										fontSize: 12
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { fontSize: 12 }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										dataKey: "appointments",
										stroke: "var(--primary)",
										fill: "url(#a1)"
									})
								]
							}) })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-4 font-semibold",
							children: "Camp Registration vs Capacity"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-72",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: campData,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "var(--border)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "camp",
										fontSize: 12
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { fontSize: 12 }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "registered",
										fill: "var(--primary)",
										radius: [
											8,
											8,
											0,
											0
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "capacity",
										fill: "var(--secondary)",
										radius: [
											8,
											8,
											0,
											0
										]
									})
								]
							}) })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-6 sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-4 font-semibold",
							children: "Patients by Department / Condition"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-72",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
									data: chartByDept,
									dataKey: "value",
									nameKey: "name",
									innerRadius: 50,
									outerRadius: 90,
									paddingAngle: 3,
									children: chartByDept.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: [
										"var(--chart-1)",
										"var(--chart-2)",
										"var(--chart-3)",
										"var(--chart-4)",
										"var(--chart-5)",
										"var(--primary-glow)"
									][i % 6] }, i))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {})
							] }) })
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { Analytics as component };

import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useApp } from "./AppContext-UvazMoqe.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Button } from "./button-BLZ6ednA.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { L as Eye, R as EyeOff, l as Stethoscope, lt as ArrowLeft, m as ShieldCheck, r as User, s as Tent, ut as Activity } from "../_libs/lucide-react.mjs";
import { S as useStorageData, b as saveCamps, d as getAppointments, f as getCamps, p as getDoctors, r as addDoctor, t as addAppointment } from "./storage-5gaUGoAc.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as Checkbox } from "./checkbox-kt6FvQcE.mjs";
import { t as useForm } from "../_libs/react-hook-form.mjs";
import { t as loginUserWithRole } from "./auth-CplBjQL6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-Dls5TRW7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var roles = [
	{
		key: "patient",
		label: "Patient",
		desc: "Select camp, view appointments & get auto queue token.",
		icon: User
	},
	{
		key: "doctor",
		label: "Doctor",
		desc: "Manage consultations and direct patient care.",
		icon: Stethoscope
	},
	{
		key: "admin",
		label: "Administrator",
		desc: "Oversee the hospital, staff, camps and reports.",
		icon: ShieldCheck
	}
];
function LoginPage() {
	const [role, setRole] = (0, import_react.useState)(null);
	const [showPass, setShowPass] = (0, import_react.useState)(false);
	const [campsList] = useStorageData(getCamps);
	const [selectedCamp, setSelectedCamp] = (0, import_react.useState)("");
	const { login } = useApp();
	const nav = useNavigate();
	const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ defaultValues: {
		email: "",
		password: "",
		remember: true
	} });
	const onSubmit = async (data) => {
		if (!role) return;
		try {
			const { userData } = await loginUserWithRole(data.email, data.password, role);
			const dynamicName = userData.name || roles.find((r) => r.key === role)?.label || "User";
			const u = login(role, data.email, dynamicName);
			if (role === "patient") {
				const campName = selectedCamp || campsList[0]?.name || "General Medical Camp";
				const nextToken = getAppointments().filter((a) => a.department === campName || a.reason?.includes(campName)).length + 1;
				addAppointment({
					patientId: u.id,
					patientName: dynamicName,
					patientEmail: data.email,
					doctorId: "D100",
					doctorName: "Duty Specialist — " + campName,
					department: campName,
					date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
					time: (/* @__PURE__ */ new Date()).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit"
					}),
					status: "Approved",
					type: "Consultation",
					token: nextToken,
					reason: `Auto Token Queue for ${campName}`
				});
				const updatedCamps = campsList.map((c) => c.name === campName ? {
					...c,
					registered: c.registered + 1
				} : c);
				if (updatedCamps.length > 0) saveCamps(updatedCamps);
				toast.success(`Welcome ${dynamicName}! Auto-queued for ${campName} with Token #${nextToken}`);
				nav({ to: "/app/appointments" });
			} else if (role === "doctor") {
				const campName = selectedCamp || campsList[0]?.name || "General Medical Camp";
				const docName = dynamicName.startsWith("Dr.") ? dynamicName : `Dr. ${dynamicName}`;
				const u = login(role, data.email, docName);
				u.department = campName;
				try {
					localStorage.setItem("mcm_user", JSON.stringify(u));
					localStorage.setItem("mcm_doctor_assigned_camp", campName);
				} catch {}
				const updatedCamps = campsList.map((c) => {
					if (c.name === campName && !c.doctorsAssigned.includes(docName)) return {
						...c,
						doctorsAssigned: [...c.doctorsAssigned, docName]
					};
					return c;
				});
				if (updatedCamps.length > 0) saveCamps(updatedCamps);
				if (!getDoctors().some((d) => d.email === data.email || d.name === docName)) addDoctor({
					name: docName,
					department: campName,
					specialization: "Specialist Physician",
					experience: 8,
					rating: 5,
					patients: 12,
					availability: "Available",
					email: data.email,
					phone: "+1 555-0199"
				});
				toast.success(`Welcome ${docName}! Assigned to ${campName} for consultation duty.`);
				nav({ to: "/app/appointments" });
			} else {
				toast.success(`Welcome back, ${dynamicName}!`);
				nav({ to: "/app" });
			}
		} catch (error) {
			let errorMessage = "Invalid email or password.";
			if (error.code === "auth/invalid-credential" || error.code === "auth/user-not-found") errorMessage = "No account found with these credentials.";
			else if (error.code === "auth/wrong-password") errorMessage = "Incorrect password. Please try again.";
			else if (error.message) errorMessage = error.message;
			toast.error(errorMessage);
		}
	};
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-5xl font-extrabold leading-tight",
						children: "Care that scales."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-md text-lg text-white/85",
						children: "One platform for camps, appointments, consultations and hospital operations."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 grid grid-cols-3 gap-4",
						children: [
							{
								v: "120K+",
								l: "Patients"
							},
							{
								v: "850+",
								l: "Doctors"
							},
							{
								v: "320",
								l: "Camps"
							}
						].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl bg-white/10 p-4 backdrop-blur",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-2xl font-bold",
								children: s.v
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs opacity-90",
								children: s.l
							})]
						}, s.l))
					})
				] }),
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
				className: "w-full max-w-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground lg:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back to home"]
				}), !role ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "animate-fade-in-up",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-3xl font-bold tracking-tight",
							children: "Choose your role"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Pick how you're using MediCamp today."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 grid gap-3",
							children: roles.map((r) => {
								const Icon = r.icon;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setRole(r.key),
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
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "animate-fade-in-up",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setRole(null),
							className: "mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Change role"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-6 flex items-center gap-3",
							children: (() => {
								const r = roles.find((x) => x.key === role);
								const Icon = r.icon;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: cn("grid h-11 w-11 place-items-center rounded-xl gradient-primary text-white shadow-soft"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Signing in as"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold",
									children: r.label
								})] })] });
							})()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							className: "glass p-6 shadow-card",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleSubmit(onSubmit),
								className: "space-y-4",
								children: [
									(role === "patient" || role === "doctor") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-primary/30 bg-primary/5 p-3 space-y-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
												htmlFor: "camp-select",
												className: "font-semibold text-xs text-primary flex items-center gap-1.5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tent, { className: "h-4 w-4" }),
													" ",
													role === "patient" ? "Select Medical Camp (Auto-Queue)" : "Select Assigned Medical Camp"
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
												value: selectedCamp,
												onValueChange: setSelectedCamp,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
													id: "camp-select",
													className: "h-9 bg-background text-sm",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Choose active camp..." })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: campsList.length > 0 ? campsList.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
													value: c.name,
													children: [
														c.name,
														" (",
														c.location,
														")"
													]
												}, c.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													value: "General Community Camp",
													children: "General Community Medical Camp"
												}) })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[11px] text-muted-foreground",
												children: role === "patient" ? "Signing in automatically registers you & assigns your queue token." : "Assigns you as the on-duty consultation doctor for this camp."
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "email",
											children: "Email"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "email",
											type: "email",
											placeholder: "you@example.com",
											...register("email", { required: "Email is required" })
										}),
										errors.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-xs text-destructive",
											children: errors.email.message
										})
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "password",
											children: "Password"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "password",
												type: showPass ? "text" : "password",
												placeholder: "••••••••",
												...register("password", {
													required: "Password is required",
													minLength: {
														value: 4,
														message: "Too short"
													}
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setShowPass((s) => !s),
												className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground",
												children: showPass ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
											})]
										}),
										errors.password && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-xs text-destructive",
											children: errors.password.message
										})
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "flex items-center gap-2 text-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
												...register("remember"),
												defaultChecked: true
											}), " Remember me"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "text-sm text-primary hover:underline",
											onClick: () => toast.info("Reset link sent to your email"),
											children: "Forgot password?"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "submit",
										disabled: isSubmitting,
										className: "w-full gradient-primary text-white shadow-soft",
										children: isSubmitting ? "Signing in…" : "Sign in"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-center text-xs text-muted-foreground",
										children: "Secured with Firebase Authentication."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-center text-sm text-muted-foreground",
										children: [
											"New user?",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/register",
												className: "text-primary hover:underline",
												children: "Register here"
											})
										]
									})
								]
							})
						})
					]
				})]
			})
		})]
	});
}
//#endregion
export { LoginPage as component };

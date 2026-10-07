import { o as __toESM } from "../_runtime.mjs";
import { o as notifications } from "./data--WGVlUji.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppContext-UvazMoqe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AppContext = (0, import_react.createContext)(null);
function AppProvider({ children }) {
	const [user, setUser] = (0, import_react.useState)(null);
	const [theme, setTheme] = (0, import_react.useState)("light");
	const [notifs, setNotifs] = (0, import_react.useState)(notifications);
	(0, import_react.useEffect)(() => {
		try {
			const rawUser = localStorage.getItem("mcm_user");
			if (rawUser) setUser(JSON.parse(rawUser));
			const rawTheme = localStorage.getItem("mcm_theme");
			if (rawTheme) setTheme(rawTheme);
		} catch {}
	}, []);
	(0, import_react.useEffect)(() => {
		if (theme === "dark") document.documentElement.classList.add("dark");
		else document.documentElement.classList.remove("dark");
		try {
			localStorage.setItem("mcm_theme", theme);
		} catch {}
	}, [theme]);
	const login = (role, email, name) => {
		const roleTitle = role.charAt(0).toUpperCase() + role.slice(1);
		const finalName = name || (email ? email.split("@")[0] : `${roleTitle} User`);
		const u = {
			id: "u_" + Date.now(),
			name: finalName,
			role,
			email: email || `${role}@medicamp.dev`
		};
		setUser(u);
		try {
			localStorage.setItem("mcm_user", JSON.stringify(u));
			localStorage.setItem("mcm_token", "jwt-session-token");
		} catch {}
		return u;
	};
	const logout = () => {
		setUser(null);
		try {
			localStorage.removeItem("mcm_user");
			localStorage.removeItem("mcm_token");
		} catch {}
	};
	const toggleTheme = () => setTheme((t) => t === "light" ? "dark" : "light");
	const markAllRead = () => setNotifs((n) => n.map((x) => ({
		...x,
		read: true
	})));
	const markRead = (id) => setNotifs((n) => n.map((x) => x.id === id ? {
		...x,
		read: true
	} : x));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppContext.Provider, {
		value: {
			user,
			login,
			logout,
			theme,
			toggleTheme,
			notifs,
			markAllRead,
			markRead
		},
		children
	});
}
function useApp() {
	const ctx = (0, import_react.useContext)(AppContext);
	if (!ctx) throw new Error("useApp must be used within AppProvider");
	return ctx;
}
//#endregion
export { useApp as n, AppProvider as t };

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { type MockUser, type Role, notifications as seedNotifs, type NotificationItem } from "@/mock/data";

interface AppContextValue {
  user: MockUser | null;
  login: (role: Role, email: string, name?: string) => MockUser;
  logout: () => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
  notifs: NotificationItem[];
  markAllRead: () => void;
  markRead: (id: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [notifs, setNotifs] = useState<NotificationItem[]>(seedNotifs);

  useEffect(() => {
    try {
      const rawUser = localStorage.getItem("mcm_user");
      if (rawUser) setUser(JSON.parse(rawUser));
      const rawTheme = localStorage.getItem("mcm_theme") as "light" | "dark" | null;
      if (rawTheme) setTheme(rawTheme);
    } catch {}
  }, []);

  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    try { localStorage.setItem("mcm_theme", theme); } catch {}
  }, [theme]);

  const login = (role: Role, email: string, name?: string) => {
    const roleTitle = role.charAt(0).toUpperCase() + role.slice(1);
    const finalName = name || (email ? email.split("@")[0] : `${roleTitle} User`);

    const u: MockUser = { 
      id: "u_" + Date.now(),
      name: finalName, 
      role, 
      email: email || `${role}@medicamp.dev`,
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

  const toggleTheme = () => setTheme(t => (t === "light" ? "dark" : "light"));
  const markAllRead = () => setNotifs(n => n.map(x => ({ ...x, read: true })));
  const markRead = (id: string) => setNotifs(n => n.map(x => x.id === id ? { ...x, read: true } : x));

  return (
    <AppContext.Provider value={{ user, login, logout, theme, toggleTheme, notifs, markAllRead, markRead }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
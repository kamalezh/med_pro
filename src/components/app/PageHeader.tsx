import { Link } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";
import type { ReactNode } from "react";

interface Crumb { label: string; to?: string }

export function PageHeader({ title, description, crumbs, actions }: {
  title: string;
  description?: string;
  crumbs?: Crumb[];
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 animate-fade-in-up">
      {crumbs && crumbs.length > 0 && (
        <nav className="mb-2 flex items-center gap-1 text-xs text-muted-foreground">
          <Link to="/app" className="flex items-center gap-1 hover:text-foreground"><Home className="h-3 w-3" /></Link>
          {crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-1">
              <ChevronRight className="h-3 w-3" />
              {c.to ? <Link to={c.to} className="hover:text-foreground">{c.label}</Link> : <span className="text-foreground">{c.label}</span>}
            </span>
          ))}
        </nav>
      )}
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
          {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
        </div>
        {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
}

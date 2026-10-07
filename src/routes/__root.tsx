import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet, Link, createRootRouteWithContext, useRouter,
  HeadContent, Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AppProvider } from "@/context/AppContext";

function NotFoundComponent() {
  return (
    <div className="grid min-h-screen place-items-center mesh-bg px-4">
      <div className="glass max-w-md rounded-2xl p-10 text-center shadow-card">
        <p className="text-6xl font-bold gradient-text">404</p>
        <h2 className="mt-2 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="mt-6 inline-flex rounded-md gradient-primary px-4 py-2 text-sm font-medium text-white shadow-soft">
          Go home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return (
    <div className="grid min-h-screen place-items-center bg-background px-4">
      <div className="glass max-w-md rounded-2xl p-10 text-center">
        <h1 className="text-xl font-semibold">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong. Try refreshing.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="rounded-md gradient-primary px-4 py-2 text-sm font-medium text-white">Try again</button>
          <a href="/" className="rounded-md border border-input px-4 py-2 text-sm font-medium">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "MediCamp — Enterprise Medical Camp Management" },
      { name: "description", content: "Run medical camps, hospital appointments and patient care from one premium platform. Trusted by leading healthcare organizations." },
      { name: "author", content: "MediCamp" },
      { property: "og:title", content: "MediCamp — Enterprise Medical Camp Management" },
      { property: "og:description", content: "Run medical camps, hospital appointments and patient care from one premium platform. Trusted by leading healthcare organizations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "MediCamp — Enterprise Medical Camp Management" },
      { name: "twitter:description", content: "Run medical camps, hospital appointments and patient care from one premium platform. Trusted by leading healthcare organizations." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fd4089f5-fe8b-448a-991e-5246546c82ea/id-preview-4f6042fe--61e2fa60-89d0-47e4-a92b-ba5e9825ecad.lovable.app-1784346606850.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fd4089f5-fe8b-448a-991e-5246546c82ea/id-preview-4f6042fe--61e2fa60-89d0-47e4-a92b-ba5e9825ecad.lovable.app-1784346606850.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <Outlet />
        <Toaster position="top-right" richColors closeButton />
      </AppProvider>
    </QueryClientProvider>
  );
}

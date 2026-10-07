import { M as notFound, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as getCamps } from "./storage-MMnSl_7q.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.camps._id-XzEIEiN9.js
var $$splitNotFoundComponentImporter = () => import("./app.camps._id-CHfaBPt7.mjs");
var $$splitComponentImporter = () => import("./app.camps._id-CwCgrmgX.mjs");
var Route = createFileRoute("/app/camps/$id")({
	loader: ({ params }) => {
		const camp = getCamps().find((c) => c.id === params.id);
		if (!camp) throw notFound();
		return { camp };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
//#endregion
export { Route as t };

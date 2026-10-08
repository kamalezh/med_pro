import { M as notFound, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as getPatients } from "./storage-5gaUGoAc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app.patients._id-Dn0iRIQY.js
var $$splitNotFoundComponentImporter = () => import("./app.patients._id-B8b_QiuF.mjs");
var $$splitComponentImporter = () => import("./app.patients._id-3CsxiaQ0.mjs");
var Route = createFileRoute("/app/patients/$id")({
	loader: ({ params }) => {
		const patient = getPatients().find((p) => p.id === params.id);
		if (!patient) throw notFound();
		return { patient };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
//#endregion
export { Route as t };

import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/usePagination-qbXCEir3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function usePagination(items, pageSize = 10) {
	const [page, setPage] = (0, import_react.useState)(1);
	const total = items.length;
	const totalPages = Math.max(1, Math.ceil(total / pageSize));
	const current = (0, import_react.useMemo)(() => items.slice((page - 1) * pageSize, page * pageSize), [
		items,
		page,
		pageSize
	]);
	const goTo = (p) => setPage(Math.min(totalPages, Math.max(1, p)));
	return {
		page,
		totalPages,
		total,
		current,
		next: () => goTo(page + 1),
		prev: () => goTo(page - 1),
		goTo,
		setPage
	};
}
//#endregion
export { usePagination as t };

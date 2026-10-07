import { useMemo, useState } from "react";

export function usePagination<T>(items: T[], pageSize = 10) {
  const [page, setPage] = useState(1);
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const current = useMemo(
    () => items.slice((page - 1) * pageSize, page * pageSize),
    [items, page, pageSize],
  );
  const goTo = (p: number) => setPage(Math.min(totalPages, Math.max(1, p)));
  return { page, totalPages, total, current, next: () => goTo(page + 1), prev: () => goTo(page - 1), goTo, setPage };
}

"use client";

import { useEffect, useState } from "react";

export default function ContadorInscritos() {
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/registro")
      .then((r) => r.json())
      .then((d) => setTotal(d.total_inscritos))
      .catch(() => setTotal(null));
  }, []);

  if (total === null) return null;

  return (
    <div className="flex items-center gap-2 text-sm text-brand-muted">
      <span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-pulse" />
      <span>
        <strong className="text-brand-light">{total.toLocaleString()}</strong>{" "}
        corredores inscritos
      </span>
    </div>
  );
}

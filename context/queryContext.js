import { useRouter } from "next/router";
import { useState, createContext } from "react";

export const QueryContext = createContext();

export default function QueryProvider({ children }) {
  const { query } = useRouter();
  const [q, setQ] = useState({
    r: query.r.split(" ") || "earthporn",
    s: query.s || "hot",
    t: query.t || "week",
    after: query.after || "",
    before: query.before || "",
    count: query.count || 0,
  });

  console.log(query);
  return (
    <QueryContext.Provider value={{ q, setQ }}>
      {children}
    </QueryContext.Provider>
  );
}

import { useState, createContext } from "react";

export const SearchContext = createContext();

export default function SearchProvider({ children }) {
  const [input, setInput] = useState("");
  const [sort, setSort] = useState("hot");
  const [periodForTop, setPeriodForTop] = useState("week");

  return (
    <SearchContext.Provider
      value={{ input, setInput, sort, setSort, periodForTop, setPeriodForTop }}
    >
      {children}
    </SearchContext.Provider>
  );
}

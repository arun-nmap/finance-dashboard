// src/hooks/useFilters.js

import { useState, useMemo } from "react";

export const useFilters = (transactions) => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      const matchSearch = t.category
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchType =
        type === "all" || t.type === type;

      return matchSearch && matchType;
    });
  }, [transactions, search, type]);

  return {
    search,
    setSearch,
    type,
    setType,
    filtered,
  };
};
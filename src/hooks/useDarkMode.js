// src/hooks/useDarkMode.js

import { useEffect } from "react";
import { useStore } from "../store/useStore";

export const useDarkMode = () => {
  const { darkMode } = useStore();

  useEffect(() => {
    const root = window.document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);
};
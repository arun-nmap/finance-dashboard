// src/components/DarkModeToggle.jsx

import { useStore } from "../store/useStore";

export default function DarkModeToggle() {
  const { darkMode, toggleDark } = useStore();

  return (
    <div
      onClick={toggleDark}
      className="w-14 h-7 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1 cursor-pointer transition"
    >
      <div
        className={`w-5 h-5 bg-white rounded-full shadow-md transform transition duration-300 flex items-center justify-center text-xs ${
          darkMode ? "translate-x-7" : ""
        }`}
      >
        {darkMode ? "🌙" : "☀️"}
      </div>
    </div>
  );
}
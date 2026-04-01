// src/components/RoleSwitcher.jsx

import { useStore } from "../store/useStore";

export default function RoleSwitcher() {
  const { role, setRole } = useStore();

  return (
    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">

      {/* Viewer */}
      <button
        onClick={() => setRole("viewer")}
        className={`px-3 py-1 text-sm rounded-md transition ${
          role === "viewer"
            ? "bg-white dark:bg-gray-900 shadow font-medium"
            : "text-gray-500 hover:text-black dark:hover:text-white"
        }`}
      >
        👁 Viewer
      </button>

      {/* Admin */}
      <button
        onClick={() => setRole("admin")}
        className={`px-3 py-1 text-sm rounded-md transition ${
          role === "admin"
            ? "bg-white dark:bg-gray-900 shadow font-medium"
            : "text-gray-500 hover:text-black dark:hover:text-white"
        }`}
      >
        ⚙️ Admin
      </button>
    </div>
  );
}
// src/components/layout/Sidebar.jsx

import { useStore } from "../../store/useStore";

export default function Sidebar() {
  const { activeTab, setActiveTab } = useStore();

  const menu = [
    { id: "dashboard", label: "📊 Dashboard" },
    { id: "transactions", label: "📋 Transactions" },
    { id: "insights", label: "🧠 Insights" },
  ];

  return (
    <aside className="hidden md:flex flex-col w-60 bg-white dark:bg-gray-900 border-r dark:border-gray-700 p-4">
      
      <h2 className="text-lg font-bold mb-6">Finance</h2>

      <nav className="flex flex-col gap-2">
        {menu.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`text-left px-3 py-2 rounded-lg transition ${
              activeTab === item.id
                ? "bg-indigo-600 text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
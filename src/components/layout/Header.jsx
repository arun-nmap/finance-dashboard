// src/components/layout/Header.jsx

import RoleSwitcher from "../RoleSwitcher";
import DarkModeToggle from "../DarkModeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-4 md:px-6 py-3 border-b bg-white dark:bg-gray-900 dark:border-gray-700">

      {/* LEFT: Title */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold">
          💰 Finance Dashboard
        </h1>
        <p className="text-xs text-gray-500">
          Track your income, expenses & insights
        </p>
      </div>

      {/* RIGHT: Controls */}
      <div className="flex items-center gap-3">

        {/* Role Switcher */}
        <RoleSwitcher />

        {/* Dark Mode Toggle */}
        <DarkModeToggle />

      </div>
    </header>
  );
}
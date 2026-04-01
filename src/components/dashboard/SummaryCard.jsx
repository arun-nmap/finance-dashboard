// src/components/dashboard/SummaryCard.jsx

import Card from "../common/Card";

export default function SummaryCard({ title, value, type }) {
  const styles = {
    income: {
      text: "text-green-600",
      bg: "bg-green-50 dark:bg-green-900/20",
      icon: "📈",
    },
    expense: {
      text: "text-red-500",
      bg: "bg-red-50 dark:bg-red-900/20",
      icon: "📉",
    },
    default: {
      text: "text-indigo-600",
      bg: "bg-indigo-50 dark:bg-indigo-900/20",
      icon: "💰",
    },
  };

  const current = styles[type] || styles.default;

  return (
    <Card className={`flex items-center justify-between ${current.bg}`}>

      {/* LEFT */}
      <div>
        <p className="text-sm text-gray-500">{title}</p>

        <h2 className={`text-2xl font-bold mt-1 ${current.text}`}>
          ₹{value}
        </h2>
      </div>

      {/* RIGHT ICON */}
      <div className="text-2xl">
        {current.icon}
      </div>

    </Card>
  );
}
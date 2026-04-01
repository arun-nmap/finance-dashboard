// src/components/dashboard/Charts.jsx

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Charts({ transactions }) {
  const categoryMap = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    }
  });

  const categoryData = Object.entries(categoryMap).map(
    ([name, value]) => ({ name, value })
  );

  const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444"];

  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm h-full">
      <h3 className="mb-4 font-semibold">Spending Breakdown</h3>

      {categoryData.length === 0 ? (
        <p className="text-sm text-gray-400 text-center mt-10">
          No expense data
        </p>
      ) : (
        <div className="h-[250px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={90}
                paddingAngle={3}
              >
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
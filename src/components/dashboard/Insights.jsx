// src/components/dashboard/Insights.jsx

import Card from "../common/Card";

export default function Insights({ transactions }) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expenses;

  // Category breakdown
  const categoryMap = {};
  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    }
  });

  const topCategory =
    Object.entries(categoryMap).sort((a, b) => b[1] - a[1])[0];

  const savingsRate = income
    ? ((balance / income) * 100).toFixed(1)
    : 0;

  return (
    <div className="grid md:grid-cols-3 gap-4 mt-6">

      {/* Top Category */}
      <Card>
        <p className="text-sm text-gray-500">Top Spending</p>
        <h3 className="text-lg font-semibold mt-1">
          {topCategory ? topCategory[0] : "N/A"}
        </h3>
        <p className="text-sm text-gray-500">
          ₹{topCategory ? topCategory[1] : 0}
        </p>
      </Card>

      {/* Savings */}
      <Card>
        <p className="text-sm text-gray-500">Savings</p>
        <h3 className="text-lg font-semibold mt-1">
          ₹{balance}
        </h3>
        <p className="text-sm text-gray-500">
          {savingsRate}% of income
        </p>
      </Card>

      {/* Smart Insight */}
      <Card>
        <p className="text-sm text-gray-500">Insight</p>
        <h3 className="text-sm mt-1">
          {expenses > income
            ? "⚠️ Your expenses exceed income"
            : "✅ Your spending is under control"}
        </h3>
      </Card>

    </div>
  );
}
// src/utils/calculations.js

/**
 * Calculate total income
 */
export const getTotalIncome = (transactions) => {
  return transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
};

/**
 * Calculate total expenses
 */
export const getTotalExpenses = (transactions) => {
  return transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
};

/**
 * Calculate balance
 */
export const getBalance = (transactions) => {
  const income = getTotalIncome(transactions);
  const expenses = getTotalExpenses(transactions);
  return income - expenses;
};

/**
 * Get highest spending category
 */
export const getTopCategory = (transactions) => {
  const categoryMap = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    }
  });

  const sorted = Object.entries(categoryMap).sort(
    (a, b) => b[1] - a[1]
  );

  return sorted[0] || null;
};
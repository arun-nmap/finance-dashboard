// src/api/mockApi.js

// Simulated in-memory database
let transactions = [
  {
    id: "1",
    date: "2026-03-01",
    amount: 5000,
    category: "Salary",
    type: "income",
  },
  {
    id: "2",
    date: "2026-03-02",
    amount: 1200,
    category: "Food",
    type: "expense",
  },
  {
    id: "3",
    date: "2026-03-05",
    amount: 800,
    category: "Transport",
    type: "expense",
  },
];

// Utility to simulate network delay
const delay = (ms = 600) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 📥 GET Transactions
 */
export const getTransactions = async () => {
  await delay();
  return [...transactions]; // return copy (avoid mutation bugs)
};

/**
 * ➕ ADD Transaction
 */
export const createTransaction = async (data) => {
  await delay();

  const newTransaction = {
    id: Date.now().toString(),
    ...data,
  };

  transactions.push(newTransaction);

  return newTransaction;
};

/**
 * ✏️ UPDATE Transaction
 */
export const updateTransaction = async (id, updatedData) => {
  await delay();

  transactions = transactions.map((t) =>
    t.id === id ? { ...t, ...updatedData } : t
  );

  return { success: true };
};

/**
 * ❌ DELETE Transaction
 */
export const deleteTransaction = async (id) => {
  await delay();

  transactions = transactions.filter((t) => t.id !== id);

  return { success: true };
};

/**
 * 🔍 FILTER Transactions (Optional API-style filtering)
 */
export const filterTransactions = async ({ type, category }) => {
  await delay();

  let result = [...transactions];

  if (type && type !== "all") {
    result = result.filter((t) => t.type === type);
  }

  if (category) {
    result = result.filter((t) =>
      t.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  return result;
};
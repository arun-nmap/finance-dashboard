// src/pages/Dashboard.jsx

import { useEffect, useState, useMemo } from "react";
import { useStore } from "../store/useStore";
import { useTransactions } from "../hooks/useTransactions";
import { useDarkMode } from "../hooks/useDarkMode";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import Container from "../components/layout/Container";

import SummaryCard from "../components/dashboard/SummaryCard";
import Charts from "../components/dashboard/Charts";

import TransactionList from "../components/transactions/TransactionList";
import TransactionModal from "../components/transactions/TransactionModal";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

export default function Dashboard() {
  const { role, activeTab } = useStore();

  const {
    transactions,
    loadTransactions,
    addTransaction,
    removeTransaction,
  } = useTransactions();

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  useDarkMode();

  useEffect(() => {
    loadTransactions();
  }, []);

  // 💰 Calculations
  const income = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "income")
        .reduce((a, b) => a + b.amount, 0),
    [transactions]
  );

  const expenses = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "expense")
        .reduce((a, b) => a + b.amount, 0),
    [transactions]
  );

  const balance = income - expenses;

  const savingsRate = income
    ? ((balance / income) * 100).toFixed(1)
    : 0;

  // 📊 Monthly Data
  const monthlyData = useMemo(() => {
    const map = {};

    transactions.forEach((t) => {
      const month = new Date(t.date).toLocaleString("default", {
        month: "short",
      });

      if (!map[month]) {
        map[month] = { month, income: 0, expense: 0 };
      }

      if (t.type === "income") map[month].income += t.amount;
      else map[month].expense += t.amount;
    });

    return Object.values(map);
  }, [transactions]);

  const comparisonData = [
    { name: "Income", value: income },
    { name: "Expense", value: expenses },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white">

      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <Container>

          {/* ================= DASHBOARD ================= */}
          {activeTab === "dashboard" && (
            <>
              {/* KPI */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
                <SummaryCard title="Balance" value={balance} />
                <SummaryCard title="Income" value={income} type="income" />
                <SummaryCard title="Expenses" value={expenses} type="expense" />
                <SummaryCard title="Savings %" value={savingsRate} />
              </div>

              {/* MAIN GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* TREND */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm">
                  <h3 className="mb-4 font-semibold">
                    Financial Trend
                  </h3>

                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="income"
                          stroke="#22c55e"
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="expense"
                          stroke="#ef4444"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* SIDE */}
                <div className="flex flex-col gap-4">

                  <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm">
                    <p className="text-sm text-gray-500">Transactions</p>
                    <h2 className="text-xl font-bold">
                      {transactions.length}
                    </h2>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm">
                    <p className="text-sm text-gray-500">Savings</p>
                    <h2 className="text-xl font-bold">
                      ₹{balance}
                    </h2>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm">
                    <p className="text-sm text-gray-500">Status</p>
                    <h2 className="text-sm font-semibold">
                      {expenses > income
                        ? "⚠️ Spending High"
                        : "✅ Healthy"}
                    </h2>
                  </div>
                </div>
              </div>

              {/* SECOND ROW */}
              <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* BAR */}
                <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm">
                  <h3 className="mb-4 font-semibold">
                    Income vs Expense
                  </h3>

                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={comparisonData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#6366f1" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* PIE */}
                <Charts transactions={transactions} />

              </div>
            </>
          )}

          {/* ================= TRANSACTIONS ================= */}
          {activeTab === "transactions" && (
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">

              <div className="flex justify-between mb-4">
                <h2 className="font-semibold text-lg">
                  Transactions
                </h2>

                {role === "admin" && (
                  <button
                    onClick={() => {
                      setEditData(null);
                      setOpen(true);
                    }}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
                  >
                    + Add
                  </button>
                )}
              </div>

              <TransactionList
                transactions={transactions}
                role={role}
                onEdit={(t) => {
                  setEditData(t);
                  setOpen(true);
                }}
                onDelete={(id) => removeTransaction(id)}
              />
            </div>
          )}

          {/* ================= INSIGHTS ================= */}
          {activeTab === "insights" && (
            <div className="grid md:grid-cols-2 gap-6">

              <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
                <h3 className="mb-3 font-semibold">
                  Financial Overview
                </h3>
                <p>Balance: ₹{balance}</p>
                <p>Income: ₹{income}</p>
                <p>Expenses: ₹{expenses}</p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
                <h3 className="mb-3 font-semibold">
                  Insight
                </h3>
                <p>Savings Rate: {savingsRate}%</p>
                <p>
                  {expenses > income
                    ? "Reduce spending"
                    : "Good financial health"}
                </p>
              </div>
            </div>
          )}

          {/* MODAL */}
          <TransactionModal
            open={open}
            editData={editData}
            onClose={() => setOpen(false)}
            onSave={(data) => addTransaction(data)}
          />

        </Container>
      </div>
    </div>
  );
}
// src/components/transactions/TransactionList.jsx

import { useState, useMemo } from "react";
import TransactionRow from "./TransactionRow";
import TransactionFilters from "./TransactionFilters";

export default function TransactionList({
  transactions,
  onEdit,
  onDelete,
  role,
}) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [sort, setSort] = useState("latest");

  // 🔍 Filter
  const filtered = useMemo(() => {
    return transactions.filter(
      (t) =>
        t.category.toLowerCase().includes(search.toLowerCase()) &&
        (type === "all" || t.type === type)
    );
  }, [transactions, search, type]);

  // 🔄 Sort
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sort === "high") return b.amount - a.amount;
      if (sort === "low") return a.amount - b.amount;
      return new Date(b.date) - new Date(a.date);
    });
  }, [filtered, sort]);

  return (
    <div className="mt-6 bg-white dark:bg-gray-800 p-5 rounded-xl shadow">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        
        <h2 className="text-lg font-semibold">
          Transactions ({sorted.length})
        </h2>

        {/* Sort Dropdown */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="p-2 border rounded-lg text-sm dark:bg-gray-700"
        >
          <option value="latest">Latest</option>
          <option value="high">Highest</option>
          <option value="low">Lowest</option>
        </select>
      </div>

      {/* Filters */}
      <TransactionFilters
        search={search}
        setSearch={setSearch}
        type={type}
        setType={setType}
      />

      {/* Empty State */}
      {sorted.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          <p className="text-lg">No transactions found</p>
          <p className="text-sm">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            {/* Table Head */}
            <thead className="text-gray-500 border-b sticky top-0 bg-white dark:bg-gray-800">
              <tr className="text-left">
                <th className="py-2">Date</th>
                <th className="py-2">Category</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Type</th>
                {role === "admin" && <th className="py-2">Actions</th>}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {sorted.map((t) => (
                <TransactionRow
                  key={t.id}
                  t={t}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  role={role}
                />
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}
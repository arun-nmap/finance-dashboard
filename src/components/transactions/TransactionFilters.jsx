// src/components/transactions/TransactionFilters.jsx

export default function TransactionFilters({
  search,
  setSearch,
  type,
  setType,
}) {
  return (
    <div className="flex flex-col md:flex-row gap-2 mb-4">
      <input
        placeholder="Search category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 border rounded w-full"
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="all">All</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
    </div>
  );
}
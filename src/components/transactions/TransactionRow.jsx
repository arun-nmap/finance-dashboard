// src/components/transactions/TransactionRow.jsx

import { formatDate, formatCurrency, capitalize } from "../../utils/formatters";

export default function TransactionRow({ t, onEdit, onDelete, role }) {
  return (
    <tr className="border-b hover:bg-gray-50 dark:hover:bg-gray-800 transition">

      {/* Date */}
      <td className="py-3 text-sm text-gray-500">
        {formatDate(t.date)}
      </td>

      {/* Category */}
      <td className="py-3">
        <span className="px-2 py-1 text-xs rounded-lg bg-gray-100 dark:bg-gray-700">
          {t.category}
        </span>
      </td>

      {/* Amount */}
      <td className="py-3 font-medium">
        {formatCurrency(t.amount)}
      </td>

      {/* Type Badge */}
      <td className="py-3">
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            t.type === "income"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {capitalize(t.type)}
        </span>
      </td>

      {/* Actions */}
      {role === "admin" && (
        <td className="py-3">
          <div className="flex gap-3">
            
            <button
              onClick={() => onEdit(t)}
              className="text-blue-500 hover:text-blue-700 transition"
              title="Edit"
            >
              ✏️
            </button>

            <button
              onClick={() => onDelete(t.id)}
              className="text-red-500 hover:text-red-700 transition"
              title="Delete"
            >
              🗑️
            </button>

          </div>
        </td>
      )}
    </tr>
  );
}
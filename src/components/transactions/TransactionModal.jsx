// src/components/transactions/TransactionModal.jsx

import { useState, useEffect } from "react";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";

export default function TransactionModal({
  open,
  onClose,
  onSave,
  editData,
}) {
  const initialState = {
    date: "",
    amount: "",
    category: "",
    type: "expense",
  };

  const [form, setForm] = useState(initialState);

  // Prefill for edit
  useEffect(() => {
    if (editData) {
      setForm(editData);
    } else {
      setForm(initialState);
    }
  }, [editData, open]);

  // Validation
  const isValid =
    form.date && form.amount > 0 && form.category.trim() !== "";

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">

      {/* Modal */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-xl">

        {/* Title */}
        <h2 className="mb-5 text-lg font-semibold">
          {editData ? "Edit Transaction" : "Add Transaction"}
        </h2>

        {/* Form */}
        <div className="flex flex-col gap-3">

          <Input
            label="Date"
            type="date"
            value={form.date}
            onChange={(e) =>
              setForm({ ...form, date: e.target.value })
            }
          />

          <Input
            label="Amount"
            placeholder="Enter amount"
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: +e.target.value })
            }
          />

          <Input
            label="Category"
            placeholder="e.g. Food, Salary"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          />

          <Select
            label="Type"
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value })
            }
            options={[
              { label: "Expense", value: "expense" },
              { label: "Income", value: "income" },
            ]}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-6">

          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>

          <Button
            onClick={() => {
              if (!isValid) return;
              onSave(form);
              onClose();
            }}
            className={`${
              !isValid ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
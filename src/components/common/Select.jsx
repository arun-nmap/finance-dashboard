// src/components/common/Select.jsx

export default function Select({
  label,
  value,
  onChange,
  options = [],
  className = "",
}) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-sm text-gray-500">{label}</label>}

      <select
        value={value}
        onChange={onChange}
        className={`p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${className}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
// src/components/common/Input.jsx

export default function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
}) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-sm text-gray-500">{label}</label>}

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${className}`}
      />
    </div>
  );
}
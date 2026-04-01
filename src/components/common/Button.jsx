// src/components/common/Button.jsx

export default function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  ...props
}) {
  const base =
    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200";

  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600",
    outline: "border border-gray-300 hover:bg-gray-100",
  };

  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
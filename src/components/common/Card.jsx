// src/components/common/Card.jsx

export default function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 shadow-sm rounded-xl p-4 ${className}`}
    >
      {children}
    </div>
  );
}
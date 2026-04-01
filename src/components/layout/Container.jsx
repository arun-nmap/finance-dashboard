// src/components/layout/Container.jsx

export default function Container({ children }) {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
      {children}
    </div>
  );
}
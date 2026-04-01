// src/utils/formatters.js

/**
 * Format currency (₹)
 */
export const formatCurrency = (amount) => {
  return `₹${amount.toLocaleString("en-IN")}`;
};

/**
 * Format date
 */
export const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

/**
 * Capitalize text
 */
export const capitalize = (text) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
};
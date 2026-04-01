// src/hooks/useTransactions.js

import { useStore } from "../store/useStore";
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../api/mockApi";

export const useTransactions = () => {
  const { transactions, setTransactions } = useStore();

  const loadTransactions = async () => {
    const data = await getTransactions();
    setTransactions(data);
  };

  const addTransaction = async (form) => {
    const newTx = await createTransaction(form);
    setTransactions([...transactions, newTx]);
  };

  const editTransaction = async (id, updated) => {
    await updateTransaction(id, updated);

    setTransactions(
      transactions.map((t) =>
        t.id === id ? { ...t, ...updated } : t
      )
    );
  };

  const removeTransaction = async (id) => {
    await deleteTransaction(id);

    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return {
    transactions,
    loadTransactions,
    addTransaction,
    editTransaction,
    removeTransaction,
  };
};
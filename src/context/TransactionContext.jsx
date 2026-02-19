import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const TransactionContext = createContext();

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
}

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useLocalStorage('transactions', []);
  const [selectedCategory, setSelectedCategory] = useLocalStorage('selectedCategory', 'all');
  const [dateFilter, setDateFilter] = useLocalStorage('dateFilter', {
    startDate: null,
    endDate: null,
    quickFilter: 'all'
  });

  // Default categories
  const defaultCategories = {
    expense: ['Food', 'Transport', 'Bills', 'Entertainment', 'Shopping', 'Other'],
    income: ['Salary', 'Freelance', 'Investment', 'Other']
  };

  // Add transaction
  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: crypto.randomUUID(),
      date: transaction.date || new Date().toISOString().split('T')[0]
    };
    setTransactions(prev => [...prev, newTransaction]);
  };

  // Delete transaction
  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  // Update transaction
  const updateTransaction = (id, updatedTransaction) => {
    setTransactions(prev => 
      prev.map(t => t.id === id ? { ...t, ...updatedTransaction } : t)
    );
  };

  // Get filtered transactions
  const getFilteredTransactions = () => {
    let filtered = [...transactions];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(t => t.category === selectedCategory);
    }

    // Filter by date range
    if (dateFilter.startDate || dateFilter.endDate) {
      filtered = filtered.filter(t => {
        const transactionDate = new Date(t.date);
        const start = dateFilter.startDate ? new Date(dateFilter.startDate) : null;
        const end = dateFilter.endDate ? new Date(dateFilter.endDate) : null;
        
        if (start && transactionDate < start) return false;
        if (end && transactionDate > end) return false;
        return true;
      });
    }

    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  // Get all unique categories
  const getAllCategories = () => {
    const categories = new Set();
    transactions.forEach(t => {
      if (t.category) categories.add(t.category);
    });
    return Array.from(categories).sort();
  };

  const value = {
    transactions,
    selectedCategory,
    dateFilter,
    defaultCategories,
    setSelectedCategory,
    setDateFilter,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    getFilteredTransactions,
    getAllCategories
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
}

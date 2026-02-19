import { useState } from 'react';
import { useTransactions } from '../context/TransactionContext';
import { formatDate } from '../utils/dateUtils';
import './TransactionList.css';

export default function TransactionList() {
  const { getFilteredTransactions, deleteTransaction } = useTransactions();
  const [sortBy, setSortBy] = useState('date'); // 'date' or 'amount'
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'

  const transactions = getFilteredTransactions();

  const sortedTransactions = [...transactions].sort((a, b) => {
    let comparison = 0;
    
    if (sortBy === 'date') {
      comparison = new Date(a.date) - new Date(b.date);
    } else if (sortBy === 'amount') {
      comparison = a.amount - b.amount;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="transaction-list-container">
        <h2>Transactions</h2>
        <div className="empty-state">
          <p>No transactions found. Add your first transaction above!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="transaction-list-container">
      <div className="list-header">
        <h2>Transactions ({transactions.length})</h2>
        <div className="sort-controls">
          <span>Sort by:</span>
          <button
            className={`sort-button ${sortBy === 'date' ? 'active' : ''}`}
            onClick={() => handleSort('date')}
          >
            Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
          <button
            className={`sort-button ${sortBy === 'amount' ? 'active' : ''}`}
            onClick={() => handleSort('amount')}
          >
            Amount {sortBy === 'amount' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
        </div>
      </div>
      
      <div className="transaction-list">
        {sortedTransactions.map(transaction => (
          <div key={transaction.id} className={`transaction-item ${transaction.type}`}>
            <div className="transaction-main">
              <div className="transaction-info">
                <div className="transaction-description">{transaction.description}</div>
                <div className="transaction-meta">
                  <span className="transaction-category">{transaction.category}</span>
                  <span className="transaction-date">{formatDate(transaction.date)}</span>
                </div>
              </div>
              <div className="transaction-amount">
                <span className={`amount ${transaction.type}`}>
                  {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                </span>
              </div>
            </div>
            <button
              className="delete-button"
              onClick={() => handleDelete(transaction.id)}
              aria-label="Delete transaction"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

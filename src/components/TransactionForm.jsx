import { useState } from 'react';
import { useTransactions } from '../context/TransactionContext';
import { getTodayDate } from '../utils/dateUtils';
import './TransactionForm.css';

export default function TransactionForm() {
  const { addTransaction, defaultCategories } = useTransactions();
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(getTodayDate());
  const [errors, setErrors] = useState({});

  const categories = defaultCategories[type] || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validation
    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    if (!description.trim()) {
      newErrors.description = 'Please enter a description';
    }
    if (!category) {
      newErrors.category = 'Please select a category';
    }
    if (!date) {
      newErrors.date = 'Please select a date';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Add transaction
    addTransaction({
      type,
      amount: parseFloat(amount),
      description: description.trim(),
      category,
      date
    });

    // Reset form
    setAmount('');
    setDescription('');
    setCategory('');
    setDate(getTodayDate());
    setErrors({});
  };

  const handleTypeChange = (newType) => {
    setType(newType);
    setCategory(''); // Reset category when type changes
    setErrors({});
  };

  return (
    <div className="transaction-form-container">
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit} className="transaction-form">
        <div className="form-group">
          <label>Type</label>
          <div className="type-buttons">
            <button
              type="button"
              className={`type-button ${type === 'expense' ? 'active expense' : ''}`}
              onClick={() => handleTypeChange('expense')}
            >
              Expense
            </button>
            <button
              type="button"
              className={`type-button ${type === 'income' ? 'active income' : ''}`}
              onClick={() => handleTypeChange('income')}
            >
              Income
            </button>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount *</label>
          <input
            type="number"
            id="amount"
            step="0.01"
            min="0.01"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              if (errors.amount) setErrors({ ...errors, amount: null });
            }}
            placeholder="0.00"
            className={errors.amount ? 'error' : ''}
          />
          {errors.amount && <span className="error-message">{errors.amount}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (errors.description) setErrors({ ...errors, description: null });
            }}
            placeholder="Enter description"
            className={errors.description ? 'error' : ''}
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="category">Category *</label>
          <select
            id="category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              if (errors.category) setErrors({ ...errors, category: null });
            }}
            className={errors.category ? 'error' : ''}
          >
            <option value="">Select category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <span className="error-message">{errors.category}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="date">Date *</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              if (errors.date) setErrors({ ...errors, date: null });
            }}
            className={errors.date ? 'error' : ''}
          />
          {errors.date && <span className="error-message">{errors.date}</span>}
        </div>

        <button type="submit" className="submit-button">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

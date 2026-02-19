import { useTransactions } from '../context/TransactionContext';
import './CategoryFilter.css';

export default function CategoryFilter() {
  const { selectedCategory, setSelectedCategory, getAllCategories, transactions } = useTransactions();
  
  const categories = getAllCategories();
  
  // Get transaction count per category
  const categoryCounts = categories.reduce((acc, cat) => {
    acc[cat] = transactions.filter(t => t.category === cat).length;
    return acc;
  }, {});

  return (
    <div className="category-filter-container">
      <h3>Filter by Category</h3>
      <div className="category-filter">
        <button
          className={`category-button ${selectedCategory === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('all')}
        >
          All Categories ({transactions.length})
        </button>
        {categories.map(category => (
          <button
            key={category}
            className={`category-button ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category} ({categoryCounts[category] || 0})
          </button>
        ))}
        {categories.length === 0 && (
          <p className="no-categories">No categories yet. Add transactions to see categories.</p>
        )}
      </div>
    </div>
  );
}

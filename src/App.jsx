import { TransactionProvider } from './context/TransactionContext';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import MonthlySummary from './components/MonthlySummary';
import CategoryFilter from './components/CategoryFilter';
import DateFilter from './components/DateFilter';
import Charts from './components/Charts';
import './App.css';

function App() {
  return (
    <TransactionProvider>
      <div className="app-container">
        <header className="app-header">
          <h1>💰 Expense Tracker</h1>
          <p>Track your income and expenses with ease</p>
        </header>

        <div className="app-content">
          <div className="date-filter-slot">
            <DateFilter />
          </div>

          <div className="category-filter-slot">
            <CategoryFilter />
          </div>

          <div className="app-main">
            <TransactionList />
            <TransactionForm />
          </div>
        </div>

        <MonthlySummary />
        <Charts />
      </div>
    </TransactionProvider>
  );
}

export default App;

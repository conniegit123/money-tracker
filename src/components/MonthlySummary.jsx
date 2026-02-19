import { useTransactions } from '../context/TransactionContext';
import { getMonthKey, getMonthYear } from '../utils/dateUtils';
import './MonthlySummary.css';

export default function MonthlySummary() {
  const { transactions } = useTransactions();

  // Group transactions by month
  const monthlyData = transactions.reduce((acc, transaction) => {
    const monthKey = getMonthKey(transaction.date);
    if (!acc[monthKey]) {
      acc[monthKey] = {
        month: monthKey,
        income: 0,
        expenses: 0,
        transactions: []
      };
    }
    
    if (transaction.type === 'income') {
      acc[monthKey].income += transaction.amount;
    } else {
      acc[monthKey].expenses += transaction.amount;
    }
    
    acc[monthKey].transactions.push(transaction);
    return acc;
  }, {});

  // Sort months descending (most recent first)
  const sortedMonths = Object.values(monthlyData).sort((a, b) => 
    b.month.localeCompare(a.month)
  );

  if (sortedMonths.length === 0) {
    return (
      <div className="monthly-summary-container">
        <h2>Monthly Summary</h2>
        <div className="empty-state">
          <p>No transactions yet. Add transactions to see monthly summaries.</p>
        </div>
      </div>
    );
  }

  // Calculate overall totals
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const netBalance = totalIncome - totalExpenses;

  return (
    <div className="monthly-summary-container">
      <h2>Monthly Summary</h2>
      
      <div className="overall-summary">
        <div className="summary-card income">
          <div className="summary-label">Total Income</div>
          <div className="summary-value">${totalIncome.toFixed(2)}</div>
        </div>
        <div className="summary-card expense">
          <div className="summary-label">Total Expenses</div>
          <div className="summary-value">${totalExpenses.toFixed(2)}</div>
        </div>
        <div className={`summary-card balance ${netBalance >= 0 ? 'positive' : 'negative'}`}>
          <div className="summary-label">Net Balance</div>
          <div className="summary-value">${netBalance.toFixed(2)}</div>
        </div>
      </div>

      <div className="monthly-breakdown">
        <h3>Monthly Breakdown</h3>
        {sortedMonths.map(monthData => {
          const monthNet = monthData.income - monthData.expenses;
          const previousMonth = sortedMonths.find(m => 
            m.month < monthData.month
          );
          
          let changePercentage = null;
          if (previousMonth) {
            const previousNet = previousMonth.income - previousMonth.expenses;
            if (previousNet !== 0) {
              changePercentage = ((monthNet - previousNet) / Math.abs(previousNet)) * 100;
            }
          }

          return (
            <div key={monthData.month} className="month-card">
              <div className="month-header">
                <h4>{getMonthYear(monthData.transactions[0].date)}</h4>
                {changePercentage !== null && (
                  <span className={`change-indicator ${changePercentage >= 0 ? 'positive' : 'negative'}`}>
                    {changePercentage >= 0 ? '↑' : '↓'} {Math.abs(changePercentage).toFixed(1)}%
                  </span>
                )}
              </div>
              <div className="month-stats">
                <div className="month-stat">
                  <span className="stat-label">Income:</span>
                  <span className="stat-value income">${monthData.income.toFixed(2)}</span>
                </div>
                <div className="month-stat">
                  <span className="stat-label">Expenses:</span>
                  <span className="stat-value expense">${monthData.expenses.toFixed(2)}</span>
                </div>
                <div className="month-stat">
                  <span className="stat-label">Net:</span>
                  <span className={`stat-value ${monthNet >= 0 ? 'positive' : 'negative'}`}>
                    ${monthNet.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { useTransactions } from '../context/TransactionContext';
import { getMonthKey, getMonthYear } from '../utils/dateUtils';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title
} from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';
import './Charts.css';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title
);

export default function Charts() {
  const { transactions } = useTransactions();

  if (transactions.length === 0) {
    return (
      <div className="charts-container">
        <h2>Charts & Analytics</h2>
        <div className="empty-state">
          <p>Add transactions to see visualizations.</p>
        </div>
      </div>
    );
  }

  // Prepare expense data by category for pie chart
  const expenseTransactions = transactions.filter(t => t.type === 'expense');
  const expenseByCategory = expenseTransactions.reduce((acc, transaction) => {
    const category = transaction.category || 'Other';
    acc[category] = (acc[category] || 0) + transaction.amount;
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(expenseByCategory),
    datasets: [
      {
        label: 'Expenses by Category',
        data: Object.values(expenseByCategory),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6384',
          '#C9CBCF'
        ],
        borderWidth: 2,
        borderColor: '#fff'
      }
    ]
  };

  // Prepare monthly data for bar chart
  const monthlyData = transactions.reduce((acc, transaction) => {
    const monthKey = getMonthKey(transaction.date);
    if (!acc[monthKey]) {
      acc[monthKey] = { income: 0, expenses: 0, month: monthKey };
    }
    if (transaction.type === 'income') {
      acc[monthKey].income += transaction.amount;
    } else {
      acc[monthKey].expenses += transaction.amount;
    }
    return acc;
  }, {});

  const sortedMonths = Object.values(monthlyData).sort((a, b) => 
    a.month.localeCompare(b.month)
  );

  const barData = {
    labels: sortedMonths.map(m => {
      const firstTransaction = transactions.find(t => getMonthKey(t.date) === m.month);
      return firstTransaction ? getMonthYear(firstTransaction.date) : m.month;
    }),
    datasets: [
      {
        label: 'Income',
        data: sortedMonths.map(m => m.income),
        backgroundColor: '#4BC0C0',
        borderColor: '#4BC0C0',
        borderWidth: 1
      },
      {
        label: 'Expenses',
        data: sortedMonths.map(m => m.expenses),
        backgroundColor: '#FF6384',
        borderColor: '#FF6384',
        borderWidth: 1
      }
    ]
  };

  // Prepare spending trends for line chart
  const sortedTransactions = [...transactions].sort((a, b) => 
    new Date(a.date) - new Date(b.date)
  );

  const dailySpending = sortedTransactions.reduce((acc, transaction) => {
    if (transaction.type === 'expense') {
      const date = transaction.date;
      acc[date] = (acc[date] || 0) + transaction.amount;
    }
    return acc;
  }, {});

  const lineData = {
    labels: Object.keys(dailySpending).sort(),
    datasets: [
      {
        label: 'Daily Expenses',
        data: Object.keys(dailySpending).sort().map(date => dailySpending[date]),
        borderColor: '#FF6384',
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label || context.label}: $${context.parsed.y?.toFixed(2) || context.parsed.toFixed(2)}`;
          }
        }
      }
    }
  };

  return (
    <div className="charts-container">
      <h2>Charts & Analytics</h2>
      
      <div className="charts-grid">
        {expenseTransactions.length > 0 && (
          <div className="chart-card">
            <h3>Expenses by Category</h3>
            <div className="chart-wrapper">
              <Pie data={pieData} options={chartOptions} />
            </div>
          </div>
        )}

        {sortedMonths.length > 0 && (
          <div className="chart-card">
            <h3>Monthly Income vs Expenses</h3>
            <div className="chart-wrapper">
              <Bar data={barData} options={chartOptions} />
            </div>
          </div>
        )}

        {Object.keys(dailySpending).length > 0 && (
          <div className="chart-card">
            <h3>Spending Trends</h3>
            <div className="chart-wrapper">
              <Line data={lineData} options={chartOptions} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

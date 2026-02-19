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

  // Neutral color palette with accent color variations
  const neutralColors = [
    '#6366f1', // Accent color
    '#a3a3a3', // Gray
    '#737373', // Darker gray
    '#d4d4d4', // Light gray
    '#525252', // Medium gray
    '#e5e5e5', // Very light gray
    '#171717', // Dark
    '#f5f5f5'  // Lightest gray
  ];

  const pieData = {
    labels: Object.keys(expenseByCategory),
    datasets: [
      {
        label: 'Expenses by Category',
        data: Object.values(expenseByCategory),
        backgroundColor: neutralColors.slice(0, Object.keys(expenseByCategory).length),
        borderWidth: 1,
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
        backgroundColor: '#6366f1',
        borderColor: '#6366f1',
        borderWidth: 1
      },
      {
        label: 'Expenses',
        data: sortedMonths.map(m => m.expenses),
        backgroundColor: '#737373',
        borderColor: '#737373',
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
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
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
        labels: {
          color: '#525252',
          font: {
            size: 12,
            weight: 500
          },
          padding: 12,
          usePointStyle: true
        }
      },
      tooltip: {
        backgroundColor: '#171717',
        titleColor: '#f5f5f5',
        bodyColor: '#f5f5f5',
        borderColor: '#e5e5e5',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label || context.label}: $${context.parsed.y?.toFixed(2) || context.parsed.toFixed(2)}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: '#f5f5f5'
        },
        ticks: {
          color: '#737373'
        }
      },
      y: {
        grid: {
          color: '#f5f5f5'
        },
        ticks: {
          color: '#737373'
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

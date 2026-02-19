# 💰 Expense Tracker

A modern, responsive web application built with React for tracking income and expenses. Features include monthly summaries, category filtering, date filtering, and interactive charts for visualizing your financial data.

## Features

- **Transaction Management**
  - Add income and expense transactions
  - Delete transactions
  - Form validation for data integrity

- **Monthly Summary**
  - Total income and expenses
  - Net balance calculation
  - Monthly breakdown with percentage changes
  - Visual cards for quick overview

- **Filtering & Sorting**
  - Filter transactions by category
  - Filter by date range (This Month, Last Month, This Year, Custom Range)
  - Sort transactions by date or amount

- **Data Visualization**
  - Pie chart: Expense breakdown by category
  - Bar chart: Monthly income vs expenses comparison
  - Line chart: Daily spending trends over time

- **Data Persistence**
  - All data stored in browser localStorage
  - Data persists across browser sessions
  - No backend required

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Chart.js + react-chartjs-2** - Data visualization
- **localStorage** - Data persistence
- **CSS3** - Styling with modern design

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone or download this repository

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory. You can preview the production build with:

```bash
npm run preview
```

## Usage

### Adding Transactions

1. Select transaction type (Income or Expense)
2. Enter the amount
3. Add a description
4. Select a category
5. Choose a date (defaults to today)
6. Click "Add Transaction"

### Filtering Transactions

- **By Category**: Click on any category button to filter transactions
- **By Date**: Use quick filters (This Month, Last Month, etc.) or set a custom date range

### Viewing Summaries

- The Monthly Summary section shows:
  - Overall totals (Income, Expenses, Net Balance)
  - Monthly breakdown with percentage changes
- Charts section provides visual insights into your spending patterns

## Default Categories

**Expense Categories:**
- Food
- Transport
- Bills
- Entertainment
- Shopping
- Other

**Income Categories:**
- Salary
- Freelance
- Investment
- Other

## Data Storage

All transaction data is stored locally in your browser's localStorage. This means:
- Your data stays private (never sent to any server)
- Data persists across browser sessions
- Clearing browser data will remove your transactions
- Consider exporting important data periodically

## Project Structure

```
expense-tracker/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── TransactionForm.jsx      # Form to add transactions
│   │   ├── TransactionList.jsx      # List of transactions
│   │   ├── MonthlySummary.jsx       # Monthly totals and breakdown
│   │   ├── CategoryFilter.jsx       # Category filtering
│   │   ├── DateFilter.jsx           # Date range filtering
│   │   └── Charts.jsx               # Data visualizations
│   ├── context/
│   │   └── TransactionContext.jsx   # Global state management
│   ├── hooks/
│   │   └── useLocalStorage.js       # localStorage hook
│   ├── utils/
│   │   └── dateUtils.js             # Date helper functions
│   ├── App.jsx                      # Main app component
│   ├── App.css                      # Main styles
│   └── main.jsx                     # Entry point
├── package.json
└── README.md
```

## Browser Support

This app works on all modern browsers that support:
- ES6+ JavaScript
- localStorage API
- CSS Grid and Flexbox

## License

This project is open source and available for personal use.

## Contributing

Feel free to fork this project and customize it for your needs!

## Future Enhancements

Potential features for future versions:
- Export data to CSV/JSON
- Import transactions from files
- Recurring transactions
- Budget setting and tracking
- Multiple currency support
- Dark mode toggle
- Transaction editing
- Search functionality

import { useTransactions } from '../context/TransactionContext';
import { 
  getStartOfCurrentMonth, 
  getStartOfLastMonth, 
  getEndOfLastMonth,
  getStartOfCurrentYear,
  getTodayDate
} from '../utils/dateUtils';
import './DateFilter.css';

export default function DateFilter() {
  const { dateFilter, setDateFilter } = useTransactions();

  const handleQuickFilter = (filterType) => {
    let startDate = null;
    let endDate = null;

    switch (filterType) {
      case 'thisMonth':
        startDate = getStartOfCurrentMonth();
        endDate = getTodayDate();
        break;
      case 'lastMonth':
        startDate = getStartOfLastMonth();
        endDate = getEndOfLastMonth();
        break;
      case 'thisYear':
        startDate = getStartOfCurrentYear();
        endDate = getTodayDate();
        break;
      case 'all':
      default:
        startDate = null;
        endDate = null;
        break;
    }

    setDateFilter({
      startDate,
      endDate,
      quickFilter: filterType
    });
  };

  const handleDateChange = (field, value) => {
    setDateFilter({
      ...dateFilter,
      [field]: value || null,
      quickFilter: 'custom'
    });
  };

  return (
    <div className="date-filter-container">
      <h3>Filter by Date</h3>
      
      <div className="quick-filters">
        <button
          className={`quick-filter-button ${dateFilter.quickFilter === 'all' ? 'active' : ''}`}
          onClick={() => handleQuickFilter('all')}
        >
          All Time
        </button>
        <button
          className={`quick-filter-button ${dateFilter.quickFilter === 'thisMonth' ? 'active' : ''}`}
          onClick={() => handleQuickFilter('thisMonth')}
        >
          This Month
        </button>
        <button
          className={`quick-filter-button ${dateFilter.quickFilter === 'lastMonth' ? 'active' : ''}`}
          onClick={() => handleQuickFilter('lastMonth')}
        >
          Last Month
        </button>
        <button
          className={`quick-filter-button ${dateFilter.quickFilter === 'thisYear' ? 'active' : ''}`}
          onClick={() => handleQuickFilter('thisYear')}
        >
          This Year
        </button>
      </div>

      <div className="custom-date-range">
        <h4>Custom Range</h4>
        <div className="date-inputs">
          <div className="date-input-group">
            <label htmlFor="startDate">From:</label>
            <input
              type="date"
              id="startDate"
              value={dateFilter.startDate || ''}
              onChange={(e) => handleDateChange('startDate', e.target.value)}
            />
          </div>
          <div className="date-input-group">
            <label htmlFor="endDate">To:</label>
            <input
              type="date"
              id="endDate"
              value={dateFilter.endDate || ''}
              onChange={(e) => handleDateChange('endDate', e.target.value)}
              max={getTodayDate()}
            />
          </div>
        </div>
        {(dateFilter.startDate || dateFilter.endDate) && (
          <button
            className="clear-filter-button"
            onClick={() => handleQuickFilter('all')}
          >
            Clear Filter
          </button>
        )}
      </div>
    </div>
  );
}

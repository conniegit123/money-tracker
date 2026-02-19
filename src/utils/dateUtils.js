// Format date to readable string
export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

// Get month-year string from date
export function getMonthYear(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long' 
  });
}

// Get month-year key for grouping (YYYY-MM format)
export function getMonthKey(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
}

// Get start of month
export function getStartOfMonth(dateString) {
  const date = new Date(dateString);
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

// Get end of month
export function getEndOfMonth(dateString) {
  const date = new Date(dateString);
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

// Check if date is within range
export function isDateInRange(dateString, startDate, endDate) {
  const date = new Date(dateString);
  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;
  
  if (start && date < start) return false;
  if (end && date > end) return false;
  return true;
}

// Get today's date in YYYY-MM-DD format
export function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Get start of current month
export function getStartOfCurrentMonth() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}-01`;
}

// Get start of last month
export function getStartOfLastMonth() {
  const today = new Date();
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const year = lastMonth.getFullYear();
  const month = String(lastMonth.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}-01`;
}

// Get end of last month
export function getEndOfLastMonth() {
  const today = new Date();
  const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
  const year = lastMonth.getFullYear();
  const month = String(lastMonth.getMonth() + 1).padStart(2, '0');
  const day = String(lastMonth.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Get start of current year
export function getStartOfCurrentYear() {
  const today = new Date();
  return `${today.getFullYear()}-01-01`;
}

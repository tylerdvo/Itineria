// Date formatting
export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Time formatting
  export const formatTime = (timeString) => {
    if (!timeString) return '';
    
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };
  
  // Trip duration calculation (in days)
  export const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1; // Include both start and end dates
  };
  
  // Truncate text with ellipsis
  export const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };
  
  // Group activities by day
  export const groupActivitiesByDay = (activities) => {
    if (!activities || !activities.length) return [];
  
    const groupedActivities = activities.reduce((groups, activity) => {
      const date = new Date(activity.date).toISOString().split('T')[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(activity);
      return groups;
    }, {});
  
    // Sort activities within each day by start time
    Object.keys(groupedActivities).forEach((date) => {
      groupedActivities[date].sort((a, b) => {
        if (!a.startTime) return 1;
        if (!b.startTime) return -1;
        return a.startTime.localeCompare(b.startTime);
      });
    });
  
    // Convert to array sorted by date
    return Object.keys(groupedActivities)
      .sort()
      .map((date) => ({
        date,
        activities: groupedActivities[date],
      }));
  };
  
  // Get category icon name based on activity category
  export const getCategoryIcon = (category) => {
    switch (category) {
      case 'sightseeing':
        return 'photo_camera';
      case 'food':
        return 'restaurant';
      case 'shopping':
        return 'shopping_bag';
      case 'entertainment':
        return 'theater_comedy';
      case 'nature':
        return 'park';
      case 'culture':
        return 'museum';
      case 'relaxation':
        return 'spa';
      case 'transportation':
        return 'directions_car';
      default:
        return 'place';
    }
  };
  
  // Format currency
  export const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount);
  };
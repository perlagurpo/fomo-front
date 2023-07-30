export const buildQueryString = (searchValue, filters) => {
    const { category, format, event_type, start_date, end_date } = filters;
    const queryParams = [];
  
    if (searchValue) {
      queryParams.push(`search=${encodeURIComponent(searchValue)}`);
    }
    if (category) {
      queryParams.push(`category=${encodeURIComponent(category)}`);
    }
    if (format) {
      queryParams.push(`format=${encodeURIComponent(format)}`);
    }
    if (event_type) {
      queryParams.push(`event_type=${encodeURIComponent(event_type)}`);
    }
    if (start_date) {
      queryParams.push(`start_date=${encodeURIComponent(start_date)}`);
    }
    if (end_date) {
      queryParams.push(`end_date=${encodeURIComponent(end_date)}`);
    }
  
    return queryParams.join('&');
}
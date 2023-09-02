'use client'
import { useState } from 'react';
import HomeBanner from '@/components/home/homeBanner';
import SearchBar from '@/components/home/searchBar';
import SearchFilters from '@/components/home/searchFilters';
import FeaturedEvents from '@/components/home/featuredEvents';

export default function Home() {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilters, setSearchFilters] = useState({
    category: '',
    format: '',
    event_type: '',
    start_date: '',
    end_date: ''
  });

  const toggleFilters = () => {
    setShowFilters(!showFilters);
    setSearchFilters({category: '', format: '', event_type: '', start_date: '', end_date: ''});
  };

  const handleSearch = (searchValue) => {
    if (!searchValue && Object.values(searchFilters).every(value => value === "")) {
      return "Debés establecer al menos una búsqueda o agregar un filtro";
    }
    const queryStringWithFilters = buildQueryString(searchValue, searchFilters);
    setSearchQuery(queryStringWithFilters);
    toggleFilters();
  };

  const handleFiltersChange = (newFilters) => {
    setSearchFilters(newFilters);
  };

  const buildQueryString = (searchValue, filters) => {
    const { category, format, event_type, start_date, end_date } = filters;
    const queryParams = [];
  
    if (searchValue) {
      queryParams.push(`event_name=${encodeURIComponent(searchValue)}`);
    }
    if (category) {
      queryParams.push(`category=${encodeURIComponent(category)}`);
    }
/*     if (format) {
      queryParams.push(`format=${encodeURIComponent(format)}`);
    } */
/*     if (event_type) {
      queryParams.push(`event_type=${encodeURIComponent(event_type)}`);
    } */
    if (start_date) {
      queryParams.push(`start_date=${encodeURIComponent(start_date)}`);
    }
    if (end_date) {
      queryParams.push(`end_date=${encodeURIComponent(end_date)}`);
    }
    
    return queryParams.join('&');
  }

  return (
    <main className="flex flex-col items-center justify-start min-h-screen bg-fomo-sec-white font-poppins">
      {showFilters ? '' : <HomeBanner />}
      <SearchBar onToggleFilters={toggleFilters} onSearch={handleSearch} showFilters={showFilters} />
      {showFilters ? (
        <SearchFilters filters={searchFilters} onFiltersChange={handleFiltersChange} />
      ) : (
        <FeaturedEvents searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      )}
    </main>
  );
}
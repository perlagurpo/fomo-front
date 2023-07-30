'use client'
import React, { useState, useEffect } from 'react';
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
  });

  const toggleFilters = () => {
    setShowFilters(!showFilters);
    setSearchFilters({category: '', format: '', event_type: '', start_date: ''});
  };

  const handleSearch = (searchValue) => {
    const queryStringWithFilters = buildQueryString(searchValue, searchFilters);
    setSearchQuery(queryStringWithFilters);
  };

  const handleFiltersChange = (newFilters) => {
    setSearchFilters(newFilters);
  };

  const buildQueryString = (searchValue, filters) => {
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

  return (
    <main className="flex flex-col items-center justify-between bg-fomo-sec-white font-poppins">
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
'use client'
import { useState } from 'react';
import HomeBanner from '@/components/home/homeBanner';
import SearchBar from '@/components/home/searchBar';
import SearchFilters from '@/components/home/searchFilters';
import FeaturedEvents from '@/components/home/featuredEvents';
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter();

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
    let queryStringWithFilters = '';
    if (searchValue === false) {
      queryStringWithFilters = buildQueryString('', { category: '', format: '', event_type: '', start_date: '', end_date: '' });
      setSearchQuery(queryStringWithFilters);
    } else {
      queryStringWithFilters = buildQueryString(searchValue, searchFilters);
      setSearchQuery(queryStringWithFilters);
    }

    router.push(`/eventos?${queryStringWithFilters}`);
    // toggleFilters();
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
    <main className="flex flex-col items-center min-h-screen bg-fomo-sec-white font-poppins">
      {showFilters ? '' : <HomeBanner />}
      <div className="w-full max-w-screen-xl mx-auto p-4 md:pb-4 xl:px-72 lg:px-60 flex md:px-48 sm:px-36 xs:px-24 justify-center">
        <SearchBar onToggleFilters={toggleFilters} onSearch={handleSearch} showFilters={showFilters} />
      </div>
      {showFilters ? (
        <SearchFilters filters={searchFilters} onFiltersChange={handleFiltersChange} />
      ) : (
        <FeaturedEvents />
      )}
    </main>
  );
}
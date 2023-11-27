'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import HomeBanner from '@/components/home/homeBanner';
import SearchBar from '@/components/home/searchBar';
import SearchFilters from '@/components/home/searchFilters';
import FeaturedEvents from '@/components/home/featuredEvents';
import { buildQueryString } from '@/components/utils/filterOperations';
import SponsorBanner from '@/components/utils/sponsorsBanner';

export default function Home() {
  const router = useRouter();

  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilters, setSearchFilters] = useState({
    category: '',
    format: '',
    event_type: '',
    start_date: '',
    end_date: '',
    page: 1
  });

  const toggleFilters = () => {
    setShowFilters(!showFilters);
    setSearchFilters({category: '', format: '', event_type: '', start_date: '', end_date: '', page: 1});
  };

  const handleSearch = (searchValue) => {
    let queryStringWithFilters = '';
    if (searchValue === false) {
      queryStringWithFilters = buildQueryString('', { category: '', format: '', event_type: '', start_date: '', end_date: '', page: 1 });
      setSearchQuery(queryStringWithFilters);
    } else {
      queryStringWithFilters = buildQueryString(searchValue, searchFilters);
      setSearchQuery(queryStringWithFilters);
    }

    router.push(`/eventos?${queryStringWithFilters}`);
  };

  const handleFiltersChange = (newFilters) => {
    setSearchFilters(newFilters);
  };

  return (
    <main className="flex flex-col items-center min-h-screen bg-fomo-sec-white font-poppins relative">
      {showFilters ? '' : <HomeBanner />}
      <div className="w-full max-w-screen-xl mx-auto p-4 md:pb-4 xl:px-72 lg:px-60 flex md:px-48 sm:px-36 xs:px-24 justify-center">
        <SearchBar onToggleFilters={toggleFilters} onSearch={handleSearch} showFilters={showFilters} />
      </div>
      {showFilters ? (
        <SearchFilters filters={searchFilters} onFiltersChange={handleFiltersChange} />
      ) : (
        <FeaturedEvents />
      )}
      <div className='relative block pb-4 md:absolute md:w-[140px] lg:w-[160px] xl:w-[180px] md:top-[50%] md:right-[2%] md:-translate-y-1/2 md:mr-6 lg:mr-10 md:pb-0'>
        <SponsorBanner />
      </div>
    </main>
  );
}
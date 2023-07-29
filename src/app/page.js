'use client'
import React, { useState } from 'react';
import HomeBanner from '@/components/home/homeBanner';
import SearchBar from '@/components/home/searchBar';
import SearchFilters from '@/components/home/searchFilters';
import FeaturedEvents from '@/components/home/featuredEvents';

export default function Home() {
  const [showFilters, setShowFilters] = useState(false);

  // Function to toggle the visibility of filters
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <main className="flex flex-col items-center justify-between bg-fomo-sec-white font-poppins">
      <HomeBanner />
      <SearchBar onToggleFilters={toggleFilters} />
      {showFilters ? (<SearchFilters />) : (<FeaturedEvents />)}
    </main>
  );
}
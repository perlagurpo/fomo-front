'use client';
import { useEffect, useState } from 'react';
import EventService from '../api/event.service';
import { buildQueryString } from '@/components/utils/filterOperations';
import SearchBar from '@/components/eventList/searchBar';
import Sidebar from '@/components/eventList/sideBar';
import EventList from '@/components/eventList/eventList';

function Eventos() {
  const [events, setEvents] = useState([]);
  const [name, setName] = useState("");
  const [filters, setFilters] = useState({
    start_date: '',
    end_date: '',
    category: []
  });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(
    () => {
      async function getEvents(searchQuery) {
        const fetchedEvents = await EventService.getEvents(searchQuery);
        setEvents(fetchedEvents);
      }
      getEvents(searchQuery);
    }
  ,[searchQuery]);

  const handleSearch = (searchValue) => {
    var adaptedFilters = {...filters};
    adaptedFilters["category"] = adaptedFilters["category"].join(','); // array a string
    const queryStringWithFilters = buildQueryString(searchValue, filters);
    setName(searchValue);
    setSearchQuery(queryStringWithFilters);
  };

  return(
    <div className="relative flex flex-col min-h-screen bg-fomo-sec-white py-[1%] text-fomo-sec-two">
      <div className="z-20">
        <Sidebar filters={filters} setFilters={setFilters} />
      </div>
      <SearchBar onSearch={handleSearch} />
      {
        name && <h2 className="text-2xl text-center py-4">{ `Eventos que coinciden con tu búsqueda "${ name }"` }</h2>
      }
      <div className="flex flex-col px-[20%] py-[5%] z-10">
        <EventList events={events} />
      </div>
    </div>
  );

}

export default Eventos;
'use client';
import { useEffect, useState } from 'react';
import EventService from '../api/event.service';
import { buildQueryString } from '@/components/utils/filterOperations';
import SearchBar from '@/components/eventList/searchBar';
import Sidebar from '@/components/eventList/sideBar';
import EventList from '@/components/eventList/eventList';
import { LoadingSpinner } from '@/components/icons/icons';
import { useSearchParams } from 'next/navigation';

function Eventos() {
  const [events, setEvents] = useState([]);
  const [name, setName] = useState("");
  const [filters, setFilters] = useState({
    event_name: '',
    start_date: '',
    end_date: '',
    category: []
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    urlUsage(searchParams);
  }, [searchParams]);

  const urlUsage = (params) => {
    if (typeof params === 'string') {
      console.log('typeof!');
      params = new URLSearchParams(params);
    }
    
    const eventName = params.get('event_name');
    const category = params.get('category'); 
    const startDate = params.get('start_date');
    const endDate = params.get('end_date');
    console.log(category);

    // Set the filters based on the decoded parameters
    setFilters({
      event_name: eventName || '',
      start_date: startDate || '',
      end_date: endDate || '',
      category: category || []
    });

    handleSearch(eventName);
    // Build the searchQuery with the decoded event_name and filters
    const queryStringWithFilters = buildQueryString(eventName, {
      start_date: startDate || '',
      end_date: endDate || '',
      category: category || []
    });

    setLoading(true);

    // Call the API with the searchQuery
    async function getEvents() {
      const fetchedEvents = await EventService.getEvents(queryStringWithFilters);
      setEvents(fetchedEvents.results);
      setLoading(false);
    }

    getEvents();
  }

  const handleSearch = (searchValue) => {
    let queryStringWithFilters = '';
    if (searchValue === false) {
      queryStringWithFilters = buildQueryString('', filters);
      setSearchQuery(queryStringWithFilters);
    } else {
      queryStringWithFilters = buildQueryString(searchValue, filters);
      setSearchQuery(queryStringWithFilters);
    }
  };

  return(
    <div className="relative flex flex-col min-h-screen bg-fomo-sec-white py-[1%] text-fomo-sec-two">
      
      <SearchBar onSearch={handleSearch} />
      <div className="z-20">
        <Sidebar filters={filters} setFilters={setFilters} urlUsage={urlUsage} />
      </div>
      
      {
        loading ? 
          <div className={"self-center my-[15%]"}>
            <LoadingSpinner size={12} />
          </div>
          : 
          ( 
            name && 
              <h2 className="text-2xl text-center py-4 px-4 md:px-0">
                { events.length > 0 ? `Eventos que coinciden con tu búsqueda "${ name }"` : "¡Lo sentimos! no hay eventos que coincidan con tu búsqueda"}
              </h2>
          )
      }
      <div className="flex flex-col px-6 py-10 md:px-[30%] md:py-[5%] z-5">
        <EventList events={events} />
      </div>
    </div>
  );

}

export default Eventos;
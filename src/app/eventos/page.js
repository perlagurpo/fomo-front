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
    start_date: '',
    end_date: '',
    category: []
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();


  useEffect(() => {
    const eventName = searchParams.get('event_name');
    const category = searchParams.get('category'); 
    const startDate = searchParams.get('start_date');
    const endDate = searchParams.get('end_date');

    // Set the filters based on the decoded parameters
    setFilters({
      start_date: startDate || '',
      end_date: endDate || '',
      category: category || []
    });

    // Build the searchQuery with the decoded event_name and filters
    const queryStringWithFilters = buildQueryString(eventName, {
      start_date: startDate || '',
      end_date: endDate || '',
      category: category || []
    });

    setName(eventName);
    setLoading(true);

    // Call the API with the searchQuery
    async function getEvents() {
      const fetchedEvents = await EventService.getEvents(queryStringWithFilters);
      setEvents(fetchedEvents.results);
      setLoading(false);
    }

    getEvents();
  }, [searchParams]);

  const handleSearch = (searchValue) => {
    var adaptedFilters = {...filters};
    adaptedFilters["category"] = adaptedFilters["category"].join(','); // array a string
    const queryStringWithFilters = buildQueryString(searchValue, filters);
    setName(searchValue);
    setSearchQuery(queryStringWithFilters);
  };

  return(
    <div className="relative flex flex-col min-h-screen bg-fomo-sec-white py-[1%] text-fomo-sec-two">
      
      <SearchBar onSearch={handleSearch} />
      <div className="z-20">
        <Sidebar filters={filters} setFilters={setFilters} />
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
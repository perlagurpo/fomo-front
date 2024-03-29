'use client';
import { useEffect, useState } from 'react';
import EventService from '../api/event.service';
import { buildQueryString } from '@/components/utils/filterOperations';
import SearchBar from '@/components/home/searchBar';
import Sidebar from '@/components/eventList/sideBar';
import EventList from '@/components/eventList/eventList';
import { LoadingSpinner } from '@/components/icons/icons';
import { useRouter, useSearchParams } from 'next/navigation';
import useDeviceSize from '@/hooks/useDeviceSize';

function Eventos() {
  const [windowWidth, windowHeight] = useDeviceSize();

  const [events, setEvents] = useState([]);
  const [name, setName] = useState("");
  const [filters, setFilters] = useState({
    event_name: '',
    start_date: '',
    end_date: '',
    category: [],
    page: 1
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchValueFromUrl, setSearchValueFromUrl] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEventsCount, setTotalEventsCount] = useState(1);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    urlUsage(searchParams);
  }, [searchParams]);

  const urlUsage = (params) => {
    if (typeof params === 'string') {
      params = new URLSearchParams(params);
    }
    
    const eventName = params.get('event_name');
    const category = params.get('category'); 
    const startDate = params.get('start_date');
    const endDate = params.get('end_date');
    const page = params.get('page');
    setSearchValueFromUrl(eventName);

    setFilters({
      event_name: eventName || '',
      start_date: startDate || '',
      end_date: endDate || '',
      category: category || [],
      page: page || 1,
    });

    handleSearch(eventName);
    const queryStringWithFilters = buildQueryString(eventName, {
      start_date: startDate || '',
      end_date: endDate || '',
      category: category || [],
      page: page || currentPage,
    });

    setLoading(true);

    // Call the API with the searchQuery
    async function getEvents() {
      const fetchedEvents = await EventService.getEvents(queryStringWithFilters);
      setEvents(fetchedEvents.results);
      setTotalEventsCount(fetchedEvents.count);
      setTotalPages(fetchedEvents.count_total_page);
      setCurrentPage(parseInt(fetchedEvents.actual_page));

      // parte del fix q se agregó a event service de buscar desde paginas distintas a 1
      const currentParams = new URLSearchParams(searchParams.toString());
      if (fetchedEvents.actual_page != currentParams.get('page')) {
        setFilters({
          event_name: currentParams.get('event_name') || '',
          start_date: currentParams.get('start_date') || '',
          end_date: currentParams.get('end_date') || '',
          category: currentParams.get('category') || '',
          page: fetchedEvents.actual_page,
        })
      } 

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
    router.push(`/eventos?${queryStringWithFilters}`);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    const updatedParams = new URLSearchParams(searchParams.toString());
    updatedParams.set('page', newPage.toString());
    urlUsage(updatedParams);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };
  
  const searchBarWidth = {
    minWidth: windowWidth > 300 ? '240px' : ''
  }

  const marginAuto = windowWidth > 1300 ? 'mx-auto' : '';

  const eventsContainerPadding = windowWidth > 768 ? 'pl-4' : 'px-4';

  const eventsContainerMinWidth = {
    minWidth: windowWidth > 1300 ? '832px' : '0px'
  };

  return(
    <div className="relative flex flex-col min-h-max bg-fomo-sec-white text-fomo-sec-two pt-1 pb-6" style={{minHeight: windowHeight - 270 + 'px'}}>

      <div className={`flex flex-col px-4 ${marginAuto}`}>
        <div className="max-w-screen-full flex justify-center">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3 min-w-full">

            <div className="col-span-1">
              <div className="flex flex-col text-left md:sidebar">
                <div className="flex flex-col items-center pb-4 min-h-max md:items-start md:pr-4 text-fomo-sec-two">
                  <div className="flex flex-col items-center md:items-start z-20" style={searchBarWidth}>
                    <SearchBar onSearch={handleSearch} activateSearch={true} searchValueEventName={searchValueFromUrl} />
                    <Sidebar filters={filters} setFilters={setFilters} />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-span-1 md:col-span-2" style={eventsContainerMinWidth}>
              <div className='flex flex-col min-w-full items-center'>
              { loading ?
                  (
                    <div className="my-[15%]">
                      <LoadingSpinner size={12} />
                    </div>
                  ) :
                  (
                    <div className={`col-span-2 z-10 ${eventsContainerPadding}`}>
                      {
                        events && events.length == 0 && (
                            <h2 className="text-2xl text-center py-4 px-4 md:px-0">
                              {/* {events.length > 0
                                ? `Eventos que coinciden con tu búsqueda "${name}"`
                                : "¡Lo sentimos! no hay eventos que coincidan con tu búsqueda"} */}
                              No hay eventos que coincidan con tu búsqueda
                            </h2>
                          )
                      }
                      <EventList  events={events}
                                  currentPage={currentPage}
                                  handlePrevPage={handlePrevPage}
                                  handleNextPage={handleNextPage}
                                  handlePageChange={handlePageChange}
                                  totalPages={totalPages}
                          />
                    </div>  
                     
                  )
              }
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Eventos;
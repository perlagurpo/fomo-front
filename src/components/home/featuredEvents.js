'use client';
import { useEffect, useState } from 'react';
import EventService from '@/app/api/event.service';
import HomeService from '@/app/api/home.service';
import moment from 'moment';
import EventCard from '@/components/eventCard/eventCard';
import { LoadingSpinner } from '@/components/icons/icons';

export default function FeaturedEvents({ searchQuery }) {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({ category: "", format: "", event_type: "", start_date: "", end_date: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const fetchedEvents = await HomeService.getHighlightedEvents();
      setEvents(fetchedEvents.results);
      setLoading(false);
    };

    const parsedFilters = {};
    const params = new URLSearchParams(searchQuery);
    for (let [key, value] of params.entries()) {
      parsedFilters[key] = value.includes(',') ? value.split(',') : value;
    }

    setFilters(parsedFilters);
    fetchEvents();
    
  }, [searchQuery]);


  const removeFilter = async (filterKey, index = null) => {
    const updatedFilters = { ...filters };
    if (index !== null && Array.isArray(updatedFilters[filterKey])) {
      updatedFilters[filterKey].splice(index, 1);
      if (updatedFilters[filterKey].length === 0) {
        delete updatedFilters[filterKey];
      }
    } else {
      delete updatedFilters[filterKey];
    }
    setFilters(updatedFilters);

    const params = new URLSearchParams(updatedFilters);
    const newSearchQuery = params.toString();
    const fetchedEvents = await EventService.getEvents(newSearchQuery);
    setEvents(fetchedEvents);

    return updatedFilters;
  };


  const filterFormat = filter => {
    if (filter == 'event_name') {
      return 'Término de Búsqueda';
    }
    if (filter == 'category') {
      return 'Categoría';
    }
    if (filter == 'start_date') {
      return 'Desde';
    }
    if (filter == 'end_date') {
      return 'Hasta';
    }
  };

  const valueFormat = (filter, value) => {
    if (filter == 'start_date' || filter == 'end_date') {
      const spanishMonths = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
      const formattedDate = moment(value, "DD-MM-YYYY").format(`DD [${spanishMonths[moment(value, "DD-MM-YYYY").month()]}] YYYY`);
      return formattedDate;
    }
    return value;
  };

  return (
    <div className="flex flex-col justify-center items-center px-4 pb-10 gap-x-10">
      <div className="flex flex-col min-w-9/10">
        <div className="pb-5">
          {Object.values(filters).some(filter => filter) ? (
            Object.entries(filters).map(([filterKey, filterValue]) => {
              if (filterValue) {
                return Array.isArray(filterValue) ? (
                  filterValue.map((value, index) => (
                    <span key={`${filterKey}-${index}`} className="inline-flex flex-col bg-fomo-pri-one rounded-lg px-3 py-1 text-white mr-2">
                      <span style={{fontSize: '10px', lineHeight: '1.6'}}>{ filterFormat(filterKey) }</span>
                      <span style={{fontSize: '18px', lineHeight: '1.6'}}>
                        { valueFormat(filterKey, value) }
                        <button className="text-sm ml-2 text-fomo-pri-two" onClick={() => removeFilter(filterKey, index)}>
                          X
                        </button>
                      </span>
                    </span>
                  ))
                ) : (
                  <span key={filterKey} className="inline-flex flex-col bg-fomo-pri-one rounded-lg px-3 py-1 text-white mr-2">
                    <span style={{fontSize: '10px', lineHeight: '1.6', fontWeight: 'bold'}}>{ filterFormat(filterKey) }</span>
                    <span style={{fontSize: '18px', lineHeight: '1.6', fontWeight: 'bold'}}>
                      { valueFormat(filterKey, filterValue) }
                      <button className="text-sm ml-2 text-fomo-pri-two" onClick={() => removeFilter(filterKey)}>
                        X
                      </button>
                    </span>
                  </span>
                );
              }
              return null;
            })
          ) : (
            <h3 className='text-left text-xl font-bold text-fomo-sec-two'>Eventos Destacados</h3>
          )}
        </div>
        
        {
          loading ?
            <div className='flex flex-col items-center'>
              <LoadingSpinner />
            </div>
            :
            (
              events &&
                events.length > 0 ? 
                  <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-12 lg:grid-cols-3">
                    {
                      events.map((event, i) => (
                        event.highlighted == true && 
                        <div className="flex flex-col items-center h-full" key={i}> 
                        <EventCard
                          key={event.id}
                          event_id={event.id}
                          event_name={event.event_name}
                          event_img={event.event_img}
                          start_date={event.start_date}
                          event_location={event.location_event}
                          ticket_price={event.ticket_price}
                          event_slug={event.slug}
                            />
                        </div>
                        )
                      )
                    }
                  </div>
                :
                (
                  <div className='flex flex-column items-center'>
                    {/* <h2 className='text-lg'> Por el momento no hay eventos destacados </h2> */}
                    {/* <img src='/img/home/banner_busqueda_fail.png' /> */}
                  </div>
                ) 
            )
        }
      </div>
    </div>
  );
}
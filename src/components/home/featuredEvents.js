'use client';
import { useEffect, useState } from 'react';
import EventService from '@/app/api/event.service';
import FeaturedEventCard from './featuredEventCard';
import moment from 'moment';

export default function FeaturedEvents({ searchQuery }) {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({ category: "", format: "", event_type: "", start_date: "", end_date: "" });

  useEffect(() => {
    const fetchEvents = async () => {
      const fetchedEvents = await EventService.getEvents(searchQuery);
      setEvents(fetchedEvents);
    };
    
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

  useEffect(() => {
    const parsedFilters = {};
    const params = new URLSearchParams(searchQuery);
    for (let [key, value] of params.entries()) {
      parsedFilters[key] = value.includes(',') ? value.split(',') : value;
    }
    setFilters(parsedFilters);
  }, [searchQuery]);

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
    <div className="flex flex-col justify-center items-center px-10 pb-10 gap-x-10">
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
            <h3 className='text-left text-xl font-bold text-fomo-sec-two'>Descubrí Eventos</h3>
          )}
        </div>
        
        {
          events.length > 0 ? 
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-3">
              {
                events.map(event => (
                  <FeaturedEventCard
                    key={event.id}
                    event_id={event.id}
                    event_name={event.event_name}
                    event_img={event.event_img}
                    start_date={event.start_date}
                    event_location={event.event_location}
                    ticket_price={event.ticket_price}
                  />
                  )
                )
              }
            </div>
          :
          (
            <div className='flex flex-column items-center'>
              <img src='/img/home/banner_busqueda_fail.png' />
            </div>
          )  
        }
        
      </div>
    </div>
  );
}
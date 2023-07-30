'use client';
import EventService from '../../app/api/event.service';
import React, { useEffect, useState } from 'react';
import FeaturedEventCard from './featuredEventCard';

export default function FeaturedEvents({ searchQuery }) {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({ category: "", format: "", event_type: "", start_date: "" });

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
    } else {
      updatedFilters[filterKey] = "";
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

  return (
    <div className="flex flex-col justify-center items-center p-10 gap-x-10">
      <div className="flex flex-col min-w-9/10">
        <h3 className="text-left text-xl font-bold text-fomo-sec-two pb-5">
          {Object.values(filters).some(filter => filter) ? (
            Object.entries(filters).map(([filterKey, filterValue]) => {
              if(filterKey == 'search') {
                return null;
              }
              if (filterValue) {
                return Array.isArray(filterValue) ? (
                  filterValue.map((value, index) => (
                    <span key={`${filterKey}-${index}`} className="inline-flex flex-col bg-fomo-pri-one rounded-lg px-3 py-1 text-white mr-2">
                      <span style={{fontSize: '10px', lineHeight: '1.6'}}>{filterKey}</span>
                      <span style={{fontSize: '18px', lineHeight: '1.6'}}>
                        {value}
                        <button className="text-sm ml-2 text-fomo-pri-two" onClick={() => removeFilter(filterKey, index)}>
                          X
                        </button>
                      </span>
                    </span>
                  ))
                ) : (
                  <span key={filterKey} className="inline-flex flex-col bg-fomo-pri-one rounded-lg px-3 py-1 text-white mr-2">
                    <span style={{fontSize: '10px', lineHeight: '1.6'}}>{filterKey}</span>
                    <span style={{fontSize: '18px', lineHeight: '1.6'}}>
                      {filterValue}
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
            'Descubrí Eventos'
          )}
        </h3>
        <div className="grid grid-cols-3 gap-5">
          {events.map(event => (
            <FeaturedEventCard
              key={event.id}
              event_id={event.id}
              event_name={event.event_name}
              event_img={event.event_img}
              start_date={event.start_date}
              event_location={event.event_location}
              ticket_price={event.ticket_price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
'use client';
import EventService from '../../app/api/event.service';
import React, { useEffect, useState } from 'react';
import FeaturedEventCard from './featuredEventCard';
import SearchBar from "@/components/home/searchBar";

export default function FeaturedEvents ({ mockTest = true }) {

  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const mockEvents = [
    {
      id: 1,
      event: "MockEvent1",
      event_description: "Mario el rockero",
    },
    {
      id: 2,
      event: "FOMO",
      event_description: "Mario qué será",
    }
  ];

  useEffect(() => {
    
    const fetchEvents = async () => {
      const fetchedEvents = await EventService.getEvents();
      console.log(fetchedEvents)
      setEvents(fetchedEvents);
      setFilteredEvents(fetchedEvents);
    };

    mockTest ? setEvents(mockEvents) : fetchEvents();

  }, []);


  return(
    <div className="flex flex-col justify-center p-10 gap-x-10">
      <SearchBar events={events} setFilteredEvents={setFilteredEvents}/>
      <div className="flex flex-row justify-center">
      { 
        filteredEvents.map(event => <FeaturedEventCard event={ event } key={event.id}/>)
      } 
      </div>
    </div>
  );
}



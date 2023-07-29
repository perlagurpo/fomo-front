'use client';
import EventService from '../../app/api/event.service';
import React, { useEffect, useState } from 'react';
import FeaturedEventCard from './featuredEventCard';

export default function FeaturedEvents ({ mockTest = false }) {

  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const mockEvents = [
    {
      id: 1,
      event: "MockEvent1",
      location: "location",
      date: "14 ago 17",
      price: 1000,
      event_description: "Mario el rockero",
    },
    {
      id: 2,
      event_name: "FOMO",
      event_type: "location",
      start_date: "14 ago 17",
      ticketprice: 0,
      event_img: "Mario qué será",
    },
    {
      id: 3,
      event_name: "FOMO",
      event_type: "location",
      start_date: "14 ago 17",
      ticketprice: 0,
      event_img: "Mario qué será",
    }
  ];

  useEffect(() => {
    
    const fetchEvents = async () => {
      const fetchedEvents = await EventService.getEvents();
      console.log(fetchedEvents);
      setEvents(fetchedEvents);
      setFilteredEvents(fetchedEvents);
    };

    mockTest ? setEvents(mockEvents) : fetchEvents();

  }, []);


  return(
    <div className="flex flex-col justify-center items-center p-10 gap-x-10">

      {/* <SearchBar events={events} setFilteredEvents={setFilteredEvents}/> */}
      <div className="flex flex-col min-w-9/10">
        <h3 className="text-left text-xl font-bold text-fomo-sec-two pb-5">
          Descubrí eventos
        </h3>
        <div className="grid grid-cols-3 gap-5">
        { 
          filteredEvents.map(event => <FeaturedEventCard  key={event.id}
                                                          event_id={event.id}
                                                          event_name={event.event_name}
                                                          event_img={event.event_img}
                                                          start_date={event.start_date}
                                                          event_location={event.event_location}
                                                          ticket_price={event.ticket_price}
                                                          />)
        } 
        </div>

      </div>
      
    </div>
  );
}



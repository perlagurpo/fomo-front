'use client';
import EventService from '../../app/api/event.service';
import React, { useEffect, useState } from 'react';
import EventCard from '@/components/eventList/eventCard';
import Sidebar from '@/components/eventList/sideBar';

export default function Eventos({ mockTest = false }) {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const mockEvents = [
    {
      id: 1,
      event_name: "La Obra de Teatro",
      event_type: "Teatro",
      start_date: "today",
      end_date: "tomorrow",
      has_ticket: "",
      ticket_price: "",
      tickets_left: "",
      event_description: "Mario el rockero",
    },
    {
      id: 2,
      event_name: "El Recital de Música",
      event_type: "Recital",
      start_date: "this weekend",
      end_date: "this weekend",
      has_ticket: "",
      ticket_price: "",
      tickets_left: "",
      event_description: "Mario el rockero",
    }
  ];

  const fetchEvents = async () => {
    const fetchedEvents = await EventService.getEvents();
    console.log(fetchedEvents);
    console.log(mockEvents);
    setEvents(fetchedEvents);
    setFilteredEvents(fetchedEvents); 
    return fetchedEvents;// Set the initial filtered events to all events
  };



  useEffect(() => {
    if (mockTest) {
      setEvents(mockEvents);
    } else {
      let fetched = fetchEvents();
      console.log(fetched);
    }
  }, []);

  return (
    <div className="flex-row justify-center p-10 gap-x-10">
        <div className="grid grid-cols-1 md:grid-cols-5">
  <div className="col-span-1 md:col-span-1">
  <Sidebar events={events} setFilteredEvents={setFilteredEvents} />

  </div>
  <div className="col-span-1 md:col-span-4"> 
  {filteredEvents.map((event) => (
          <EventCard event={event} key={event.id} />
        ))}
  </div>
</div>
    </div>
  );
}
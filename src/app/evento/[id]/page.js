'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { LoadingSpinner } from '@/components/icons/icons';
import EventService from '@/app/api/event.service';
import Event from "@/components/eventDetail/event";


export default function Evento({ params }) {
  const pathParams = useParams();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(false);
  
  /*
    Fetch data del evento requerido consultando el parámetro de la URL actual
  */
  useEffect(
    () => {
      async function fetchEvent(id) {
        const fetchedEvent = await EventService.getEvent(id);
        setEventData(fetchedEvent);
        setLoading(false);
      }
      setLoading(true);
      const id = pathParams["id"];
      fetchEvent(id);
    }
    ,[]);


  return(
    <div className='flex flex-col min-h-screen bg-fomo-sec-white justify-center items-center py-[10%] px-8 md:px-[10%] lg:px-[15%] xl:px-[20%] 2xl:px-[20%]'>
      {
        loading && <LoadingSpinner size={12} />
      }
      {
        eventData &&
          <Event  name={eventData.event_name}
                  startDate={eventData.start_date}
                  startDay={eventData.day_name_start}
                  endDate={eventData.end_date}
                  endDay={eventData.day_name_end}
                  location={eventData.event_location}
                  duration={"3 horas"}
                  hasTicket={eventData.has_ticket}
                  ticketType={eventData.ticket_type}
                  ticketPrice={eventData.ticket_price}
                  ticketURL={eventData.buy_tickets}
                  ticketsAvailable={eventData.tickets_available}
                  eventLink={eventData.event_link}
                  imageURL={eventData.event_img}
                  description={eventData.description}
                  category={eventData.category}
                  />  
      }
    </div>
  ); 
}
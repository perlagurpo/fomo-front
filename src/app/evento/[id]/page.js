'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { LoadingSpinner } from '@/components/icons/icons';
import EventService from '@/app/api/event.service';
import Event from "@/components/event/event";


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
                  ticketType={"Entrada electrónica"}
                  ticketPrice={eventData.ticket_price}
                  ticketURL={eventData.buy_tickets}
                  ticketsAvailable={eventData.tickets_available}
                  eventLink={eventData.event_link}
                  imageURL={eventData.event_img}
                  description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
                  category={eventData.category}
                  />  
      }
    </div>
  );
  
}


/*
Mock event -- con éste se ve la vista del figma

<Event  name="Las Tussi + Mujer Cebra + Las Maniobras en Club Tri"
              date="23 Agosto 12:00"
              location={"Club Tri - 20 de Septiembre 2650 Mar del Plata"}
              imageURL={"/img/las-tussi.webp"}
              description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
              duration={"3 horas"}
              ticketType={"Entrada electrónica"}
              ticketPrice={"1000"}
              ticketURL={"/"}
              />





*/
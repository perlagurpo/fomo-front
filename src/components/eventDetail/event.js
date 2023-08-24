import { useState } from 'react';
import { CalendarIcon, ClockIcon, LocationIcon, TicketIcon } from "../icons/icons";
import { diaAString, mesAString } from '../utils/dateOperations';


export default function Event({ name, startDate, startDay, endDate, endDay, location, duration,
                                hasTicket, ticketType, ticketPrice, ticketURL, ticketsAvailable,
                                eventLink, imageURL, description, category }) {

  const[displayedStartDate, setDisplayedStartDate] = useState(new Date(startDate));
  const[displayedEndDate, setDisplayedEndDate] = useState(new Date(endDate));

  function formatDate(date) {

    return(
      diaAString(date.getDay()) +
      ", " +
      date.getDate() +
      ' de ' +
      mesAString( date.getMonth()) +
      " a las " +
      date.toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit", hour12: false })
      + " hs"
    );
  }

  return(
    <div className='flex flex-col items-center justify-center text-fomo-sec-two'>
      <img src={imageURL} alt='event_img' />
      
      <div className='flex flex-col items-center gap-4 mt-6'>
        <h1 className='text-4xl font-bold py-6 text-center'>
          { name }
        </h1>
        <h2 className='text-md font-bold pb-3'> { category.toUpperCase() } </h2>  

        <div className='flex flex-col pb-4 gap-5 w-full  md:flex-row md:justify-between md:py-8'>
          <div className='flex flex-row items-center gap-4 basis-6/12'>
            <CalendarIcon />
            <div className='flex flex-col items-start'>
              <h2 className='font-bold text-lg'>Fecha y Hora</h2>
              <p>{ formatDate(displayedStartDate) }</p>
            </div>
          </div>
          <div className='flex flex-row items-center basis-6/12 gap-6 md:gap-4'>
            <LocationIcon />
            <div className='flex flex-col items-start'>
              <h2 className='font-bold text-lg'>Ubicación</h2>
              <p>{ location }</p>
            </div>
          </div>
        </div>
        <div className='md:py-5'>
          <h2 className='text-xl font-bold pb-3'>Acerca del Evento</h2>
          <div className='flex flex-col gap-12 w-full md:gap-20 md:flex-row md:justify-between md:items-start '>
            <EventDescription description={description} duration={duration} ticketType={ticketType} />
              <EventTickets hasTicket={hasTicket} ticketPrice={ticketPrice} ticketURL={ticketURL} ticketsLeft={ticketsAvailable} />
          </div>
        </div>

      </div>
    </div>    
  );

}


function EventDescription({ description, duration, ticketType }){
  return(
    <div className='flex flex-col items-start basis-8/12'>
      
      <div className='flex flex-col items-start gap-4 bg-fomo-sec-one/[.10] rounded-md py-3 px-4'>
        <p>
          { description }
        </p>
        <div className='flex flex-row min-w-[100%] justify-between align-center pr-2'>
          <div className='flex flex-row gap-10'>
            <div className='flex flex-row gap-2'>
              <ClockIcon />
              <p>{ duration }</p>
            </div>
            <div className='flex flex-row gap-2'>
              <TicketIcon />
              <p>{ ticketType }</p>   
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EventTickets({ hasTicket, ticketPrice, ticketURL="/", ticketsLeft }) {
  return(
    <div className='flex flex-col items-center justify-between gap-6 basis-4/12 border border-4 border-gris-custom rounded-lg text-left p-3 md:min-w-[30%] '>
      <div className='flex flex-col min-w-[100%] gap-2'>
        <h3 className='text-lg font-bold'>Ver entradas</h3>
        { hasTicket && <p >{"$" + ticketPrice }</p> }
      </div>
      {
        hasTicket ? 
          (
            ticketsLeft > 0 ? 
              <a href={ticketURL} target='blank'>
                <button className='bg-fomo-pri-two rounded-md min-w-[80%] py-2 px-7 text-lg font-bold text-white'>Reserva tu Entrada</button>
              </a>
              :
              <h3 className='text-md font-bold'>Tickets agotados</h3>
          )
          :
          <h3 className='text-lg font-bold text-fomo-pri-two'>evento sin entrada</h3>
      }
        
    </div>
  );
}
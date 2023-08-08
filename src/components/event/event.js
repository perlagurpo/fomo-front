import { useState, useEffect } from 'react';
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
      date.toLocaleTimeString("es")
    );
  }

  return(
    <div className='flex flex-col items-center justify-center text-fomo-sec-two px-4 lg:max-w-[60%]'>
      <img src={imageURL} alt='event_img' />
      
      <div className='flex flex-col items-center gap-4 mt-6'>
        <h1 className='text-4xl font-bold py-6 text-center'>
          { name }
        </h1>
        <h2 className='text-md font-bold pb-3'> { category.toUpperCase() } </h2>  

        <div className='flex flex-col pb-4 gap-5 md:flex-row md:justify-between md:py-8 md:gap-0 md:px-6 lg:w-[80%]'>
          <div className='flex flex-row items-center gap-4'>
            <CalendarIcon />
            <div className='flex flex-col items-start'>
              <h2 className='font-bold text-lg'>Fecha y Hora</h2>
              <p>{ formatDate(displayedStartDate) }</p>
            </div>
          </div>
          <div className='flex flex-row items-center gap-6 md:gap-4'>
            <LocationIcon />
            <div className='flex flex-col items-start'>
              <h2 className='font-bold text-lg'>Ubicación</h2>
              <p>{ location }</p>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-12 md:gap-20 md:flex-row md:justify-between md:align-center md:px-6 md:py-5 md:basis-6/12 lg:w-[80%] lg:px-0'>
          <EventDescription description={description} duration={duration} ticketType={ticketType} />
          { hasTicket && <EventTickets ticketPrice={ticketPrice} ticketURL={ticketURL} ticketsLeft={ticketsAvailable} />}
        </div>
      </div>
    </div>    
  );

}


function EventDescription({ description, duration, ticketType }){
  return(
    <div className='flex flex-col items-start'>
      <h2 className='text-xl font-bold pb-3'>Acerca del Evento</h2>
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

function EventTickets({ ticketPrice, ticketURL="/", ticketsLeft }) {
  return(
    <div className='flex flex-col items-center justify-between gap-6 border border-4 border-gris-custom rounded-lg text-left p-3 md:min-w-[30%] md:self-center'>
      <div className='flex flex-col min-w-[100%] gap-2'>
        <h3 className='text-lg font-bold'>Ver entradas</h3>
        <p >{"$" + ticketPrice }</p>
      </div>
      {
        ticketsLeft > 0 ? 
          <a href={ticketURL}>
            <button className='bg-fomo-pri-two rounded-md min-w-[80%] py-2 px-7 text-lg font-bold text-white'>Reserva tu Entrada</button>
          </a>
          :
          <h3 className='text-md font-bold'>Tickets agotados</h3>
      }
      
    </div>
  );
}
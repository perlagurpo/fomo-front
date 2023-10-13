import { useState } from 'react';
import { CalendarIcon, ClockIcon, LocationIcon, TicketIcon } from "../icons/icons";
import { diaAString, mesAString } from '../utils/dateOperations';
import moment from 'moment';
import Link from 'next/link';


export default function Event({ name, startDate, startDay, endDate, endDay, location, duration,
                                hasTicket, ticketType, ticketPrice, ticketURL, ticketsLeft,
                                eventLink, imageURL, description, category }) {

  const [displayedStartDate, setDisplayedStartDate] = useState(new Date(startDate));
  const [displayedEndDate, setDisplayedEndDate] = useState(new Date(endDate));
                                  
  /**
   * Formatea la duración del evento a horas y minutos utilizando las fechas de inicio y de fin
   * Asume que ambas fechas son objetos Date válidos
   * @returns String
   */
  function formatearDuracion(fechaInicio, fechaFin) {
    let duracion = moment.duration((fechaFin.getTime() - fechaInicio.getTime()));
    let horas = Math.floor(duracion.asHours());
    let minutos = duracion.asMinutes() % 60;   
    return `${ horas } horas ${ minutos != 0 ? minutos + " minutos" : "" }`;
  }

  return(
    <div className='flex flex-col items-center justify-center text-fomo-sec-two mb-4'>
      <img src={imageURL} alt='event_img' className='cover max-h-screen lg:max-h-[70vh]' />
      
      <div className='flex flex-col items-center gap-4 mt-6 min-w-full'>
        
        <p className='max-w-[90vw] overflow-hidden text-ellipsis text-4xl font-bold py-6 text-center'>
          { name }
        </p>
        
        
        <h2 className='text-md font-bold pb-10 md:pb-3'> { category && category.toUpperCase() } </h2>  

        <div className='grid grid-cols-1 gap-x-10  gap-y-12 md:gap-y-20 min-w-full md:grid-cols-2'>
          <Fecha startDate={startDate} displayedStartDate={displayedStartDate} />
          <Ubicacion location={location} />
          <EventDescription description={description}
                            duration={ endDate ? formatearDuracion(displayedStartDate, displayedEndDate) : "-" }
                            hasTicket={hasTicket}
                            ticketType={ticketType}
                            />
          <EventTickets hasTicket={hasTicket} ticketPrice={ticketPrice} ticketURL={ticketURL} ticketsLeft={ticketsLeft} />
        </div>
      </div>
    </div>    
  );

}

function Fecha(props) {

  return(
    <div className='flex flex-row gap-4'>
      <div>
      <CalendarIcon /></div>
      <div className='flex flex-col items-start'>
        <h2 className='font-bold text-lg'>Fecha y Hora</h2>
        <p>{ props.startDate ? formatDate(props.displayedStartDate) : "Sin datos" }</p>
      </div>
    </div>
  );
}

function Ubicacion(props) {

  function renderUbicacionUI(location) {
    return(
      <div className='flex flex-row gap-4 items-start'>
          <div>
            <LocationIcon />
          </div>
          <div className='flex flex-col items-start'>
            <h2 className='font-bold text-lg'>Ubicación</h2>
            {
              location ? (
                <p>{ location.name + " - " + location.address }</p>
              )
              : <p>{"Sin datos"}</p>
            }          
          </div>
        </div>
    )
  }

  return(
    <div>
      {
        props.location.google_maps_link ? (
          <Link href={props.location.google_maps_link ? props.location.google_maps_link : "#"} target={props.location ? '_blank' : '_top'}>
            { renderUbicacionUI(props.location) }
          </Link>
        )
        :
        ( renderUbicacionUI(props.location) )
      }
    </div>
  );
}

function EventDescription({ description, duration, hasTicket, ticketType }){
  return(
    <div className='flex flex-col items-start'>
      <h2 className='text-xl font-bold pb-3'>Acerca del Evento</h2>
      <div className='flex flex-col min-w-full items-start gap-4 bg-fomo-sec-one/[.10] rounded-md py-3 px-4'>
        <p>
          { description ? description : "Evento sin descripción" }
        </p>
        <div className='flex flex-row min-w-[100%] justify-between align-center pr-2'>
          <div className='flex flex-row gap-10'>
            <div className='flex flex-row gap-2'>
              <ClockIcon />
              <p>{ duration ? duration : "-" }</p>
            </div>
          
            {ticketType !== null && (
              hasTicket && ticketType.length !== 0 && (
                <div className='flex flex-row gap-2'>
                  <TicketIcon />
                  <p>{ticketType}</p>   
                </div>
              )
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}

function EventTickets({ hasTicket, ticketPrice, ticketURL = "/", ticketsLeft }) {  
  return(
    <div className='flex flex-col items-center justify-between gap-6 border border-4 border-gris-custom rounded-lg text-left p-3 md:min-w-[30%] '>
      <div className='flex flex-col min-w-[100%] gap-2'>
        
      {
        hasTicket && (
          <div className='flex flex-row justify-between'>
            <h3 className='text-lg font-bold'>Valor de la entrada</h3>
            <p className='text-lg font-bold'>{ticketPrice !== null ? "$" + ticketPrice : "Consultar"}</p>
          </div>
        )
      }
      </div>
      {
        hasTicket ? 
        (
          ticketsLeft ? 
          (
            ticketURL !== null ? 
            (
              <a href={ticketURL.includes("http://") || ticketURL.includes("https://") ? new URL(ticketURL) : "/"} target='blank'>
                <button className='bg-fomo-pri-two rounded-md min-w-[80%] py-2 px-7 text-lg font-bold text-white'>
                  Reserva tu Entrada
                </button>
              </a>
            ) : <h3 className='text-md font-bold'>Consultar en el lugar por entradas</h3>
          )
          :
          <h3 className='text-md font-bold'>Tickets agotados</h3>
        )
        :
        <h3 className='text-lg font-bold text-fomo-pri-two'>Evento sin entrada</h3>
      }
        
    </div>
  );
}

/**
 * Formatea la fecha proveniente de Javascript Date al formato "<Día>, <nroDía> de <Mes> a las <hora>"
 * @param {*} date:Date 
 * @returns fecha:String
 */
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
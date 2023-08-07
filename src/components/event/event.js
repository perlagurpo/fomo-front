import { CalendarIcon, ClockIcon, LocationIcon, TicketIcon } from "../icons/icons";


export default function Event({ name, date, location, description, duration, ticketType, ticketPrice, ticketURL, imageURL }) {

  return(
    <div className='flex flex-col items-center text-fomo-sec-two md:max-w-[60%] border border-red'>
      <img src={imageURL} alt='event_img' />
      
      <div className='flex flex-col items-center gap-4 mt-6'>
        <h1 className='text-4xl font-bold py-6'>
          { name }
        </h1>
        <div className='flex flex-col md:flex-row md:justify-between md:w-[80%] md:py-8'>
          <div className='flex flex-row items-center md:gap-4'>
            <CalendarIcon />
            <div className='flex flex-col items-start'>
              <h2 className='font-bold text-lg'>Fecha y Hora</h2>
              <p>{ date }</p>
            </div>
          </div>
          <div className='flex flex-row items-center md:gap-4'>
            <LocationIcon />
            <div className='flex flex-col items-start'>
              <h2 className='font-bold text-lg'>Ubicación</h2>
              <p>{ location }</p>
            </div>
          </div>
        </div>

        <div className='flex flex-column gap-20 md:flex-row md:justify-between md:align-center md:w-[80%] md:py-5 md:basis-6/12'>
          <EventDescription description={description} duration={duration} ticketType={ticketType} />
          <EventTickets ticketPrice={ticketPrice} ticketURL={ticketURL} />
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
  );
}

function EventTickets({ ticketPrice, ticketURL="/" }) {
  return(
    <div className='flex flex-col items-center justify-between gap-6 border border-4 border-gris-custom rounded-lg text-left p-3 md:min-w-[30%] md:self-center'>
      <div className='flex flex-col min-w-[100%] gap-2'>
        <h3 className='text-lg font-bold'>Ver entradas</h3>
        <p >{"$" + ticketPrice }</p>
      </div>
      
      <a href={ticketURL}>
        <button className='bg-fomo-pri-two rounded-md min-w-[80%] py-2 px-9 text-lg font-bold text-white'>Reserva tu Entrada</button>
      </a>
    </div>
  );
}
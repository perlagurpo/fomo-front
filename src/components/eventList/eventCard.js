'use client';
import Link from 'next/link';

/**
  Por ahora es la misma que la de Featured events
 */
const EventCard = ({ event_id, event_name, event_img, start_date, event_location, ticket_price, event_slug }) => {
  
  const startDate = start_date.split(" ");
  return (
    <Link href={`/evento/${event_slug}`}>
      <div className="max-w-sm max-h-sm bg-white rounded-lg drop-shadow-md hover:scale-102 cursor-pointer transition-all transition-400" key={event_id}>
          <div className="flex-col justify-start items-start gap-2 flex">
            <img className="w-[480px] h-[250.58px] rounded-tl-lg rounded-tr-lg object-cover" src={event_img} />
          </div>
          <div className="px-2 pt-3 pb-1"> 
            <h5 className="px-1 mb-2 text-2xl font-bold tracking-tight text-fomo-sec-two line-clamp-1">{event_name}</h5>
            <p className="px-1 font-normal text-fomo-sec-two">{ startDate && (startDate[0] + ", " + startDate[1]) }</p>
            <div className="flex flex-row justify-start py-1">
              <img className='max-h-6' src="/img/icons/location-icon.png" />
              <p className="font-bold text-fomo-sec-two pl-1 line-clamp-1">{ event_location ? event_location : "-" }</p>
            </div>
            <p className="px-1 font-normal text-fomo-sec-two">
              { ticket_price ? (ticket_price === 0 ? "Gratis" : "$ " + ticket_price) : "$ consultar" }
            </p>
          </div>
      </div>
    </Link>
  );
}

export default EventCard;
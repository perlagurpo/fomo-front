import EventCard from "./eventCard";

export default function EventList({ events=[] }) {

  return(
    <div>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-2 md:gap-10 lg:grid-cols-2">
              {
                events &&(
                  events.map((event, i) => (
                    <div className="flex flex-col items-center" key={i}> 
                      <EventCard
                        key={event.id}
                        event_id={event.id}
                        event_name={event.event_name}
                        event_img={event.event_img}
                        start_date={event.start_date}
                        event_location={event.event_location}
                        ticket_price={event.ticket_price}
                      />
                    </div>
                    )
                  )
                )
              }
          </div>
    </div>
  );
}
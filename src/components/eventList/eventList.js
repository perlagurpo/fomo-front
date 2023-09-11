import EventCard from "./eventCard";

export default function EventList({ events=[], currentPage, handlePrevPage, handleNextPage, totalPages }) {

  return (
    <div >
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-2 md:gap-10 lg:grid-cols-2 ">
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
                  event_location={event.location_event}
                  ticket_price={event.ticket_price}
                  event_slug={event.slug}
                />
              </div>
              )
            )
          )
        }
    </div>
     <div className="flex justify-center my-6 text-fomo-sec-white">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`mr-2 px-4 py-2 bg-fomo-pri-two border rounded-lg hover:opacity-50 transition duration-300 ${currentPage === 1 ? "cursor-not-allowed	" : "cursor-pointer"}`}
        >
          {"<"}
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 border rounded-lg bg-fomo-pri-two hover:opacity-50 transition duration-300 ${currentPage === totalPages ? "cursor-not-allowed	" : "cursor-pointer"}`}
        >
          {">"}
        </button>
      </div></div>
  );
}
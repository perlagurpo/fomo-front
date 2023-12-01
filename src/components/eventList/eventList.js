import EventCard from "@/components/eventCard/eventCard";
import { usePagination, DOTS } from "./paginacion";

export default function EventList({ events=[], currentPage, handlePrevPage, handleNextPage, handlePageChange, totalPages }) {

  const pagesArray = usePagination(totalPages, 1, currentPage);

  return (
    <div>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-2 md:gap-10 lg:grid-cols-2 ">
        {
          events &&(
            events.map((event, i) => (
              <div className="flex flex-col items-center h-full" key={i}> 
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

      <div className="flex flex-col items-center my-6 text-fomo-sec-white">
        { totalPages > 1 &&
            ( <>
                <div className="grid grid-cols-3 md:px-20">
                  <div className="col-span-1 flex items-center justify-end">
                      <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className={`${currentPage === 1 ? "hidden" : "block"} font-bold mr-2 px-4 bg-fomo-pri-two border rounded-lg hover:opacity-50 transition duration-300 cursor-pointer`}
                      >
                        {"<"}
                      </button>
                  </div>
                  <div className="flex flex-row col-span-1 gap-2 py-2 px-4">
                    {
                      pagesArray.map(
                        (pagina) => {
                          if(pagina == DOTS) {
                            return <h1 className="text-fomo-sec-two">...</h1>
                          }
                          return <h1  className={`cursor-pointer text-[18px] ${currentPage == pagina ? "text-fomo-pri-two" : "text-fomo-sec-two"} hover:scale-[1.02] transition duration-200`}
                                      onClick={() => handlePageChange(pagina)}
                                      key={pagina}
                                    >
                                    { pagina }
                                  </h1>
                        }
                      )
                    }
                  </div>
                  <div className="col-span-1 flex items-center justify-start">
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className={`${currentPage === totalPages ? "hidden" : "block"} font-bold px-4 border rounded-lg bg-fomo-pri-two hover:opacity-50 transition duration-300 ${currentPage === totalPages ? "cursor-not-allowed	" : "cursor-pointer"}`}
                    >
                      {">"}
                    </button>
                  </div>
                </div>
              </>
            )
        }
      </div>
    </div>
  );
}
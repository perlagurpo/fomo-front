import EventCard from "@/components/eventCard/eventCard";

export default function EventList({ events=[], currentPage, handlePrevPage, handleNextPage, handlePageChange, totalPages }) {

  return (
    <div>
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

      <div className="flex flex-col items-center my-6 text-fomo-sec-white">
        { totalPages > 1 &&
            ( <>
                <div className="grid grid-cols-2 md:px-20">
                  <div className="col-span-1">
                      <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className={`${currentPage === 1 ? "hidden" : "block"} mr-2 px-4 py-2 bg-fomo-pri-two border rounded-lg hover:opacity-50 transition duration-300 cursor-pointer`}
                      >
                        {"<"}
                      </button>
                  </div>
                  <div className="col-span-1">
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className={`${currentPage === totalPages ? "hidden" : "block"} px-4 py-2 border rounded-lg bg-fomo-pri-two hover:opacity-50 transition duration-300 ${currentPage === totalPages ? "cursor-not-allowed	" : "cursor-pointer"}`}
                    >
                      {">"}
                    </button>
                  </div>
                </div>
                <div className="flex flex-row gap-2 py-2">
                  {
                    generatePagesArray(6,currentPage,totalPages).map(
                      (pagina) => {
                        return  <h1 className={`cursor-pointer ${currentPage == pagina ? "text-fomo-pri-two" : "text-fomo-sec-two"} hover:scale-110 transition duration-200`}
                                    onClick={() => handlePageChange(pagina)}
                                    key={pagina}
                                  >
                                  { pagina }
                                </h1>
                      }
                    )
                  }
                </div>
              </>
            )
        }
      </div>
    </div>
  );
}

/**
 * Función para generar el listado de números con links a las páginas disponibles
 * @param {*} length
 * @param {*} current 
 * @param {*} total 
 * @returns number[]
 */
function generatePagesArray(length=6, current=1, total) {
  let paginas = Array.from({ length: total }, (_,value) => value + 1);
  // Formateo lo que se muestra si hay más de seis páginas (muy caverna)
  if(total > 6) {
    let inicio, fin
    if (current > 3) {
      inicio = Math.min(Math.max(current - 3, 0), total);
      fin = Math.min(Math.max(current + 3, 0), total);
    }
    paginas = paginas.slice(inicio, fin);
    fin != total && paginas.push(total); 
  }
  return paginas;
}
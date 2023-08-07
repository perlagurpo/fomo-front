import Event from "@/components/event/event";


export default function Evento({ params }) {
  
  /*
    Hacer consulta en un useEffect o traer data de un Context
  */

  return(
    // date, location, description, duration, ticketType, ticketPrice, ticketURL
    <div className='flex flex-col min-h-screen bg-fomo-sec-white justify-center items-center py-20'>
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
    </div>
  );
  
}
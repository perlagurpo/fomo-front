export default function Evento() {
  return (
  <div className="flex min-h-screen flex-col items-center justify-between p-24">    
    <img class="h-auto max-w-xl rounded-lg shadow-xl dark:shadow-gray-800"  src="img/las-tussi.webp" alt="image description" />
    <div>
      <div className="text-sm mt-4">17 de Julio</div>
    </div>
    <div>
      <div className="text-4xl mt-4 font-bold">Mujer Cebra + Las Tussi + Las Maniobras en Club Tri</div>
    </div>
    <div>
      <div className="text-sm mt-4">Evento para Mayores de 18 años</div>
    </div>
    <div>
      <div className="text-sm">Cuando y Donde</div>
    </div>
      <div className="flex flex-row space-x-4" >
        <img className="h-auto w-auto " src="img/formkit_date.svg" alt="image description" />
        <div className="flex flex-col content-center justify-center ">
          <div className="text-lg">Fecha y hora</div>
          <div className="text-sm">Empieza el Sabado 17 de Junio de 2023 a las 20:00</div>
        </div>
        <img className="h-auto w-auto " src="img/location.svg" alt="image description" />
        <div className="flex flex-col my-2 justify-center">
          <div className="text-lg">Ubicacion</div>
          <div>Club Tri - 20 de Septiembre 2650 Mar del Plata, Provincia de Buenos Aires</div>
        </div>        
      </div>
      <div>
        <div className="text-lg mt-4">Acerca de Este Evento</div>
        <div className="my-2">Aca iria una descripcion piola sobre el evento jajaj xddddd</div>
        <div className="flex flex-row space-x-4">
          <div className="flex flex-row space-x-2" >
            <img className="h-auto w-auto " src="img/duration.svg" alt="image description"/>
            <div>3 horas</div>
          </div>
          <div className="flex flex-row space-x-2">
            <img className="h-auto w-auto " src="img/ticket.svg" alt="image description"/>
            <div>Entrada Electronica</div>
          </div>
        </div>
      </div>
  </div>
  )
}
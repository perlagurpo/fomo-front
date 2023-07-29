'use client';

export default function SearchFilters () {

  return(
    <div className="flex w-full flex-col justify-center items-center p-10 gap-x-10">
      <div className="flex w-full flex-row px-64">
        <div className="grid w-3/4">
          <h5 className="text-left text-xl font-bold text-fomo-sec-two pb-5">
            Filtros Populares
          </h5>
          <div className="grid grid-cols-4">
            <p className="text-black">gil</p>
            <p className="text-black">gil</p>
            <p className="text-black">gil</p>
            <p className="text-black">gil</p>
          </div>
        </div>
        <div className="grid w-1/4">
          <h5 className="text-left text-xl font-bold text-fomo-sec-two pb-5">
            Busquedas Populares
          </h5>

        </div>
      </div>
    </div>
  );
}



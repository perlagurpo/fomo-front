'use client';
import { useState, useEffect } from 'react';
import Datepicker from "react-tailwindcss-datepicker"; 
import EventService from '@/app/api/event.service';
import moment from 'moment';

export default function SearchFilters ({ filters, onFiltersChange }) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filter, setFilter] = useState({
    start_date: '',
    end_date: '',
    price: '',
    category: '',
    format: '',
    event_type: ''
  });

  const [categories, setCategories] = useState(null);

  useState(
    () => {
      async function fetchCategories(){
        const fetchedCategories = await EventService.getCategories();
        setCategories(fetchedCategories);
        return fetchedCategories;
      }
      fetchCategories();
    }
  ,[]);

  const handleFilterChange = (key, value, dateFilters = null) => {
    if (dateFilters != null) {
      onFiltersChange(dateFilters);
      setFilter((prevFilter) => ({
        ...prevFilter,
        ...dateFilters,
      }));
      return;
    }

    const filterArray = filters[key].split(',').map((item) => item.trim());
    let updatedValue;

    if (filterArray.includes(value)) {
      // Remuevo filtro existente
      const updatedFilters = filterArray.filter((item) => item !== value);
      updatedValue = updatedFilters.join(',');
    } else {
      // Agrego nuevo filtro a filtros previos
      if (key === 'start_date' || key === 'end_date') {
        updatedValue = value;
      } else {
        updatedValue = filters[key] ? `${filters[key]},${value}` : value;
      }
    }

    onFiltersChange({ ...filters, [key]: updatedValue });
    setFilter((prevFilter) => ({
      ...prevFilter,
      [key]: updatedValue,
    }));
  };

  const isFilterActive = (key, value) => {
    const filterArray = filter[key].split(',').map(item => item.trim());
    return filterArray.includes(value);
  };

  const handleDateChange = (e) => {
    const value = e.target.value;
    setShowDatePicker(false);
    setStartDate(null);
    setEndDate(null);
    const updatedFilters = { ...filters };

    if (value === 'today') {
      const today = moment().format('DD-MM-YYYY');
      updatedFilters['start_date'] = today;
      updatedFilters['end_date'] = today;
    } else if (value === 'this weekend') {
      const today = moment();
      const startOfWeekend = today.clone().day(5).format('DD-MM-YYYY'); // viernes
      const endOfWeekend = today.clone().day(7).format('DD-MM-YYYY'); // domingo
      updatedFilters['start_date'] = startOfWeekend;
      updatedFilters['end_date'] = endOfWeekend;
    } else if (value === 'next week') {
      const today = moment();
      const startOfNextWeek = today.clone().add(1, 'weeks').startOf('isoWeek').format('DD-MM-YYYY');
      const endOfNextWeek = today.clone().add(1, 'weeks').endOf('isoWeek').format('DD-MM-YYYY');
      updatedFilters['start_date'] = startOfNextWeek;
      updatedFilters['end_date'] = endOfNextWeek;
    }

    handleFilterChange(null, null, updatedFilters);
  };

  const handleShowDatePickerChange = (e) => {
    setShowDatePicker(e.target.checked);

    if (!e.target.checked) {
      setStartDate(null);
      setEndDate(null);
    }
  };

  const handleDatePickerChange = ({ startDate, endDate }) => {
    const updatedFilters = { ...filters };
    updatedFilters['start_date'] = moment(startDate).format('DD-MM-YYYY');
    updatedFilters['end_date'] = moment(endDate).format('DD-MM-YYYY');

    handleFilterChange(null, null, updatedFilters);
  };

  return(
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8 flex flex-col justify-center items-center py-8 px-10 gap-x-10">
      <div className="flex flex-col md:flex-row xl:px-48 lg:px-36 md:px-24 sm:px-12 xs:px-0">
        <div className="grid w-full">
          <h5 className="text-left font-bold text-fomo-sec-two pb-4">
            Categorías
          </h5>
          <div className="flex flex-wrap gap-2 justify-start pb-4">
            {
              categories &&(
                categories.map(
                  (category, i) => {
                    const name = category['name'];

                    return(
                      <button   key={i}
                                className={`min-w-[123px] inline-block p-2 rounded-lg border ${
                                  isFilterActive('category', name) ? 'bg-fomo-pri-two text-white' : 'border-fomo-pri-two'
                                } shadow-sm mr-2 cursor-pointer text-black`}
                                onClick={() => handleFilterChange('category', name)}
                      >
                        {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
                      </button>
                    );
                  }
                )
              )
            }
            
          </div>
         {/*  <h5 className="text-left font-bold text-fomo-sec-two pb-4">
            Formato
          </h5>
          <div className="flex flex-wrap gap-2 justify-start pb-4">
            <button
              className={`min-w-[123px] inline-block p-2 rounded-lg border ${
                isFilterActive('format', 'festival') ? 'bg-fomo-pri-two text-white' : 'border-fomo-pri-two'
              } shadow-sm mr-2 cursor-pointer text-black`}
              onClick={() => handleFilterChange('format', 'festival')}
            >
              Festival
            </button>
            <button
              className={`min-w-[123px] inline-block p-2 rounded-lg border ${
                isFilterActive('format', 'clase') ? 'bg-fomo-pri-two text-white' : 'border-fomo-pri-two'
              } shadow-sm mr-2 cursor-pointer text-black`}
              onClick={() => handleFilterChange('format', 'clase')}
            >
              Clase
            </button>
            <button
              className={`min-w-[123px] inline-block p-2 rounded-lg border ${
                isFilterActive('format', 'conferencia') ? 'bg-fomo-pri-two text-white' : 'border-fomo-pri-two'
              } shadow-sm mr-2 cursor-pointer text-black`}
              onClick={() => handleFilterChange('format', 'conferencia')}
            >
              Conferencia
            </button>
          </div> */}
          <div className="grid gap-4">
            <div>
              <h5 className="text-left font-bold text-fomo-sec-two pb-4">
                Fecha
              </h5>
              <ul className="list-none space-y-2">
                <li>
                  <label className="flex items-center space-x-2 text-black">
                    <input
                      className="mr-2 checked"
                      type="radio"
                      name="date"
                      value="today"
                      onChange={handleDateChange}
                    />
                    Hoy
                  </label>
                </li>
                <li>
                  <label className="flex items-center space-x-2 text-black">
                    <input
                      className="mr-2"
                      type="radio"
                      name="date"
                      value="this weekend"
                      onChange={handleDateChange}
                    />
                    Este fin de semana
                  </label>
                </li>
                <li>
                  <label className="flex items-center space-x-2 text-black">
                    <input
                      className="mr-2"
                      type="radio"
                      name="date"
                      value="next week"
                      onChange={handleDateChange}
                    />
                    Próxima semana
                  </label>
                </li>
                <li>
                  <label className="flex items-center space-x-2 text-black">
                    <input
                      className="mr-2"
                      type="radio"
                      name="date"
                      value="pick a date"
                      onChange={handleShowDatePickerChange}
                    />
                    Elegir una fecha...
                  </label>
                </li>
                <li className="max-w-xs">
                  <Datepicker
                    locale="es"
                    useRange={true} 
                    startFrom={new Date()} 
                    minDate={new Date()} 
                    i18n={"es"} 
                    primaryColor={"violet"} 
                    selected={startDate}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={handleDatePickerChange}
                    disabled={!showDatePicker} 
                  />
                </li>
              </ul>
            </div>
          </div>
        </div> 
      </div>
    </div>
  );
}


/**   SECCIÓN BÚSQUEDAS POPULARES
 *   <div className="grid md:w-1/4 w-full mt-4 md:mt-0 h-48">
          <h5 className="text-left font-bold text-fomo-sec-two">
            Busquedas Populares
          </h5>
          <ul className='text-fomo-sec-two'>
            <li>Pablo y los Pablitos</li>
            <li>Mario el Rockero</li>
            <li>Hombre Merca</li>
            <li>El Último Falopero</li>
          </ul>
        </div>
 * 
 */
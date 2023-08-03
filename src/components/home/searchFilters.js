'use client';
import { useState, useEffect } from 'react';
import Datepicker from "react-tailwindcss-datepicker"; 
import EventService from '@/app/api/event.service';

export default function SearchFilters ({ filters, onFiltersChange }) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filter, setFilter] = useState({
    start_date: '',
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


  const handleFilterChange = (key, value) => {
    const filterArray = filters[key].split(',').map((item) => item.trim());
    if (filterArray.includes(value)) {
      // Remuevo filtro existente
      const updatedFilters = filterArray.filter((item) => item !== value);
      const updatedValue = updatedFilters.join(',');
      onFiltersChange({ ...filters, [key]: updatedValue });
      setFilter(prevFilter => ({
        ...prevFilter,
        [key]: updatedFilters.join(',')
      }));
    } else {
      // Agrego nuevo filtro a filtros previos
      const updatedValue = filters[key] ? `${filters[key]},${value}` : value;
      onFiltersChange({ ...filters, [key]: updatedValue });
      setFilter(prevFilter => ({
        ...prevFilter,
        [key]: prevFilter[key] ? `${prevFilter[key]},${value}` : value
      }));
    }
    
  };

  const isFilterActive = (key, value) => {
    const filterArray = filter[key].split(',').map(item => item.trim());
    return filterArray.includes(value);
  };

  const handleDateChange = e => {
    const value = e.target.value;
    if (value === 'today') {
      setShowDatePicker(false);
      const today = new Date();
      setFilter({
        ...filter,
        start_date: formatDate(today),
        end_date: formatDate(today)
      });
    } else if (value === 'this weekend') {
      setShowDatePicker(false);
      const nextSaturday = getNextDayOfWeek(6);
      const nextSunday = getNextDayOfWeek(0);
      setFilter({
        ...filter,
        start_date: formatDate(nextSaturday),
        end_date: formatDate(nextSunday)
      });
    } else if (value === 'next week') {
      setShowDatePicker(false);
      const nextMonday = getNextDayOfWeek(1);
      const nextFriday = getNextDayOfWeek(5);
      setFilter({
        ...filter,
        start_date: formatDate(nextMonday),
        end_date: formatDate(nextFriday)
      });
    } else if (value === 'pick a date') {
      setShowDatePicker(true);
      setFilter({
        ...filter,
        start_date: '',
        end_date: ''
      });
    }
    console.log(filter);
  };

  const formatDate = date => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getNextDayOfWeek = dayOfWeek => {
    const today = new Date();
    const targetDay = (dayOfWeek - today.getDay() + 7) % 7;
    today.setDate(today.getDate() + targetDay);
    return today;
  };

 /* 
 datepicker viejo
 const handleDatePickerChange = (dates) => {
    console.log(dates)
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    setFilter({
      ...filter,
      start_date: start ? formatDate(start) : '',
      end_date: end ? formatDate(end) : ''
    });
    console.log(filter);
  }; */
/* datepicker en tailwind para endpoint solo con start_date aunq mande end_date tambien */
  const handleDatePickerChange = ({startDate, endDate}) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setFilter({
      ...filter,
      start_date: startDate ? startDate : '',
      end_date: endDate ? endDate : ''
    });
    console.log(startDate);
    onFiltersChange({ ...filters, ["start_date"]: startDate });
    onFiltersChange({ ...filters, ["end_date"]: endDate });
  };

  return(
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8 flex flex-col justify-center items-center py-8 px-10 gap-x-10 ">
      <div className="flex flex-col md:flex-row xl:px-48 lg:px-36 md:px-24 sm:px-12 xs:px-0">
        <div className="grid md:w-3/4 w-full">
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
                        { name }
                      </button>
                    );
                  }
                )
              )
            }
            
          </div>
          <h5 className="text-left font-bold text-fomo-sec-two pb-4">
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
          </div>
          <div className="grid grid-cols-2 gap-4">
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
                      onChange={handleDateChange}
                    />
                    Elegir una fecha...
                  </label>
                </li>
                {showDatePicker && (
                <li>
                  <Datepicker
                    locale="es"
                    useRange={false} 
                    asSingle={true} 
                    startFrom={new Date()} 
                    minDate={new Date()} 
                    i18n={"es"} 
                    primaryColor={"violet"} 
                    selected={startDate}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={handleDatePickerChange}
                  />
                </li>
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className="grid md:w-1/4 w-full mt-4 md:mt-0 h-48">
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
      </div>
    </div>
  );
}



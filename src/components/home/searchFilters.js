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

  // este state solo para hacer andar el placeholder del datepicker
  const [value, setValue] = useState({ 
    startDate: null, 
    endDate: null 
  }); 

  const [cualquierFechaChecked, setCualquierFechaChecked] = useState(true);

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
    setValue({ startDate: null, endDate: null })
    const value = e.target.value;
    setShowDatePicker(false);
    setStartDate(null);
    setEndDate(null);
    const updatedFilters = { ...filters };

    if (value === 'any') {
      setCualquierFechaChecked(true);
      updatedFilters['start_date'] = null;
      updatedFilters['end_date'] = null;
    } else if (value === 'today') {
      const today = moment().format('DD-MM-YYYY');
      updatedFilters['start_date'] = today;
      updatedFilters['end_date'] = today;
      setCualquierFechaChecked(false);
    } else if (value === 'this weekend') {
      const today = moment();
      let startOfWeekend = today.clone().day(5);
      let endOfWeekend = today.clone().day(7);
      if (today.day() === 0) {
        startOfWeekend = today.format('DD-MM-YYYY');
        endOfWeekend = today.format('DD-MM-YYYY');
      } else {
        startOfWeekend = startOfWeekend.format('DD-MM-YYYY');
        endOfWeekend = endOfWeekend.format('DD-MM-YYYY');
      }
      updatedFilters['start_date'] = startOfWeekend;
      updatedFilters['end_date'] = endOfWeekend;
      setCualquierFechaChecked(false);
    } else if (value === 'next week') {
      const today = moment();
      const startOfNextWeek = today.clone().add(1, 'weeks').startOf('isoWeek').format('DD-MM-YYYY');
      const endOfNextWeek = today.clone().add(1, 'weeks').endOf('isoWeek').format('DD-MM-YYYY');
      updatedFilters['start_date'] = startOfNextWeek;
      updatedFilters['end_date'] = endOfNextWeek;
      setCualquierFechaChecked(false);
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
    setValue({ startDate, endDate }); 
    const updatedFilters = { ...filters };
    updatedFilters['start_date'] = moment(startDate).format('DD-MM-YYYY');
    updatedFilters['end_date'] = moment(endDate).format('DD-MM-YYYY');

    handleFilterChange(null, null, updatedFilters);
  };

  return(
    <div className="w-full max-w-screen-xl mx-auto flex flex-col justify-center items-center px-10 gap-x-10">
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
                      value="any"
                      onChange={handleDateChange}
                      checked={cualquierFechaChecked}
                    />
                    Cualquier fecha
                  </label>
                </li>
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
                    primaryColor={"orange"} 
                    selected={startDate}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={handleDatePickerChange}
                    disabled={!showDatePicker} 
                    displayFormat={"DD/MM/YYYY"}
                    placeholder={"DD/MM/AAAA - DD/MM/AAAA"}
                    value={value} 
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
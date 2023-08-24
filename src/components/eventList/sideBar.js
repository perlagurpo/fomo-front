'use client';
import { useState, useEffect } from 'react';
import EventService from '@/app/api/event.service';
import Datepicker from 'react-tailwindcss-datepicker';
import moment from 'moment';

const Sidebar = ({ filters, setFilters }) => {

  const [categories, setCategories] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateValue, setDateValue]  = useState({ 
      startDate: null,
      endDate: null 
    }
  );

  useEffect(
    () => {
      async function fetchCategories(){
        const fetchedCategories = await EventService.getCategories();
        setCategories(fetchedCategories);
        return fetchedCategories;
      }
      fetchCategories();
    }
  ,[]);
  
  const handleDateChange = (e) => {
    const value = e.target.value;
    var startDate = '', endDate = '';
    const today = moment();
    setShowDatePicker(false);
    setDateValue({ startDate: null, endDate: null });

    switch(value) {
      case 'today':
        startDate = today.format('DD-MM-YYYY');
        endDate = today.format('DD-MM-YYYY');
        break;
      case 'tomorrow':
        startDate = today.add(1, 'days').format('DD-MM-YYYY');
        endDate = today.add(1, 'days').format('DD-MM-YYYY');
        break;
      case 'this weekend':
        startDate = today.clone().day(5).format('DD-MM-YYYY'); // viernes
        endDate = today.clone().day(7).format('DD-MM-YYYY'); // domingo
        break;
      case 'next week':
        startDate = today.clone().add(1, 'weeks').startOf('isoWeek').format('DD-MM-YYYY');
        endDate = today.clone().add(1, 'weeks').endOf('isoWeek').format('DD-MM-YYYY');
        break;
    }
    updateDate(startDate, endDate);
  };

  const handleDatePickerChange = (newValue) => {
    updateDate(
      moment(newValue.startDate).format('DD-MM-YYYY'),
      moment(newValue.endDate).format('DD-MM-YYYY')
    );
    setDateValue(newValue);
  }

  const updateDate = (startDate, endDate) => {
    const updatedFilters = { ...filters };
    updatedFilters['start_date'] = startDate;
    updatedFilters['end_date'] = endDate;
    setFilters(updatedFilters);
  }

  const handleCategoryChange = (value) => {
    var newCategories;
    if(filters.category.includes(value)){
      newCategories = filters.category.filter((c) => c != value);
    } else {
      newCategories = [...filters.category];
      newCategories.push(value);
    }
    setFilters(prevFilter => ({ ...prevFilter, category: newCategories }));
  };

  return (
    <div className="fixed flex flex-col sidebar min-w-[17%] min-h-screen text-left">
      <div className="flex flex-row min-w-full items-start justify-around mt-[40%] transition duration-300">
        <div className="flex flex-col min-h-max pl-12 pr-4 py-2 text-fomo-sec-two">
          
          <h2 className="text-2xl font-bold mb-2 text-fomo-pri-two">Filtros de búsqueda</h2>
          
          <h2 className="text-xl font-bold mb-2 mt-6">Fecha</h2>
          <ul className="list-none space-y-2">
            <li>
              <label className="flex items-center space-x-2">
                <input
                  className="cursor-pointer"
                  type="radio"
                  name="date"
                  value="today"
                  onChange={handleDateChange}
                />
                <p className="pl-1">Hoy</p>
              </label>
            </li>
            <li>
              <label className="flex items-center space-x-2">
                <input
                  className="cursor-pointer"
                  type="radio"
                  name="date"
                  value="tomorrow"
                  onChange={handleDateChange}
                />
                <p className="pl-1">Mañana</p>
              </label>
            </li>
            <li>
              <label className="flex items-center space-x-2">
                <input
                  className="cursor-pointer"
                  type="radio"
                  name="date"
                  value="this weekend"
                  onChange={handleDateChange}
                />
                <p className="pl-1">Este fin de semana</p>
              </label>
            </li>
            <li>
              <label className="flex items-center space-x-2">
                <input
                  className="cursor-pointer"
                  type="radio"
                  name="date"
                  value="pick a date"
                  onChange={() => { setShowDatePicker(true)}}
                />
                <p className="pl-1">Elegir una fecha</p>
              </label>
            </li>
            
              
            <li>
              <div className={`${showDatePicker ? "opacity-100" : "opacity-0"}`}>
                <Datepicker
                  locale="es"
                  useRange={true} 
                  startFrom={new Date()} 
                  minDate={new Date()} 
                  i18n={"es"} 
                  primaryColor={"orange"} 
                  selected={dateValue.startDate}
                  value={dateValue}
                  onChange={(newValue)  => handleDatePickerChange(newValue)}
                />
              </div>
            </li>
          </ul>
          
          <h2 className="text-xl font-bold mb-2 mt-6">Categoría</h2>
          <ul className="list-none space-y-2">
            {
              categories.map(
                (category, i) => {
                  return(
                    <li key={i}>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="category"
                          value={category.name}
                          checked={filters.category.includes(category.name)}
                          onChange={(e) => handleCategoryChange(e.target.value)}
                        />
                        <p className="pl-1">{category.name}</p>
                      </label>
                    </li>
                  );
                }
              )
            }
            
          </ul>
        </div>
        {/* divisor */}
        <div className="min-h-[30em] border border-fomo-pri-two pt-8">     
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
'use client';
import { useState, useEffect } from 'react';
import EventService from '@/app/api/event.service';
import Datepicker from 'react-tailwindcss-datepicker';
import moment from 'moment';
import { SettingsIcon } from '@/components/icons/icons';
import { useRouter } from 'next/navigation';
import { buildQueryString } from '../utils/filterOperations';
import useDeviceSize from '@/hooks/useDeviceSize';

const Sidebar = ({ filters, setFilters }) => {
  const [windowWidth, windowHeight] = useDeviceSize();

  const [categories, setCategories] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateValue, setDateValue]  = useState({ 
      startDate: null,
      endDate: null 
    }
  );
  const [showFilters, setShowFilters] = useState(false);
  const [previousQueryString, setPreviousQueryString] = useState('');
  const [cualquierFechaChecked, setCualquierFechaChecked] = useState(false);
  const [hoyChecked, setHoyChecked] = useState(false);
  const [mananaChecked, setMananaChecked] = useState(false);
  const [finDeSemanaChecked, setFinDeSemanaChecked] = useState(false);
  const [elegirUnaFechaChecked, setElegirUnaFechaChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const queryStringWithFilters = buildQueryString(
      filters['event_name'] ? filters['event_name'] : '',
      filters
    );

    // Check if the query string has changed before updating.
    if (queryStringWithFilters !== previousQueryString) {
      setPreviousQueryString(queryStringWithFilters);
      router.push(`/eventos?${queryStringWithFilters}`);
      // Update the previousQueryString here.
    }
  }, [filters]);

  useEffect(
    () => {
      if (windowWidth > 767) {
        setShowFilters(true);
      }
    }
  )

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
  
  useEffect(() => {
    const startDate = filters.start_date != '' ? moment(filters.start_date, 'DD-MM-YYYY') : '';
    const endDate = filters.end_date != '' ? moment(filters.end_date, 'DD-MM-YYYY') : '';
    
    const today = moment();

    if (startDate == '' && endDate == '') {
      setCualquierFechaChecked(true);
    } else if (startDate.isSame(today, 'day') && endDate.isSame(today, 'day')) {
      setHoyChecked(true);
    } else if (startDate.isSame(today.clone().add(1, 'day'), 'day') && endDate.isSame(today.clone().add(2, 'day'), 'day')) {
      setMananaChecked(true);
    } else if (startDate.isSame(today.clone().day(5), 'day') && endDate.isSame(today.clone().day(7), 'day')) {
      setFinDeSemanaChecked(true);
    } else {
      // si llego aca significa que tiene q ser elegi una fecha
      setElegirUnaFechaChecked(true)
    }
  }, [filters]);
    
  const handleDateChange = (e) => {
    const value = e.target.value;
    var startDate = '',
      endDate = '';
    const today = moment();
    setShowDatePicker(false);
    setDateValue({ startDate: null, endDate: null });

    switch (value) {
      case 'any':
        setHoyChecked(false);
        setMananaChecked(false);
        setFinDeSemanaChecked(false);
        setElegirUnaFechaChecked(false);
        setCualquierFechaChecked(true);
        break;
      case 'today':
        startDate = today.format('DD-MM-YYYY');
        endDate = today.format('DD-MM-YYYY');
        setHoyChecked(true);
        setMananaChecked(false);
        setFinDeSemanaChecked(false);
        setElegirUnaFechaChecked(false);
        setCualquierFechaChecked(false);
        break;
      case 'tomorrow':
        startDate = today.add(1, 'days').format('DD-MM-YYYY');
        endDate = today.add(1, 'days').format('DD-MM-YYYY');
        setHoyChecked(false);
        setMananaChecked(true);
        setFinDeSemanaChecked(false);
        setElegirUnaFechaChecked(false);
        setCualquierFechaChecked(false);
        break;
      case 'this weekend':
        const startOfWeekend = today.clone().day(5);
        const endOfWeekend = today.clone().day(7);

        if (today.day() === 0) {
          startDate = today.format('DD-MM-YYYY');
          endDate = today.format('DD-MM-YYYY');
        } else {
          startDate = startOfWeekend.format('DD-MM-YYYY');
          endDate = endOfWeekend.format('DD-MM-YYYY');
        }
        setHoyChecked(false);
        setMananaChecked(false);
        setFinDeSemanaChecked(true);
        setElegirUnaFechaChecked(false);
        setCualquierFechaChecked(false);
        break;
    }
    updateDate(startDate, endDate);
  };


  const handleDatePickerChange = (newValue) => {
    updateDate(
      moment(newValue.startDate).format('DD-MM-YYYY'),
      moment(newValue.endDate).format('DD-MM-YYYY')
    );
    setHoyChecked(false);
    setMananaChecked(false);
    setFinDeSemanaChecked(true);
    setElegirUnaFechaChecked(false);
    setCualquierFechaChecked(true);
    setDateValue(newValue);
  }

  const updateDate = (startDate, endDate) => {
    const updatedFilters = { ...filters };
    updatedFilters['start_date'] = startDate;
    updatedFilters['end_date'] = endDate;
    setFilters(updatedFilters);
  } 

  const handleCategoryChange = (key, value, dateFilters = null) => {
     const filterArray =
    typeof filters[key] === 'string'
      ? filters[key].split(',').map((item) => item.trim())
      : [];
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

    setFilters((prevFilter) => ({
      ...prevFilter,
      [key]: updatedValue,
    }));
  };

  return (
        <div className="flex flex-col w-full">
        {
          windowWidth > 767 ? <h2 className="text-2xl font-bold mb-2 text-fomo-pri-two">Filtros de búsqueda</h2> :
            <button className="flex flex-row gap-4 rounded-full px-6 py-3 bg-fomo-pri-two items-center justify-around" onClick={() => setShowFilters(!showFilters)}>
              <SettingsIcon />
              <p className="text-fomo-sec-white font-semibold text-lg ml-3">Filtros de búsqueda</p>
            </button>
        }
          <div className={`${showFilters ? "" : "hidden"}`}>
            <h2 className="text-xl font-bold mb-2 mt-6">Fecha</h2>
            <ul className="list-none space-y-2">
              <li>
                <label className="flex items-center space-x-2">
                  <input
                    className="cursor-pointer"
                    type="radio"
                    name="date"
                    value="any"
                    onChange={handleDateChange}
                    checked={cualquierFechaChecked} 
                  />
                  <p className="pl-1">Cualquier fecha</p>
                </label>
              </li>
              <li>
                <label className="flex items-center space-x-2">
                  <input
                    className="cursor-pointer"
                    type="radio"
                    name="date"
                    value="today"
                    onChange={handleDateChange}
                    checked={hoyChecked} 
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
                    checked={mananaChecked} 
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
                    checked={finDeSemanaChecked} 
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
                    onChange={() => {
                      setShowDatePicker(!showDatePicker)
                      setHoyChecked(false);
                      setMananaChecked(false);
                      setFinDeSemanaChecked(false);
                      setElegirUnaFechaChecked(true);
                      setCualquierFechaChecked(false);
                    }}
                    checked={elegirUnaFechaChecked} 
                  />
                  <p className="pl-1">Elegir una fecha...</p>
                </label>
              </li>
              
                
              <li>
                <div className={`${showDatePicker ? "opacity-100" : "opacity-0"} ${showDatePicker ? "max-h-fit" : "max-h-0"} relative transition duration-400 z-30`}>
                  
                    <Datepicker
                      locale="es"
                      useRange={true} 
                      startFrom={new Date()} 
                      minDate={new Date()} 
                      i18n={"es"} 
                      primaryColor={"orange"} 
                      selected={dateValue.startDate}
                      value={dateValue}
                      popoverDirection="down"
                      onChange={(newValue)  => handleDatePickerChange(newValue)}
                      displayFormat={"DD/MM/YYYY"}
                      placeholder={"DD/MM/AAAA - DD/MM/AAAA"}                   
                    />
                  
                </div>
              </li>
            </ul>
          
          <h2 className="text-xl font-bold mb-2 mt-6">Categoría</h2>
          <div className="flex-column justify-start">
            {categories.map((category, i) => {
              const name = category['name'];

              const categoryFilter =
                typeof filters.category === 'string' ? filters.category : '';

              return (
                <div className="mb-3" key={i}>
                  <button
                    className={`min-w-[123px] block p-2 rounded-lg border ${
                      categoryFilter.split(',').includes(category.name)
                        ? 'bg-fomo-pri-two text-white'
                        : 'border-fomo-pri-two'
                    } shadow-sm mr-2 cursor-pointer text-black`}
                    onClick={() => handleCategoryChange('category', name)}
                  >
                    {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
                  </button>
                </div>
              );
            })}

          </div>
            
      </div>
      {/* divisores */}
      <div className={`${showFilters ? "block" : "hidden" } min-w-full px-2 py-2 border-b-2 border-fomo-pri-two md:hidden`}></div>
    </div>

  );
};


export default Sidebar;
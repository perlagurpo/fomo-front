'use client';
import { useState, useEffect } from 'react';
import EventService from '@/app/api/event.service';
import Datepicker from 'react-tailwindcss-datepicker';
import moment from 'moment';
import { SettingsIcon } from '@/components/icons/icons';
import { useRouter } from 'next/navigation';
import { buildQueryString } from '../utils/filterOperations';

const Sidebar = ({ filters, setFilters }) => {
  const [categories, setCategories] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateValue, setDateValue]  = useState({ 
      startDate: null,
      endDate: null 
    }
  );
  const [showFilters, setShowFilters] = useState(false);
  const [previousQueryString, setPreviousQueryString] = useState('');
  const router = useRouter();
  
  useEffect(() => {
    // Function to update the showFilters state based on window width
    function handleWindowResize() {
      if (window.innerWidth < 767) {
        setShowFilters(false);
      } else {
        setShowFilters(true);
      }
    }

    // Initial check when the component mounts
    handleWindowResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleWindowResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

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
        <div>
        {window.innerWidth > 767 ? <h2 className="text-2xl font-bold mb-2 text-fomo-pri-two">Filtros de búsqueda</h2> :
          <button className="flex flex-row gap-4 rounded-full px-6 py-3 bg-fomo-pri-two" onClick={() => setShowFilters(!showFilters)}>
            <SettingsIcon />
            <p className="text-fomo-sec-white font-semibold text-lg">Filtros de búsqueda</p>
          </button>}
          <div className={`${showFilters ? "" : "hidden"}`}>
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
                    onChange={() => { setShowDatePicker(!showDatePicker)}}
                  />
                  <p className="pl-1">Elegir una fecha</p>
                </label>
              </li>
              
                
              <li>
                <div className={`${showDatePicker ? "opacity-100" : "opacity-0"} ${showDatePicker ? "max-h-fit" : "max-h-0"} relative transition duration-400`}>
                  
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
          <div className="flex-column justify-start">
            {categories.map((category, i) => {
              const name = category['name'];

              const categoryFilter =
                typeof filters.category === 'string' ? filters.category : '';

              return (
                <div className="mb-3">
                  <button
                    key={i}
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
        <div className="hidden md:flex min-h-[30em] pt-8"></div>
        </div>

  );
};


export default Sidebar;
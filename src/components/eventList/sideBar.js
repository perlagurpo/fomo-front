'use client';
import React, { useState, useEffect } from 'react';

const Sidebar = ({ events, setFilteredEvents }) => {
  const [filter, setFilter] = useState({
    start_date: '',
    price: '',
    category: '',
    format: '',
    event_type: ''
  });

  useEffect(() => {
    const filteredEvents = events.filter(event => {
      const { start_date, price, category, format, event_type } = filter;
      return (
        (start_date === '' || event.start_date === start_date) &&
        (price === '' || event.price === price) &&
        (category === '' || event.category === category) &&
        (format === '' || event.format === format) &&
        (event_type === '' || event.event_type === event_type)
      );
    });
    setFilteredEvents(filteredEvents);
  }, [events, filter, setFilteredEvents]);

  const handleDateChange = e => {
    const value = e.target.value;
    setFilter(prevFilter => ({ ...prevFilter, start_date: value }));
  };

  const handlePriceChange = e => {
    const value = e.target.value;
    setFilter(prevFilter => ({ ...prevFilter, event_type: value }));
  };

  const handleCategoryChange = e => {
    const value = e.target.value;
    setFilter(prevFilter => ({ ...prevFilter, category: value }));
  };

  const handleFormatChange = e => {
    const value = e.target.value;
    setFilter(prevFilter => ({ ...prevFilter, format: value }));
  };

  return (
    <div className="sidebar">
      <h2 className="text-lg font-semibold mb-2">Fecha:</h2>
      <ul className="list-none space-y-2">
        <li>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="date"
              value="today"
              checked={filter.start_date === 'today'}
              onChange={handleDateChange}
            />
            Hoy
          </label>
        </li>
        <li>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="date"
              value="tomorrow"
              checked={filter.start_date === 'tomorrow'}
              onChange={handleDateChange}
            />
            Mañana
          </label>
        </li>
        <li>
          <label>
            <input
              type="radio"
              name="date"
              value="this weekend"
              checked={filter.start_date === 'this weekend'}
              onChange={handleDateChange}
            />
            Este fin de semana
          </label>
        </li>
        <li>
          <label>
            <input
              type="radio"
              name="date"
              value="pick a date"
              checked={filter.start_date === 'pick a date'}
              onChange={handleDateChange}
            />
            Elegir una fecha...
          </label>
        </li>
      </ul>

      <h2 className="text-lg font-semibold mb-2">Event Type:</h2>
      <ul className="list-none space-y-2">
        <li>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="price"
              value="test1"
              checked={filter.event_type === 'test1'}
              onChange={handlePriceChange}
            />
            test1
          </label>
        </li>
        <li>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="price"
              value="test2"
              checked={filter.event_type === 'test2'}
              onChange={handlePriceChange}
            />
            test2
          </label>
        </li>
      </ul>
      <h2 className="text-lg font-semibold mb-2">Categoría:</h2>
      <ul className="list-none space-y-2">
        <li>
          <label>
            <input
              type="radio"
              name="category"
              value="music"
              checked={filter.category === 'music'}
              onChange={handleCategoryChange}
            />
            Música
          </label>
        </li>
        <li>
          <label>
            <input
              type="radio"
              name="category"
              value="food"
              checked={filter.category === 'food'}
              onChange={handleCategoryChange}
            />
            Gastronomía
          </label>
        </li>
      </ul>

      <h2 className="text-lg font-semibold mb-2">Formato:</h2>
      <ul className="list-none space-y-2">
        <li>
      <label>
        <input
          type="radio"
          name="format"
          value="class"
          checked={filter.format === 'class'}
          onChange={handleFormatChange}
        />
        Clase
      </label>
      </li>
      <li>
      <label>
        <input
          type="radio"
          name="format"
          value="conference"
          checked={filter.format === 'conference'}
          onChange={handleFormatChange}
        />
        Conferencia
      </label>
      </li>
      <li>
      <label>
        <input
          type="radio"
          name="format"
          value="festival"
          checked={filter.format === 'festival'}
          onChange={handleFormatChange}
        />
        Festival
      </label>
      </li></ul>
    </div>
  );
};

export default Sidebar;

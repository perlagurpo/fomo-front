'use client';
import React from 'react';

const EventCard = ({ event }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-8 mx-auto">
    <div key={event.id} className="grid grid-cols-1 md:grid-cols-5 p-5">
    <div className="col-span-1 md:col-span-1">
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{event.event_type}</p>
      <a href="#">
        <img className="max-w-150 max-h-150 rounded-t-lg" src="https://m.media-amazon.com/images/I/51D23PS0-+L._UXNaN_FMjpg_QL85_.jpg" alt="" style={{ maxWidth: '150px', maxHeight: '150px' }}/>
      </a>
      </div>
      <div className="p-2">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{event.event_name}</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{event.event_description}</p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{event.start_date}</p>
        <a
          href="#"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Leer Mas
        </a>
      </div>
    </div>
  </div>
  );
};

export default EventCard;
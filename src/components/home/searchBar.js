'use client';
import React, { useState } from 'react';

export default function SearchBar ({ onToggleFilters, onSearch, showFilters }) {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    if (searchValue.trim() !== '') {
      onSearch(searchValue);
      onToggleFilters();
    }
  };

  const backToHome = () => {
    onToggleFilters();
  }

  return (
    <div className="w-full max-w-screen-xl mx-auto p-4 sm:pt-6 md:pt-8 md:pb-4 xl:px-72 lg:px-60 flex pt-8 md:px-48 sm:px-36 xs:px-24  justify-center">
      <div className="flex flex-col w-full">
        {showFilters && 
        <div className="relative">
          <button onClick={backToHome} className="text-black">
            <svg
              className="w-5 h-5 text-#ED6E2F"
              fill="none"
              stroke="#ED6E2F"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h14M12 5l-7 7 7 7"
              ></path>
            </svg>
          </button>
        </div>}
        <div className="relative">
          <p className="text-black text-center pb-6">Encontrar un evento para vos nunca fue tan fácil*</p>
        </div>
        <div className="relative w-full">
          {showFilters ? 
            <input
              type="text"
              className="bg-transparent text-black w-full pl-14 pr-4 py-2 rounded-lg border-2 focus:outline-none focus:border-blue-500"
              placeholder="Buscar Eventos"
              value={searchValue}
              onChange={handleInputChange}
              onKeyUp={(e) => {if(e.key == "Enter") {handleSearch()}}}
            /> 
            :
            <input
              type="text"
              className="bg-transparent text-black w-full pl-14 pr-4 py-2 rounded-lg border-2 focus:outline-none focus:border-blue-500"
              placeholder="Buscar Eventos"
              value={searchValue}
              readOnly
              onClick={onToggleFilters} 
            />
          }
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none">
              <path fill="#ED6E2F" d="M22.87 20.126h-1.445l-.512-.494a11.84 11.84 0 0 0 2.872-7.74 11.893 11.893 0 1 0-11.893 11.893 11.84 11.84 0 0 0 7.74-2.872l.494.512v1.445L29.274 32 32 29.274l-9.13-9.148Zm-10.978 0a8.222 8.222 0 0 1-8.233-8.234 8.222 8.222 0 0 1 8.233-8.233 8.222 8.222 0 0 1 8.234 8.233 8.222 8.222 0 0 1-8.234 8.234Z" />
            </svg>
          </div>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button onClick={handleSearch}>
              <svg
                  className="w-5 h-5 text-#ED6E2F"
                  fill="none"
                  stroke="#ED6E2F"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h14M12 5l7 7-7 7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
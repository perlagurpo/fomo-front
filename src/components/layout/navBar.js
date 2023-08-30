'use client';
import { useState } from 'react';
import Link from "next/link";

export default function Navbar() {

  const [menuOpened, setMenuOpened] = useState(false);

  return(
    <nav className="bg-fomo-sec-white border-gray-200 dark:fomo-pri-one">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
            <img src="/img/logos/Recurso 23_SVG.svg" className="h-8 mr-3" alt="Fomo Agenda Logo" />
        </Link>
        <button onClick={() => setMenuOpened(!menuOpened)}
                type="button" 
                className="inline-flex items-center bg-transparent p-2 ml-3 rounded-lg md:hidden" aria-controls="navbar-default" aria-expanded="false">
          <svg className="w-6 h-6 fill-fomo-pri-two" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-fomo-pri-white dark:bg-fomo-pri-white md:dark:bg-fomo-sec-white font-semibold text-fomo-pri-one dark:text-fomo-pri-two dark:text-fomo-pri-two dark:text-fomo-pri-two">
            <li>
              <Link href="/eventos" className="block py-2 pl-3 pr-4 rounded md:border-0 md:hover:text-orange-700 md:p-0  md:dark:hover:text-fomo-pri-one dark:hover:text-fomo-pri-one transition duration-300">
                Eventos
              </Link>
            </li>
            
            <li>
              <Link href="/" className="block py-2 pl-3 pr-4 rounded md:border-0 md:hover:text-orange-700 md:p-0  md:dark:hover:text-fomo-pri-one dark:hover:text-fomo-pri-one transition duration-300">
                Nosotros
              </Link>
            </li>
          </ul>
        </div>

        <div className={`${ menuOpened ? "block" : "hidden"} w-full md:hidden`} onClick={() => setMenuOpened(false)}>
          <ul className="flex flex-col text-center p-4 text-lg font-medium text-fomo-pri-one dark:bg-fomo-sec-white dark:text-fomo-pri-two">
            <li>
              <Link href="/eventos" className="block py-2 pl-3 pr-4 rounded md:border-0 md:hover:text-orange-700 md:p-0  md:dark:hover:text-fomo-pri-one dark:hover:text-fomo-pri-one">
                Eventos
              </Link>
            </li>
            
            <li>
              <Link href="/" className="block py-2 pl-3 pr-4 rounded md:border-0 md:hover:text-orange-700 md:p-0  md:dark:hover:text-fomo-pri-one dark:hover:text-fomo-pri-one">
                Nosotros
              </Link>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
}
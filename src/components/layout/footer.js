import { InstagramIcon, LinktreeIcon } from "../icons/icons";

export default function Footer() {
return(
  <footer className="bg-fomo-sec-two shadow text-fomo-sec-white">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <a href="/" className="flex items-center mb-4 sm:mb-0">            
          <img src="/img/logos/Recurso_21_SVG.svg" className="h-12 mr-3" alt="Fomo Logo" />
        </a>
        <div className="flex flex-row items-center gap-2">
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0">
            <li>
              <a href="#" className="mr-4 text-md hover:text-fomo-pri-two transition duration-300">Nosotros</a>
            </li>
          </ul>
          <a href="https://www.instagram.com/fomo.grupo/" target="_blank">
            <div className="fill-fomo-sec-white hover:fill-fomo-pri-two transition duration-300">
              <InstagramIcon />
            </div>
          </a>
          <a href="https://linktr.ee/fomo.agenda" target="_blank">
            <div className="fill-fomo-sec-white hover:fill-fomo-pri-two transition duration-300">
              <LinktreeIcon />
            </div>
          </a>
        </div>
      </div>
      <hr className="my-5 border-fomo-pri-two sm:mx-auto lg:my-5" />
      <span className="block text-sm sm:text-center ">© 2023 Grupo Fomo™. Todos los derechos reservados.</span>
    </div>
  </footer>
  )
}
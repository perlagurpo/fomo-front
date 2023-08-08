export default function Footer() {
return(
  <footer className="bg-primary-one shadow dark:bg-gray-900">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
      <div className="sm:flex sm:items-center sm:justify-between">
          <a href="/" className="flex items-center mb-4 sm:mb-0">            
              <img src="/img/logos/Recurso_21_SVG.svg" className="h-12 mr-3" alt="Fomo Logo" />
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                  <a href="#" className="mr-4 hover:underline md:mr-6 ">Nosotros</a>
              </li>
              <li>
                  <a href="#" className="mr-4 hover:underline md:mr-6">Política de privacidad</a>
              </li>
              <li>
                  <a href="#" className="hover:underline">Contacto</a>
              </li>
          </ul>
      </div>
      <hr className="my-5 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-5" />
      <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 Grupo Fomo™. Todos los derechos reservados.</span>
    </div>
  </footer>
  )
}
## Fomo front end

Antes de correr la aplicación por primera vez, ejecutar el siguiente comando en la terminal para instalar todas sus dependecias:

```bash
npm install
```

Para correr la aplicación en local, ejecutar el comando ```npm run dev`. Abrir [http://localhost:3000](http://localhost:3000) en el navegador para ver el resultado.

## Estructura de directorios del proyecto

La carpeta `/app` contiene las páginas que Next renderiza en el frontend. La estructura de directorios de dicha carpeta determina las URLs de la siguiente manera:
- Cada carpeta dentro de `/app` se mapea a una URL singular según su nombre: `URLbase/nombreDeCarpeta`.
- Para visualizar una página, mínimamente hay que crear un archivo de js/jsx nombrado `page.js` dentro de la carpeta y en él escribir y exportar un componente de React que será renderizado. También se pueden agregar layouts para cada ruta creando páginas nomencladas como `layout.js` dentro de la misma carpeta (lo mismo puede ser realizado para páginas de carga y páginas de error -ver documentación de NextJS-).

La carpeta `/components` contiene los componentes de react que son llamados desde las páginas contenidas en `/app` para ser renderizados. Están organizados según categoría o páginas a las que están destinados.
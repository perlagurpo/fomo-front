import { useEffect, useState } from "react";
import BannerService from '@/app/api/banner.service';


/**
 * Banner para sponsors publicitarios
 * espera traer un objeto con imágenes para celu y para pc en iguales cantidades
 * se adapta al tamaño de su contenedor
 */
export default function SponsorBanner() {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [banners, setBanners] = useState([]);
  var bannersLength, timeoutID;

  function actualizarBanner() {
    setCurrentIndex(prevIndex => (prevIndex + 1) % bannersLength);
    timeoutID = setTimeout(actualizarBanner, 5000);
  }

  useEffect(
    () => {
      async function getData() {
        const rawBanners = await BannerService.getBanners();
        const newBanners = rawBanners.map(
          // Para testear en localhost
          (banner) => {
            banner.image_short = "http://localhost:8000" + banner.image_short;
            banner.image_short_mobile = "http://localhost:8000" + banner.image_short_mobile;
            return banner
          }
        )
        console.log(newBanners);
        bannersLength = newBanners.length;
        setBanners(newBanners);
      }
      getData().then(
        () => actualizarBanner()
      );
      return () => clearTimeout(timeoutID);
    }
  ,[]);

  

  return(
    <div className="w-full h-full">
      {
        banners.length > 0 && (
          <>
            <img src={banners[currentIndex].image_short} className="hidden md:block w-full h-full opacity-90" />
            <img src={banners[currentIndex].image_short_mobile} className="md:hidden w-full h-full opacity-90" />
          </>
        )
      }
    </div>
  );
}
import { useEffect, useState } from "react";
import BannerService from '@/app/api/banner.service';


/**
 * Banner para sponsors publicitarios
 * espera recibir un objeto con imágenes para celu o para pc
 */
export default function SponsorBanner() {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [banners, setBanners] = useState([]);
  var bannersLength;

  function actualizarBanner() {
    console.log("actualizo")
    setCurrentIndex(prevIndex => (prevIndex + 1) % bannersLength);
    setTimeout(actualizarBanner, 5000);
  }

  useEffect(
    () => {
      async function getData() {
        const rawBanners = await BannerService.getBanners();
        const newBanners = rawBanners.map(
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
      
    }
  ,[]);

  

  return(
    <div className="w-full h-full">
      <p>{currentIndex}</p>
      {
        banners.length > 0 && <img src={banners[currentIndex].image_short} className="hidden md:block w-full h-full opacity-90" />
        
        
      }
    </div>
  );

}


     /* {
          images.small && (
            <img src={images[currentImg][image_short_mobile]} className="block md:hidden w-full h-full opacity-90" />
          )
        } */
import React, { useState, useEffect } from 'react';
import HomeService from '@/app/api/home.service';
import useDeviceSize from '@/hooks/useDeviceSize';

const HomeBanner = () => {
  const [windowWidth, windowHeight] = useDeviceSize();
  const [carouselData, setCarouselData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await HomeService.getCarouselData();
      setCarouselData(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselData]);

  if (carouselData.length === 0) {
    return null;
  }

  const handleImageSrc = (item) => {
    return windowWidth < 768 ? item.image_short_mobile : item.image_short;
  };

  return (
    <div className="relative w-full mx-auto" style={{maxWidth: '1248px'}}>
      <div className="w-full" style={{ paddingBottom: windowWidth < 768 ? `${(360 / 480) * 100}%` : `${(300 / 1280) * 100}%` }}>
      {carouselData.map((item, index) => (
        <a
          key={index}
          href={item.link_button}
          target="_blank"
          rel="noopener noreferrer"
          className={`absolute inset-0 transform transition-transform ${
            index === activeIndex ? 'opacity-100 translate-x-0' : 'hidden opacity-0 translate-x-full'
          }`}
          style={{
            backgroundImage: `url(http://18.231.76.133${handleImageSrc(item)})`,
            zIndex: index === activeIndex ? 1 : 0,
          }}
        >
          <img
            src={`http://18.231.76.133${handleImageSrc(item)}`}
            alt="Banner"
            className="object-cover w-full h-full"
          />
        </a>
      ))}
      </div>

      {carouselData.length > 1 && (
        <>
          <button
            className="absolute top-1/2 transform -translate-y-1/2 left-4 text-white p-2 rounded-full opacity-75 z-10 hover:bg-gray-500 transition-colors duration-300"
            onClick={() => setActiveIndex((activeIndex - 1 + carouselData.length) % carouselData.length)}
          >
            &#60;
          </button>
          <button
            className="absolute top-1/2 transform -translate-y-1/2 right-4 text-white p-2 rounded-full opacity-75 z-10 hover:bg-gray-500 transition-colors duration-300"
            onClick={() => setActiveIndex((activeIndex + 1) % carouselData.length)}
          >
            &#62;
          </button>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {carouselData.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-6 rounded-full ${activeIndex === index ? 'bg-white' : 'bg-gray-400'}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HomeBanner;
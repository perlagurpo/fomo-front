import React, { useState, useEffect } from 'react';
import HomeService from '@/app/api/home.service';

const HomeBanner = () => {
  const [defaultHeight, setDefaultHeight] = useState(0);
  const [carouselData, setCarouselData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setDefaultHeight(window.innerWidth < 768 ? 360 : 221);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
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

return (
  <div className="w-full max-w-screen-xl mx-auto relative" style={{ minHeight: `${defaultHeight}px`, maxHeight: `${defaultHeight}px` }}>
    {carouselData.map((item, index) => (
      <a
        key={index}
        href={item.link_button}
        target="_blank"
        rel="noopener noreferrer"
        className={`absolute w-full h-221 transform transition-transform ${
          index === activeIndex ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
        }`}
        style={{
          backgroundImage: `url(${
            window.innerWidth < 768 ? 'http://18.231.76.133' + item.image_short_mobile : 'http://18.231.76.133' + item.image_short
          })`,
          zIndex: index === activeIndex ? 1 : 0,
          minHeight: `${defaultHeight}px`,
          maxHeight: `${defaultHeight}px`,
        }}
      >
        <img
          src={window.innerWidth < 768 ? 'http://18.231.76.133' + item.image_short_mobile : 'http://18.231.76.133' + item.image_short}
          alt="Banner"
          className="h-221 w-full object-cover"
          style={{ minHeight: `${defaultHeight}px`, maxHeight: `${defaultHeight}px` }}
        />
      </a>
    ))}

    {carouselData.length > 1 && (
      <button
        className="absolute top-1/2 transform -translate-y-1/2 left-4 text-white p-2 rounded-full opacity-75 z-10 hover:bg-gray-500 transition-colors duration-300"
        onClick={() => setActiveIndex((activeIndex - 1 + carouselData.length) % carouselData.length)}
      >
        &#60;
      </button>
    )}

    {carouselData.length > 1 && (
      <button
        className="absolute top-1/2 transform -translate-y-1/2 right-4 text-white p-2 rounded-full opacity-75 z-10 hover:bg-gray-500 transition-colors duration-300"
        onClick={() => setActiveIndex((activeIndex + 1) % carouselData.length)}
      >
        &#62;
      </button>
    )}

    {carouselData.length > 1 && (
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {carouselData.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-6 rounded-full ${activeIndex === index ? 'bg-white' : 'bg-gray-400'}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    )}
  </div>);
};

export default HomeBanner;
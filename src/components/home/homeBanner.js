import React, { useState, useEffect } from 'react';
//import HomeService from '@/app/api/home.service';

const HomeBanner = () => {
  const [carouselData, setCarouselData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      // const data = await HomeService.getCarouselData();
      const data = [
        {
          img_url: 'https://i.ibb.co/NVMXDqf/banner.jpg',
          //img_url_mobile: 'https://i.ibb.co/NVMXDqf/banner.jpg',
          redirect_link: 'https://www.google.com/search?channel=fs&client=ubuntu&q=react+tailwind+carousel'
        },
        {
          img_url: 'https://i.ibb.co/k4phbF8/banner-1.jpg',
          //img_url_mobile: 'https://i.ibb.co/NVMXDqf/banner.jpg',
          redirect_link: 'https://www.google.com/search?channel=fs&client=ubuntu&q=react+tailwind+carousel'
        },
      ]
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
  <div className="w-full max-w-screen-xl mx-auto relative" style={{ minHeight: '221px' }}>
    {carouselData.map((item, index) => (
      <a
        key={index}
        href={item.redirect_link}
        target="_blank"
        rel="noopener noreferrer"
        className={`absolute w-full h-221 transform transition-transform ${
          index === activeIndex ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
        }`}
        style={{ backgroundImage: `url(${item.img_url})`, zIndex: index === activeIndex ? 1 : 0 }}
      >
        <img
          src={item.img_url}
          alt="Banner"
          className="h-221 w-full object-cover"
        />
      </a>
    ))}

    <button
      className="absolute top-1/2 transform -translate-y-1/2 left-4 bg-gray-500 text-white p-2 rounded-full opacity-75 z-10"
      onClick={() => setActiveIndex((activeIndex + 1) % carouselData.length)}
    >
      &#60;
    </button>
    <button
      className="absolute top-1/2 transform -translate-y-1/2 right-4 bg-gray-500 text-white p-2 rounded-full opacity-75 z-10"
      onClick={() => setActiveIndex((activeIndex - 1 + carouselData.length) % carouselData.length)}
    >
      &#62;
    </button>
  </div>
);
};

export default HomeBanner;
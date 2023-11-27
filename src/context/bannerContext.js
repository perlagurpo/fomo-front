// 'use client';
// import { createContext, useState, useEffect } from 'react';
// import BannerService from '@/app/api/banner.service';

// export const BannerContext = createContext([]);

// export default function BannerProvider({ children }) {
//   const [banners, setBanners] = useState([]);

//   useEffect(
//     () => {
//       async function getData() {
//         const banners = await BannerService.getBanners();
//         setBanners(banners);
//       }
//       getData();
//     }
//   , []);

//   async function getBanners() {
//     const banners = await BannerService.getBanners();
//     setBanners(banners);
//   }

//   return(
//     <BannerContext.Provider value={{ banners, getBanners }}>
//       {children}
//     </BannerContext.Provider>
//   );
// } 
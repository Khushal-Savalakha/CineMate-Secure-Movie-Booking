import { Carousel } from "flowbite-react";
import React from 'react';
import banner2 from '../assets/images/banner2.webp';
import banner3 from '../assets/images/banner3.webp';
import banner4 from '../assets/images/banner4.webp';

const HomeSection = () => {
  return (
    <div className="pt-2 h-56 sm:h-64 xl:h-80 2xl:h-96 bg-gray-800">
      <Carousel slide={true}>
        <img src={banner2} alt="Banner 2" className="object-cover w-full h-full" />
        <img src={banner3} alt="Banner 3" className="object-cover w-full h-full" />
        <img src={banner4} alt="Banner 4" className="object-cover w-full h-full" />
        {/* Add more images as needed */}
      </Carousel>
    </div>
  );
}

export default HomeSection;

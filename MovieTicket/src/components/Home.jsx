import React from 'react';
import HomeSection from './HomeSection';
import MoviesCard from './MoviesCard';
import Footer from './Footer';
import Navbar from './Navbar';

const Home = () => {
  return (
    <>
    {/* <Navbar/> */}
      <HomeSection />
      <MoviesCard />
      <Footer />
    </>
  );
};

export default Home;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import list from './movielist.json'; // Adjusted import path
import Card from './Card';

const MoviesCard = () => {
  const navigate = useNavigate();

  const handleMovieClick = (movie, booking = false) => {
    // Navigate to the MovieDetail page with movie details
    navigate('/movie-detail', { state: { movie, booking } });
  };

  // Limit the number of movies displayed to 6
  const limitedList = list.slice(0, 6);

  return (
    <div className='ml-[15px]'>
      {/* Display first 3 movies with booking option */}
      <div className='grid grid-cols-3 gap-7 mb-6'>
        {limitedList.slice(0, 3).map((movie) => (
          <div 
            key={movie.name} 
            onClick={() => handleMovieClick(movie, true)} // Set booking to true for first 3 movies
          >
            <Card 
              title={movie.name} 
              director={movie.director} 
              actor={movie.actor}
              img={movie.image}  // Directly use the URL
            />
          </div>
        ))}
      </div>

      {/* Upcoming Movies heading and display */}
      <h2 className='text-2xl font-bold mb-4 text-white'>Upcoming Movies</h2>
      <div className='grid grid-cols-3 gap-7'>
        {limitedList.slice(3).map((movie) => (
          <div 
            key={movie.name} 
            onClick={() => handleMovieClick(movie)}
          >
            <Card 
              title={movie.name} 
              director={movie.director} 
              actor={movie.actor}
              img={movie.image}  // Directly use the URL
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesCard;

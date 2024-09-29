import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import list from './movielist.json';
import Card from './Card';

const Searched = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get search query from the URL
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('query')?.toLowerCase() || '';

  // Filter movies that match the search query
  const filteredMovies = list.filter(movie =>
    movie.name.toLowerCase().includes(searchQuery)
  );

  const handleMovieClick = (movie, booking = false) => {
    navigate('/movie-detail', { state: { movie, booking } });
  };

  return (
    <div className='ml-[15px]'>
      <h2 className='text-2xl font-bold mb-4 text-white'>
        Search Results for: "{searchQuery}"
      </h2>
      {filteredMovies.length > 0 ? (
        <div className='grid grid-cols-3 gap-7'>
          {filteredMovies.map((movie) => (
            <div key={movie.name} onClick={() => handleMovieClick(movie)}>
              <Card 
                title={movie.name} 
                director={movie.director} 
                actor={movie.actor} 
                img={movie.image} 
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white">No movies found matching your search.</p>
      )}
    </div>
  );
};

export default Searched;

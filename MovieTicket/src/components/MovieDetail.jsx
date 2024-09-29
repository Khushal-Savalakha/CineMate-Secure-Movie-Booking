import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const MovieDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { movie } = location.state || {}; // Get movie details from location state

  if (!movie) {
    return <p className="text-white">No movie selected. Please go back to the movie list.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Movie Background Image */}
        <div className="relative">
          <img src={movie.backgroundImage} alt={movie.name} className="w-full h-64 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black opacity-75"></div>
          <div className="absolute bottom-4 left-4">
            <img src={movie.image} alt={movie.name} className="w-32 h-48 object-cover rounded-md shadow-lg" />
          </div>
        </div>

        {/* Movie Details Section */}
        <div className="p-6">
          <h2 className="text-4xl font-bold">{movie.name}</h2>
          <div className="flex items-center space-x-2 mt-2">
            <img src={movie.ratingImage} alt="Rating" className="w-6 h-6" />
            <span className="text-xl">{movie.rating}</span>
          </div>
          <p className="mt-4 text-gray-400">{movie.categories}</p>
          <p className="mt-4">{movie.description}</p>

          {/* Director Section */}
          <div className="mt-6">
            <h3 className="text-2xl font-semibold">Director</h3>
            <div className="flex items-center mt-2">
              <img src={movie.crew[0].image} alt={movie.crew[0].name} className="w-12 h-12 object-cover rounded-full mr-3" />
              <p>{movie.director}</p>
            </div>
          </div>

          {/* Cast Section */}
          <div className="mt-6">
            <h3 className="text-2xl font-semibold">Cast</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {movie.cast.map((actor, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <img src={actor.image} alt={actor.name} className="w-12 h-12 object-cover rounded-full" />
                  <p>{actor.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Crew Section */}
          <div className="mt-6">
            <h3 className="text-2xl font-semibold">Crew</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {movie.crew.map((crewMember, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <img src={crewMember.image} alt={crewMember.name} className="w-12 h-12 object-cover rounded-full" />
                  <p>{crewMember.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Book Tickets Button */}
          <div className="mt-6 text-center">
            <button
              className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onClick={() => navigate('/booking', { state: { movieName: movie.name } })}
            >
              Book Tickets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;

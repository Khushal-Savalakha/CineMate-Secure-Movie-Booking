import React from 'react';

const Card = (props) => {
  return (
    <div className="card bg-base-100 mt-10 w-80 md:w-96 lg:w-100 shadow-xl hover:cursor-pointer">
      <figure className="relative w-full h-72 overflow-hidden">
        <img 
          src={props.img} 
          alt={props.title} 
          className="w-full object-contain rounded-t-3xl" 
        />
      </figure>
      <div className="card-body items-center text-center bg-gray-200 p-4 rounded-b-3xl">
        <h2 className="card-title text-2xl mb-2">{props.title}</h2>
        <p className="text-lg">
          <span className="text-red-600">Director: </span>{props.director}
        </p>
        <h1 className="text-md mt-2">{props.actor}</h1>
      </div>
    </div>
  );
};

export default Card;

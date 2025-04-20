import React, { useContext, useEffect, useState } from 'react';
import { FlightContext } from './FlightContext';

function FlightCard ({ flight }) {
  const { interestedFlights, setInterestedFlights, bookedFlights, setBookedFlights } = useContext(FlightContext);
  const [isLiked, setIsLiked] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    const liked = interestedFlights.some(f => f.id === flight.id);
    setIsLiked(liked);
  }, [interestedFlights, flight.id]);

  useEffect(() => {
    const booked = bookedFlights.some(f => f.id === flight.id);
    setIsBooked(booked);
  }, [bookedFlights, flight.id]);

  const handleLike = () => {
    if (isLiked) {
      setInterestedFlights(interestedFlights.filter(f => f.id !== flight.id));
    } else {
      setInterestedFlights([...interestedFlights, flight]);
    }
    setIsLiked(!isLiked);
  };

  const handleBook = () => {
    if (!isBooked) {
      setBookedFlights([...bookedFlights, flight]);
      setIsBooked(true);
    }
  };

  const formatDateTime = (datetime) => {
    return datetime.replace('T', ' ');
  };

  return (
    <div className="border p-4 rounded-3xl shadow bg-white hover:shadow-lg transition text-blue-500">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl text-blue-500 font-bold">{flight.origin} → {flight.destination}</h3>
        <p className="text-lg text-blue-500 font-semibold">₹{flight.price}</p>
      </div>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-sm text-blue-500 font-semibold">Departure</p>
          <p>{formatDateTime(flight.departureTime)}</p>
        </div>
        <div>
          <p className="text-sm text-blue-500 font-semibold">Arrival</p>
          <p>{formatDateTime(flight.arrivalTime)}</p>
        </div>
        <div>
          <p className="text-sm text-blue-500 font-semibold">Duration</p>
          <p>{flight.duration}</p>
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <button onClick={handleLike} className={`text-2xl ${isLiked ? 'text-red-500' : 'text-blue-300'}`}>
          {isLiked ? '♥' : '♡'}
        </button>
        <button
          onClick={handleBook}
          className={`px-4 py-2 rounded text-white ${isBooked ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
          disabled={isBooked}
        >
          {isBooked ? 'Booked' : 'Book Now'}
        </button>
      </div>
    </div>
  );
};

export default FlightCard;

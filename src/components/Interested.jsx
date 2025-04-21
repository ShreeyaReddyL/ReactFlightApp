import React, { useContext, useEffect, useState } from 'react';
import { FlightContext } from './FlightContext';
import FlightCard from './FlightCard';

function Interested () {
  const { interestedFlights, setInterestedFlights } = useContext(FlightContext);
  const [localInterestedFlights, setLocalInterestedFlights] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('interestedFlights');
    if (stored) {
      const parsedFlights = JSON.parse(stored);
      setLocalInterestedFlights(parsedFlights);  
      setInterestedFlights(parsedFlights);  
    }
  }, [setInterestedFlights]);

  useEffect(() => {
    if (interestedFlights.length > 0) {
      localStorage.setItem('interestedFlights', JSON.stringify(interestedFlights));
    } else {
      localStorage.removeItem('interestedFlights');  
    }
  }, [interestedFlights]);

  const handleUnlike = (flightId) => {
    const updatedFlights = interestedFlights.filter(flight => flight.id !== flightId);
    setInterestedFlights(updatedFlights);      localStorage.setItem('interestedFlights', JSON.stringify(updatedFlights));
  };

  const flightsToShow = interestedFlights.length > 0 ? interestedFlights : localInterestedFlights;

  return (
    <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-yellow-600 mb-8">
          Interested Flights
        </h2>
        {flightsToShow.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            You haven't added any flights to your interested list yet. Start exploring and add flights you like!
          </p>
        ) : (
          <div className="flex flex-wrap justify-center gap-6">
            {flightsToShow.map((flight) => (
              <div key={flight.id} className="w-8/10 md:w-8/12 lg:w-6/12 xl:w-5/12">
                <FlightCard flight={flight} onUnlike={handleUnlike} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Interested;

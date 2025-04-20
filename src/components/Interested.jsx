import React, { useContext } from 'react';
import { FlightContext } from './FlightContext';
import FlightCard from './FlightCard';

const Interested = () => {
  const { interestedFlights } = useContext(FlightContext);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-xl md:text-2xl font-bold mb-4">Interested Flights</h2>
      {interestedFlights.length === 0 ? (
        <p className="text-gray-500">No flights in your interested list yet.</p>
      ) : (
        <div className="space-y-4 max-w-3xl mx-auto">
          {interestedFlights.map((flight) => (
            <FlightCard key={flight.id} flight={flight} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Interested;

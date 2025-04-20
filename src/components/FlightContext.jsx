import React, { createContext, useState } from 'react';

export const FlightContext = createContext();

export const FlightProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [interestedFlights, setInterestedFlights] = useState([]);
  const [bookedFlights, setBookedFlights] = useState([]);

  return (
    <FlightContext.Provider
      value={{
        results,
        setResults,
        interestedFlights,
        setInterestedFlights,
        bookedFlights,
        setBookedFlights,
      }}
    >
      {children}
    </FlightContext.Provider>
  );
};

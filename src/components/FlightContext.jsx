import React, { createContext, useState, useEffect } from 'react';

export const FlightContext = createContext();

export const FlightProvider = ({ children }) => {
  const [results, setResults] = useState([]);

  const [interestedFlights, setInterestedFlights] = useState(() => {
    const stored = localStorage.getItem('interestedFlights');
    return stored ? JSON.parse(stored) : [];
  });

  const [bookedFlights, setBookedFlights] = useState(() => {
    const stored = localStorage.getItem('bookedFlights');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('interestedFlights', JSON.stringify(interestedFlights));
  }, [interestedFlights]);

  useEffect(() => {
    localStorage.setItem('bookedFlights', JSON.stringify(bookedFlights));
  }, [bookedFlights]);

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

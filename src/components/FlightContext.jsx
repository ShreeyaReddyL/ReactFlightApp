import React, { createContext, useState, useEffect } from 'react';

export const FlightContext = createContext();

export const FlightProvider = ({ children }) => {
  const [results, setResults] = useState([]);

  // Load interestedFlights from localStorage
  const [interestedFlights, setInterestedFlights] = useState(() => {
    const stored = localStorage.getItem('interestedFlights');
    return stored ? JSON.parse(stored) : [];
  });

  // Load bookedFlights from localStorage
  const [bookedFlights, setBookedFlights] = useState(() => {
    const stored = localStorage.getItem('bookedFlights');
    return stored ? JSON.parse(stored) : [];
  });

  // Save interestedFlights to localStorage on change
  useEffect(() => {
    localStorage.setItem('interestedFlights', JSON.stringify(interestedFlights));
  }, [interestedFlights]);

  // Save bookedFlights to localStorage on change
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

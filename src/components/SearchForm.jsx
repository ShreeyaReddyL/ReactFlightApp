import React, { useState, useContext, useEffect } from 'react';
import { FlightContext } from './FlightContext';
import FlightCard from './FlightCard';

function SearchForm()  {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [tripType, setTripType] = useState('oneway');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const { setResults } = useContext(FlightContext);

  useEffect(() => {
    const storedResults = localStorage.getItem('flightSearchResults');
    if (storedResults) {
      const parsedResults = JSON.parse(storedResults);
      setSearchResults(parsedResults);
      setResults(parsedResults);
      setHasSearched(true);
    }
  }, [setResults]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    setHasSearched(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockData = [
        {
          id: 'flight1',
          origin: from,
          destination: to,
          departureTime: `${departureDate}T09:00`,
          arrivalTime: `${departureDate}T11:00`,
          duration: '2h',
          price: 4500,
          airline: 'IndiGo',
        },
        {
          id: 'flight2',
          origin: from,
          destination: to,
          departureTime: `${departureDate}T14:00`,
          arrivalTime: `${departureDate}T16:30`,
          duration: '2h 30m',
          price: 5200,
          airline: 'Air India',
        },
      ];

      if (tripType === 'roundtrip') {
        mockData.push({
          id: 'return1',
          origin: to,
          destination: from,
          departureTime: `${returnDate} time:-12:00`,
          arrivalTime: `${returnDate} time:-14:00`,
          duration: '2h',
          price: 20500,
          airline: 'IndiGo',
        });
      }

      setSearchResults(mockData);
      setResults(mockData);
      localStorage.setItem('flightSearchResults', JSON.stringify(mockData));
    } catch (err) {
      console.error('Mock fetch error:', err);
      setError('Something went wrong while fetching flights.');
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto pb-16">
        {/* FORM */}
        <div className="w-[40%] mx-auto bg-white rounded-2xl shadow-2xl p-10">
          <form className="space-y-6" onSubmit={handleSearch}>
            <div className="flex justify-center space-x-8">
              <label className="flex items-center space-x-2 text-lg font-medium text-gray-700">
                <input
                  type="radio"
                  value="oneway"
                  checked={tripType === 'oneway'}
                  onChange={() => setTripType('oneway')}
                />
                <span>One Way</span>
              </label>
              <label className="flex items-center space-x-2 text-lg font-medium text-gray-700">
                <input
                  type="radio"
                  value="roundtrip"
                  checked={tripType === 'roundtrip'}
                  onChange={() => setTripType('roundtrip')}
                />
                <span>Round Trip</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">From</label>
              <input
                type="text"
                value={from}
                onChange={(e) => setFrom(e.target.value.toUpperCase())}
                placeholder="e.g. BLR"
                className="border border-gray-300 p-3 w-full rounded-xl text-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">To</label>
              <input
                type="text"
                value={to}
                onChange={(e) => setTo(e.target.value.toUpperCase())}
                placeholder="e.g. DEL"
                className="border border-gray-300 p-3 w-full rounded-xl text-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Departure Date</label>
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="border border-gray-300 p-3 w-full rounded-xl text-lg"
                required
              />
            </div>

            {tripType === 'roundtrip' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Return Date</label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  min={departureDate}
                  className="border border-gray-300 p-3 w-full rounded-xl text-lg"
                  required
                />
              </div>
            )}

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
              type="submit"
              className="w-full mt-4 bg-blue-500 text-white text-lg font-semibold py-3 rounded-xl hover:bg-blue-600 transition duration-200"
              disabled={isLoading}
            >
              {isLoading ? 'Searching...' : 'Search Flights'}
            </button>
          </form>
        </div>

        
        {hasSearched && (
          <div className="mt-16 px-4">
            {searchResults.length === 0 ? (
              <p className="text-gray-600 text-center text-lg">No flights found for your search criteria.</p>
            ) : (
              <div className="flex flex-wrap justify-center gap-8 mt-10">
                {searchResults.map((flight) => (
                  <div key={flight.id} className="w-8/10 md:w-[22%] py-4">
                    <div className="rounded-full shadow-lg p-4 bg-white hover:shadow-xl transition duration-300">
                      <FlightCard flight={flight} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchForm;
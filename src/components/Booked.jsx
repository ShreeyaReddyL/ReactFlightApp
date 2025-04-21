import React, { useContext, useState, useEffect } from 'react';
import { FlightContext } from './FlightContext';
import FlightCard from './FlightCard';
import { Star } from 'lucide-react';

function Booked () {
  const { bookedFlights, setBookedFlights } = useContext(FlightContext);
  const [showRating, setShowRating] = useState(false);
  const [selectedRating, setSelectedRating] = useState(null);
  const [thanksMessage, setThanksMessage] = useState(false);

  useEffect(() => {
    const storedFlights = localStorage.getItem('bookedFlights');
    if (storedFlights) {
      setBookedFlights(JSON.parse(storedFlights));
    }
  }, [setBookedFlights]);

  useEffect(() => {
    if (bookedFlights.length > 0) {
      localStorage.setItem('bookedFlights', JSON.stringify(bookedFlights));
    }
  }, [bookedFlights]);

  const handleDone = () => {
    setBookedFlights([]); 
    localStorage.removeItem('bookedFlights'); 
    setShowRating(true); 
  };

  const handleRating = (rating) => {
    setSelectedRating(rating);
    setThanksMessage(true); 
  };

  return (
    <div className="w-full flex justify-center bg-gradient-to-r from-green-50 to-green-100 py-6">
      <div className="w-4/5 max-w-4xl px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center text-green-700">
          Booked Flights
        </h2>

        {bookedFlights.length === 0 && !showRating ? (
          <p className="text-center text-gray-500 text-lg">
            You haven't booked any flights yet. Start exploring and book your next adventure!
          </p>
        ) : (
          <>
            {bookedFlights.length > 0 && (
              <>
                <div className="space-y-6 mb-6">
                  {bookedFlights.map((flight) => (
                    <FlightCard key={flight.id} flight={flight} />
                  ))}
                </div>
                <div className="text-center">
                  <button
                    onClick={handleDone}
                    className="bg-green-600 text-white px-6 py-2 rounded-xl text-lg hover:bg-green-700 transition"
                  >
                    Deplaned
                  </button>
                </div>
              </>
            )}

            {showRating && (
              <div className="text-center mt-10">
                {!thanksMessage ? (
                  <>
                    <p className="text-lg font-medium text-green-800 mb-4">Rate your experience:</p>
                    <div className="flex justify-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          onClick={() => handleRating(star)}
                          className={`w-8 h-8 cursor-pointer ${
                            selectedRating && star <= selectedRating
                              ? 'text-yellow-500'
                              : 'text-gray-400'
                          }`}
                          fill={
                            selectedRating && star <= selectedRating
                              ? 'currentColor'
                              : 'none'
                          }
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="mt-6 text-xl font-semibold text-green-700">
                    Thanks for your feedback!
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Booked;
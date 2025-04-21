import { FlightProvider } from './components/FlightContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Interested from './components/Interested';
import Booked from './components/Booked';

function App() {
  return (
    <FlightProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-gray-50 to-gray-100">
          <Header />

          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/interested" element={<Interested />} />
              <Route path="/booked" element={<Booked />} />
            </Routes>
          </div>

          
          <footer className="bg-white-800 text-white py-4 text-center">

          </footer>
        </div>
      </BrowserRouter>
    </FlightProvider>
  );
}

export default App;
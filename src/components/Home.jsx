import React from 'react';
import SearchForm from './SearchForm';
import "tailwindcss";

function Home() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
 
      <div className="w-full px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-6 md:p-8">
          <SearchForm />
        </div>
      </div>
    </div>
  );
};

export default Home;

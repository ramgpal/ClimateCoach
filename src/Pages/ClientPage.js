import React from 'react';
import { useNavigate } from 'react-router-dom';

const ClientPage = () => {
  const navigate = useNavigate();

  const handleGetCoachedClick = () => {
    const matchingCoaches = localStorage.getItem('matchingCoaches');
    let coachIds = [];

    if (matchingCoaches) {
      try {
        coachIds = JSON.parse(matchingCoaches);
        console.log('Coach IDs:', coachIds); 
      } catch (error) {
        console.error("Error parsing matchingCoaches:", error);
      }
    }

    if (coachIds.length > 0) {
      navigate('/matchedCoaches', { state: { coachIds } });
    } else {
      console.error("No matched coaches found.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Thanks For Choosing Us</h1>
      <button onClick={handleGetCoachedClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg">
        Get Coached
      </button>
    </div>
  );
};

export default ClientPage;

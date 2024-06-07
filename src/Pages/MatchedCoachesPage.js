import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const MatchedCoachesPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const dummyPhotoUrl = ""; // Add a placeholder image URL if needed

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const fetchedCoaches = await Promise.all(
          state.coachIds.map(async (id) => {
            const response = await axios.get(`${process.env.REACT_APP_Base_URL}/users/getCoach/${id}`);
            return response.data.coach;
          })
        );
        setCoaches(fetchedCoaches);
      } catch (error) {
        console.error("Error fetching coaches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoaches();
  }, [state.coachIds]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleGetScheduled = () => {
    navigate('/availableSlots');
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Our Recommended Best Coaches</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {coaches.map((coach) => (
            <div key={coach._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <img className="rounded-full border-4 border-blue-500 mb-4 mx-auto" src={dummyPhotoUrl} alt="Coach" />
                <div className="text-center">
                  <h2 className="text-xl font-bold mb-2">{coach.name || 'Name not available'}</h2>
                  <p className="text-lg font-semibold">Experience:</p>
                  <p className="text-base mb-2">{coach.experience ? `${coach.experience} years` : 'Experience not available'}</p>
                  <p className="text-lg font-semibold">Expertise:</p>
                  <p className="text-base">{coach.expertise ? coach.expertise.join(', ') : 'Expertise not available'}</p>
                  <button 
                    onClick={handleGetScheduled} 
                    className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                  >
                    Get Scheduled
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchedCoachesPage;

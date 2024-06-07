import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AvailableSlotsPage = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const navigate = useNavigate();

  const slots = [
    { date: '11th July', time: '4-6pm' },
    { date: '7th August', time: '8-10am' },
    { date: '28th June', time: '8-10pm' }
  ];

  const handleSelectSlot = (slot) => {
    setSelectedSlot(slot);
  };

  const handleConfirmSlot = async () => {
    if (selectedSlot) {
      try {
        // Hardcoded client and coach email addresses
        const clientEmail = 'ramgpal912@gmail.com';
        const coachEmail = 'ramgp053@gmail.com';
        
        // Call the schedule API with the selected slot and hardcoded email addresses
        await axios.post('http://localhost:4000/api/v1/meetings/schedule', {
          ...selectedSlot,
          clientEmail,
          coachEmail
        });
        
        // Navigate to the meeting confirmation page
        navigate('/meetingConfirmation', { state: { slot: selectedSlot } });
      } catch (error) {
        console.error('Error scheduling meeting:', error);
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Available Slots</h2>
        <ul>
          {slots.map((slot, index) => (
            <li key={index} className={`mb-4 ${selectedSlot === slot ? 'bg-blue-200' : 'bg-blue-100'} p-4 rounded cursor-pointer`} onClick={() => handleSelectSlot(slot)}>
              <p className="font-semibold">{slot.date}</p>
              <p>{slot.time}</p>
            </li>
          ))}
        </ul>
        <button
          onClick={handleConfirmSlot}
          disabled={!selectedSlot}
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          Confirm Slot
        </button>
      </div>
    </div>
  );
};

export default AvailableSlotsPage;

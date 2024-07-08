import React from 'react';
import { useLocation } from 'react-router-dom';

const MeetingConfirmationPage = () => {
  const { state } = useLocation();
  const { slot } = state;

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Meeting Scheduled</h2>
        <p className="text-lg">You've scheduled a meeting on</p>
        <p className="text-xl font-semibold">{slot.date}</p>
        <p className="text-xl font-semibold">{slot.time}</p>
        <p className="text-lg mt-4">Meeting URL:</p>
        <p className="text-xl font-semibold">
          <a href="https://meet.google.com/chy-kicz-iwo" target="_blank" rel="noopener noreferrer">
            https://meet.google.com/chy-kicz-iwo
          </a>
        </p>
      </div>
    </div>
  );
};

export default MeetingConfirmationPage;

import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Homepage";
import LoginForm from "./components/LoginForm";
import ClientSignupForm from "./components/clientSignupForm";
import CoachSignupForm from "./components/coachSignupForm";
import ClientPage from "./Pages/ClientPage";
import MatchedCoachesPage from "./Pages/MatchedCoachesPage";
import AvailableSlotsPage from "./Pages/AvailableSlotsPage";
import MeetingConfirmationPage from "./Pages/MeetingConfirmationPage"; // Import the new page

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup/client" element={<ClientSignupForm />} />
      <Route path="/signup/coach" element={<CoachSignupForm />} />
      <Route path="/clientHome" element={<ClientPage />} />
      <Route path="/matchedCoaches" element={<MatchedCoachesPage />} />
      <Route path="/availableSlots" element={<AvailableSlotsPage />} />
      <Route path="/meetingConfirmation" element={<MeetingConfirmationPage />} /> {/* Add the route for the confirmation page */}
    </Routes>
  );
};

export default App;

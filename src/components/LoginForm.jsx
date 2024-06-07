import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('client'); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/v1/users/login', { email, password, userType });
      console.log(response.data);

      // Store matched coaches' IDs in local storage only if present
      if (userType === 'client' && response.data.matchingCoaches) {
        localStorage.setItem('matchingCoaches', JSON.stringify(response.data.matchingCoaches));
      }

      setIsLoggedIn(true);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/clientHome" />;
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <input className="w-full mb-4 px-4 py-2 border border-gray-300 rounded" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full mb-4 px-4 py-2 border border-gray-300 rounded" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userType">User Type</label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            id="userType"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="client">Client</option>
            <option value="coach">Coach</option>
          </select>
        </div>
        <button className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600" type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;

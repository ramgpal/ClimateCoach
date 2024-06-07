//clientSignupForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const ClientSignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    clientType: '',
    industry: [],
    challengeTheme: []
  });

  

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
  
    if (type === 'checkbox') {
      if (checked) {
        setFormData(prevState => ({
          ...prevState,
          [name]: [...prevState[name], value]
        }));
      } else {
        setFormData(prevState => ({
          ...prevState,
          [name]: prevState[name].filter(item => item !== value)
        }));
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Forming the data to be sent to the backend
      const dataToSend = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        typeOfUser: formData.clientType,
        industry: formData.industry,
        challengeTheme: formData.challengeTheme
      };
      console.log("Data to be sent to the backend:", dataToSend);
      // const response = await axios.post('http://localhost:4000/api/v1/users/clientSignup', dataToSend);
      const response = await axios.post(`${process.env.REACT_APP_Base_URL}/users/clientSignup`, dataToSend);
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Signup as Client</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" name="name" value={formData.name} onChange={handleChange} className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
        <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
        <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clientType">Client Type</label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            id="clientType"
            name="clientType"
            value={formData.clientType}
            onChange={handleChange}
          >
            <option value="Government">Government</option>
            <option value="Business">Business</option>
            <option value="NGO">NGO</option>
            <option value="Individual">Individual</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Industry</label>
          {industries.map(industry => (
            <div key={industry} className="mb-2">
              <label className="inline-flex items-center">
                <input type="checkbox" name="industry" value={industry} checked={formData.industry.includes(industry)} onChange={handleChange} className="form-checkbox" />
                <span className="ml-2">{industry}</span>
              </label>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Theme Challenge</label>
          {challengeThemes.map(theme => (
            <div key={theme} className="mb-2">
              <label className="inline-flex items-center">
                <input type="checkbox" name="challengeTheme" value={theme} checked={formData.challengeTheme.includes(theme)} onChange={handleChange} className="form-checkbox" />
                <span className="ml-2">{theme}</span>
              </label>
            </div>
          ))}
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:bg-blue-700">Submit</button>
      </form>
    </div>
  );
};

const industries = [
  "Agriculture",
  "Forestry",
  "Transportation",
  "Banking and Finance",
  "Biotechnology",
  "Information Technology",
];

const challengeThemes = [
  "Greenhouse Gas Mitigation",
  "Climate Finance",
  "Communications",
  "Governance",
  "Public Health",
  "Air Pollution"
];

export default ClientSignupForm;

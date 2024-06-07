import React, { useState } from 'react';
import axios from 'axios';

const CoachSignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    expertise: [],
    experience: '',
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
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/v1/users/coachSignup', formData);
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Signup as Coach</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" name="name" value={formData.name} onChange={handleChange} className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
        <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
        <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Expertise</label>
          {expertiseOptions.map(option => (
            <div key={option} className="mb-2">
              <label className="inline-flex items-center">
                <input type="checkbox" name="expertise" value={option} checked={formData.expertise.includes(option)} onChange={handleChange} className="form-checkbox" />
                <span className="ml-2">{option}</span>
              </label>
            </div>
          ))}
        </div>
        <input type="text" placeholder="Experience (Only Enter Numerical Value)" name="experience" value={formData.experience} onChange={handleChange} className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
        <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:bg-blue-700">Submit</button>
      </form>
    </div>
  );
};

const expertiseOptions = [
  "Greenhouse Gas Mitigation",
  "Climate Finance",
  "Communications",
  "Governance",
  "Public Health",
  "Air Pollution"
];

export default CoachSignupForm;

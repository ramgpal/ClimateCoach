const Client = require('../Models/Client');
const Coach = require('../Models/Coach');
const bcrypt = require('bcrypt');

exports.signupClient = async (req, res) => {
  try {
    const { name, email, password, typeOfUser, industry, challengeTheme } = req.body;
    const existingClient = await Client.findOne({ email });

    if (existingClient) {
      return res.status(400).send({ message: "Client already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const client = new Client({
      name,
      email,
      password: hashedPassword,
      typeOfUser,
      industry,
      challengeTheme
    });
    await client.save();
    res.status(201).send({ message: "Client registered successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};


exports.signupCoach = async (req, res) => {
  try {
    const { name, email, password, expertise, experience } = req.body;
    const existingCoach = await Coach.findOne({ email });

    if (existingCoach) {
      return res.status(400).send({ message: "Coach already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const coach = new Coach({
      name,
      email,
      password: hashedPassword,
      expertise,
      experience
    });
    await coach.save();
    res.status(201).send({ message: "Coach registered successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};


// Backend login controller
exports.login = async (req, res) => {
  try {
    const { email, password, userType } = req.body;
    if (userType === 'client') {
      // Handle login logic for client
      const client = await Client.findOne({ email });

      if (!client) {
        return res.status(404).json({ message: 'Client not found' });
      }

      // Retrieve client's challenge themes from the database
      const challengeThemes = client.challengeTheme;

      // Find coaches with expertise matching any of the client's challenge themes
      const matchingCoaches = await Coach.find({ expertise: { $in: challengeThemes } }, '_id');

      if (!matchingCoaches || matchingCoaches.length === 0) {
        return res.status(404).json({ message: 'No matching coaches found' });
      }

      // Extract coach IDs from matchingCoaches
      const coachIds = matchingCoaches.map(coach => coach._id);

      // Send the list of matching coach IDs as response
      return res.status(200).json({ message: 'Login successful', matchingCoaches: coachIds });
    } else if (userType === 'coach') {
      // Handle login logic for coach
      // Implement logic specific to coach login
      // For example, fetch coach's data and send it as response
      return res.status(200).json({ message: 'Coach login successful' });
    } else {
      return res.status(400).json({ message: 'Invalid userType' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};



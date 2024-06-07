// controller function to get Coach details by id
const Coach = require('../Models/Coach'); 

exports.getCoachDetails = async (req, res) => {
  try {
    const coachId = req.params.id; 
    const coach = await Coach.findById(coachId);

    if (!coach) {
      return res.status(404).json({ message: 'Coach not found' });
    }
    return res.status(200).json({ message: 'Coach details fetched successfully', coach });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

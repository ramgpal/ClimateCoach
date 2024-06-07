const express = require("express");
const app = express();
const cors = require('cors');
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const { connect } = require("./config/dbConnect");
connect();

const userRoutes = require("./routes/userRoutes");
const meetingRoutes = require("./routes/meetingRoutes"); // Import the meeting routes

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/meetings", meetingRoutes); // Use the meeting routes

// Root route
app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});

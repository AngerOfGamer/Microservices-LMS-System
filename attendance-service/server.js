const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// API Example
app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    const result = await user.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

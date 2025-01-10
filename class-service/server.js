const express = require('express');
const session = require("express-session");
const connectDB = require('./config/database');
const cors = require('cors');
const classRoutes = require("./routes/class");
const app = express();

app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true 
}));
app.use(express.json());
app.use(
    session({
      secret: "your-secret-key", 
      resave: false,
      saveUninitialized: true
    })
);
connectDB();

app.use("/class", classRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

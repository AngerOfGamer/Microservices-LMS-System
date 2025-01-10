const express = require('express');
const session = require("express-session");
const cors = require("cors");
const connectDB = require('./config/database');
const attendanceRoutes = require("./routes/attendance");
const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(express.json());
app.use(session({
  secret: "your-secret-key",
  resave: false,
  saveUninitialized: true,
}));

connectDB();

app.use("/attendance", attendanceRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

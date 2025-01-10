const express = require('express');
const connectDB = require('./config/database');
const submissionRoutes = require("./routes/submission");
const session = require("express-session");
const path = require('path');

const cors = require("cors");
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
  
app.use(express.json());
connectDB();

app.use("/submission", submissionRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); 

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
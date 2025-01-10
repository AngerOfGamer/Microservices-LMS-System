const express = require('express');
const connectDB = require('./config/database');
const notificationRoutes = require("./routes/notification");
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

app.use("/notification", notificationRoutes);

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
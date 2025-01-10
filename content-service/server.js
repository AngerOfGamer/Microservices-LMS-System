<<<<<<< HEAD
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const connectDB = require("./config/database");
const contentRoutes = require("./routes/content");
const app = express();
const path = require('path');

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

app.use("/content", contentRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
=======
const express = require('express');
const connectDB = require('./config/database');
const contentRoutes = require("./routes/content");
const app = express();

app.use(express.json());
connectDB();

app.use("/content", contentRoutes);
>>>>>>> d668b388ed32a1f2bead092f2e848edd78b12482

const PORT = process.env.PORT || 5006;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

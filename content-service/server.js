<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> eb94ad15042376d4eebd0dd04ed4ef0df0c5dbb1
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const connectDB = require("./config/database");
<<<<<<< HEAD
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
=======
>>>>>>> eb94ad15042376d4eebd0dd04ed4ef0df0c5dbb1
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
<<<<<<< HEAD
>>>>>>> d668b388ed32a1f2bead092f2e848edd78b12482
=======
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
>>>>>>> eb94ad15042376d4eebd0dd04ed4ef0df0c5dbb1

const PORT = process.env.PORT || 5006;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

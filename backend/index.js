const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config");

const absensiRoutes = require("./routes/absensi");
const authRoutes = require("./routes/auth");
const classRoutes = require("./routes/class");
const contentRoutes = require("./routes/content");
const userRoutes = require("./routes/user");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/absensi", absensiRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/class", classRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/users", userRoutes);

// Server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

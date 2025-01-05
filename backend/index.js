const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config");

const absensiRoutes = require("./routes/absensi");
const authRoutes = require("./routes/auth");
const classRoutes = require("./routes/class");
const contentRoutes = require("./routes/content");
const userRoutes = require("./routes/user");

const app = express();

// Middleware
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000", // URL frontend Anda
    credentials: true, // Izinkan pengiriman cookie
  })
);
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

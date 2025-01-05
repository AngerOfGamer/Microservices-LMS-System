const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const absensiRoutes = require("./routes/absensi");
const authRoutes = require("./routes/auth");
const classesRoutes = require("./routes/classes");
const contentRoutes = require("./routes/content");
const userRoutes = require("./routes/user");

const app = express();

// Middleware untuk session dan cookie
app.use(cookieParser());  // Untuk parsing cookie
app.use(
  session({
    secret: "yourSecretKey",  // Ganti dengan key rahasia yang kuat
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },  // Set to true if using https
  })
);

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
app.use("/api/classes", classesRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/users", userRoutes);

// Server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

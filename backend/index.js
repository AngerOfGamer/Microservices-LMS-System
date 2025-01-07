const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");


const attendanceRoutes = require("./routes/attendance");
const authRoutes = require("./routes/auth");
const classesRoutes = require("./routes/classes");
const contentRoutes = require("./routes/content");
const userRoutes = require("./routes/user");
const notificationsRoutes = require("./routes/notifications");
const submissionsRoutes = require("./routes/submissions")

const app = express(); 

// Middleware untuk session dan cookie
app.use(cookieParser());  
app.use(
  session({
    secret: "yourSecretKey",  
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },  
  })
);

// Middleware
const cors = require("cors");
const allowedOrigins = [process.env.FRONTEND_URL || "http://localhost:3000"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, 
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/attendance", attendanceRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/classes", classesRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/submissions", submissionsRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

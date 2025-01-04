require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

// Import routes
const userRoutes = require("./routes/user");
const classRoutes = require("./routes/class");
const classMemberRoutes = require("./routes/classMember");
const contentRoutes = require("./routes/content");
const nilaiRoutes = require("./routes/nilai");
const absensiRoutes = require("./routes/absensi");
const submissionRoutes = require("./routes/submission");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/class-members", classMemberRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/nilai", nilaiRoutes);
app.use("/api/absensi", absensiRoutes);
app.use("/api/submissions", submissionRoutes);

// Static files (e.g., uploaded files)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Server setup
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

app.listen(PORT, () => {
  console.log(`Server is running in ${NODE_ENV} mode on port ${PORT}`);
});

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const auth = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware untuk mengizinkan CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Ganti dengan URL frontend Anda
    credentials: true, // Untuk memungkinkan pengiriman cookie
  })
);

// Middleware untuk body parser
app.use(express.json());

// Middleware untuk session
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Sesuaikan dengan kebutuhan Anda
      httpOnly: true,
    },
  })
);

// Route
app.use("/auth", auth);

app.get("/", (req, res) => {
  res.send("LMS System API is running!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Terjadi kesalahan pada server." });
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(Server is running on http://localhost:${PORT});
});
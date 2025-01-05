const express = require("express");
const db = require("../db");
const session = require("express-session"); // Import express-session

const router = express.Router();

// Setup express-session
router.use(
  session({
    secret: "your_secret_key", // Ganti dengan key yang lebih kuat
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true }, // secure: true jika menggunakan HTTPS
  }),
);

// Login user
router.post("/login", (req, res) => {
  const { username, nip_nim } = req.body;

  if (!username || !nip_nim) {
    return res.status(400).json({ error: "Username and NIP/NIM are required" });
  }

  const sql = "SELECT * FROM users WHERE username = ? AND nip_nim = ?";
  db.query(sql, [username, nip_nim], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(401).json({ error: "Invalid credentials" });

    // Menyimpan informasi user dalam session
    req.session.user = results[0];

    // Mengirim response dengan data user dan pesan login sukses
    res.json({ message: "Login successful", user: results[0] });
  });
});

module.exports = router;

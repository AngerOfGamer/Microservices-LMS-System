const express = require("express");
const db = require("../db");

const router = express.Router();

// Login user
router.post("/login", (req, res) => {
  const { username, nip_nim } = req.body;

  if (!username || !nip_nim) {
    return res.status(400).json({ error: "Username and NIP/NIM are required" });
  }

  const sql = "SELECT * FROM users WHERE username = ? AND nip_nim = ?";
  db.query(sql, [username, nip_nim], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(401).json({ error: "Invalid credentials" });

    // Simpan informasi pengguna di session
    req.session.user = {
      user_id: results[0].user_id,
      username: results[0].username,
      role: results[0].role, // Simpan role di session
    };

    res.json({ message: "Login successful", user: req.session.user });
  });
});

// Logout user
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Failed to log out" });
    res.json({ message: "Logout successful" });
  });
});

module.exports = router;

const express = require("express");
const db = require("../db");

const router = express.Router();

// Login user
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

    // Mengembalikan informasi role pengguna
    res.json({
      message: "Login successful",
      user: {
        user_id: results[0].user_id,
        username: results[0].username,
        role: results[0].role, // Pastikan role dikembalikan
      },
    });
  });
});

module.exports = router;

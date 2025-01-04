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
    res.json({ message: "Login successful", user: results[0] });
  });
});

// Register user
router.post("/register", (req, res) => {
  const { username, nip_nim, role } = req.body;

  if (!username || !nip_nim || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = "INSERT INTO users (username, nip_nim, role) VALUES (?, ?, ?)";
  db.query(sql, [username, nip_nim, role], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "User registered successfully", user_id: result.insertId });
  });
});

module.exports = router;

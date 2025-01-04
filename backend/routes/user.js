const express = require("express");
const db = require("../db");

const router = express.Router();

// Get all users
router.get("/", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Add new user
router.post("/", (req, res) => {
  const { username, nip_nim, role } = req.body;
  const sql = "INSERT INTO users (username, nip_nim, role) VALUES (?, ?, ?)";
  db.query(sql, [username, nip_nim, role], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, username, nip_nim, role });
  });
});

module.exports = router;

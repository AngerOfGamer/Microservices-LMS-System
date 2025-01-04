const express = require("express");
const db = require("../db");

const router = express.Router();

// Get all absensi
router.get("/", (req, res) => {
  const sql = "SELECT * FROM absensi";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Add an absensi
router.post("/", (req, res) => {
  const { class_id, user_id, date, status } = req.body;
  const sql = "INSERT INTO absensi (class_id, user_id, date, status) VALUES (?, ?, ?, ?)";
  db.query(sql, [class_id, user_id, date, status], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, class_id, user_id, date, status });
  });
});

module.exports = router;

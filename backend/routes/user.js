const express = require("express");
const db = require("../db");

const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, results) => {
      if (err) {
        console.error("Error fetching users:", err.message);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.json(results);
    });
  } catch (error) {
    console.error("Unexpected error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add new user
router.post("/", async (req, res) => {
  const { username, nip_nim, role } = req.body;

  // Validation
  if (!username || !nip_nim || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const sql = "INSERT INTO users (username, nip_nim, role) VALUES (?, ?, ?)";
    db.query(sql, [username, nip_nim, role], (err, result) => {
      if (err) {
        console.error("Error adding user:", err.message);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.status(201).json({
        message: "User added successfully",
        user: { id: result.insertId, username, nip_nim, role },
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

const express = require("express");
const session = require("express-session");
const db = require("../db");

const router = express.Router();

// Login endpoint
router.post("/login", (req, res) => {
  const { username, nip_nim } = req.body;

  // Validasi input
  if (!username || !nip_nim) {
    return res
      .status(400)
      .json({ message: "Username dan NIP/NIM harus diisi" });
  }

  // Query untuk mencari user di database
  const sql = "SELECT * FROM users WHERE username = ? AND nip_nim = ?";
  db.query(sql, [username, nip_nim], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ message: "Terjadi kesalahan pada server." });
    }

    if (results.length > 0) {
      // User ditemukan
      const user = results[0];

      // Simpan data user di session
      req.session.user = {
        user_id: user.user_id,
        username: user.username,
        role: user.role,
      };

      res.json({
        message: "Login berhasil",
        user: req.session.user,
      });
    } else {
      res.status(401).json({ message: "Username atau NIP/NIM salah." });
    }
  });
});

// Logout endpoint
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Gagal logout" });
    }
    res.json({ message: "Logout berhasil" });
  });
});

module.exports = router;

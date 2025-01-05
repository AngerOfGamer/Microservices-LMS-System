const express = require("express");
const db = require("../db");
const router = express.Router();

// Middleware untuk memeriksa apakah pengguna sudah login
const isLoggedIn = (req, res, next) => {
  if (req.session.user) {
    return next(); // Pengguna sudah login, lanjutkan request
  } else {
    return res.status(401).json({ error: "You must be logged in" }); // Pengguna belum login
  }
};

// Endpoint untuk mengambil kelas yang diikuti oleh pengguna
router.get("/user-classes", isLoggedIn, (req, res) => {
  const userId = req.session.user.user_id; // Ambil user_id dari session

  // Query untuk mendapatkan kelas yang diikuti oleh pengguna
  const sql = `
    SELECT c.class_id, c.class_name, c.description
    FROM classes c
    JOIN class_members cm ON c.class_id = cm.class_id
    WHERE cm.user_id = ?;
  `;
  
  db.query(sql, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Terjadi kesalahan pada server." });
    }
    res.json(results); // Mengembalikan kelas yang diikuti oleh pengguna
  });
});

module.exports = router;

const express = require("express");
const db = require("../db"); // Pastikan path ke database sudah benar
const router = express.Router();

// Middleware untuk memeriksa apakah pengguna sudah login
const isLoggedIn = (req, res, next) => {
  if (req.session.user) {
    return next(); // Pengguna sudah login, lanjutkan request
  } else {
    return res.status(401).json({ error: "You must be logged in" }); // Pengguna belum login
  }
};

// Route untuk mengambil data kelas berdasarkan classId
router.get("/class/:classId", isLoggedIn, (req, res) => {
  const { classId } = req.params; // Ambil classId dari URL params

  // Query untuk mengambil kelas berdasarkan ID
  const sql = "SELECT * FROM classes WHERE class_id = ?";
  
  db.query(sql, [classId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Server error" }); // Error server
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Class not found" }); // Kelas tidak ditemukan
    }
    res.json(results[0]); // Kembalikan data kelas yang ditemukan
  });
});

module.exports = router;

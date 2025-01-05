const express = require("express");
const db = require("../db");

const router = express.Router();

// Endpoint untuk mendapatkan kelas berdasarkan role
router.get("/", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Anda belum login" });
  }

  const { role, user_id } = req.session.user;

  let sql;
  let params;

  if (role === "admin") {
    // Admin: Lihat semua kelas
    sql = "SELECT * FROM classes";
    params = [];
  } else if (role === "dosen" || role === "mahasiswa") {
    // Dosen/Mahasiswa: Lihat kelas yang diikuti
    sql = `
      SELECT c.class_id, c.class_name, c.description
      FROM class_members cm
      JOIN classes c ON cm.class_id = c.class_id
      WHERE cm.user_id = ?`;
    params = [user_id];
  } else {
    return res.status(403).json({ message: "Akses ditolak" });
  }

  // Eksekusi query
  db.query(sql, params, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Kesalahan server" });
    }

    // Jika tidak ada kelas ditemukan
    if (results.length === 0) {
      return res.json({ classes: [], message: "Tidak ada kelas ditemukan" });
    }

    res.json({ classes: results });
  });
});

module.exports = router;

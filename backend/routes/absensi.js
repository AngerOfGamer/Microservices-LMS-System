const express = require("express");
const router = express.Router();
const db = require("../db"); 

// Middleware untuk role authorization
const authorizeRoles = (roles) => (req, res, next) => {
  const userRole = req.session.user?.role; 
  if (roles.includes(userRole)) {
    next();
  } else {
    res.status(403).json({ message: "Anda tidak memiliki akses ke fitur ini." });
  }
};

// Endpoint untuk membuat absensi (hanya untuk Admin dan Dosen)
router.post("/create", authorizeRoles(["admin", "dosen"]), (req, res) => {
  const { date, attendance } = req.body; 
  if (!date || !attendance || attendance.length === 0) {
    return res.status(400).json({ message: "Data tidak lengkap." });
  }

  const sql = "INSERT INTO attendance (date, student_id, status) VALUES ?";
  const values = attendance.map((a) => [date, a.studentId, a.status]);

  db.query(sql, [values], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Terjadi kesalahan pada server." });
    }
    res.json({ message: "Absensi berhasil dibuat." });
  });
});

// Endpoint untuk melihat semua record absensi (Admin dan Dosen)
router.get("/records", authorizeRoles(["admin", "dosen"]), (req, res) => {
  const sql = `
    SELECT a.date, s.name AS studentName, a.status
    FROM attendance a
    JOIN students s ON a.student_id = s.id
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Terjadi kesalahan pada server." });
    }
    res.json(results);
  });
});

// Endpoint untuk mahasiswa melihat absensi
router.get("/records/student", authorizeRoles(["mahasiswa"]), (req, res) => {
  const studentId = req.session.user?.user_id; 
  const sql = `
    SELECT a.date, s.name AS studentName, a.status
    FROM attendance a
    JOIN students s ON a.student_id = s.id
    WHERE a.student_id = ?
  `;

  db.query(sql, [studentId], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Terjadi kesalahan pada server." });
    }
    res.json(results);
  });
});

module.exports = router;

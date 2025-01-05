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
  const { date, classId, attendance } = req.body;
  if (!date || !classId || !attendance || attendance.length === 0) {
    return res.status(400).json({ message: "Data tidak lengkap." });
  }

  const sql = "INSERT INTO absensi (class_id, user_id, date, status) VALUES ?";
  const values = attendance.map((a) => [classId, a.userId, date, a.status]);

  db.query(sql, [values], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Terjadi kesalahan pada server." });
    }
    res.json({ message: "Absensi berhasil dibuat.", result });
  });
});

// Endpoint untuk melihat semua record absensi (Admin dan Dosen)
router.get("/records", authorizeRoles(["admin", "dosen"]), (req, res) => {
  const sql = `
    SELECT a.date, c.class_name, u.name AS studentName, a.status
    FROM absensi a
    JOIN users u ON a.user_id = u.user_id
    JOIN classes c ON a.class_id = c.class_id
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Terjadi kesalahan pada server." });
    }
    res.json(results);
  });
});

// Endpoint untuk mahasiswa melihat absensi mereka sendiri
router.get("/records/student", authorizeRoles(["mahasiswa"]), (req, res) => {
  const studentId = req.session.user?.user_id;
  if (!studentId) {
    return res.status(400).json({ message: "User tidak ditemukan." });
  }

  const sql = `
    SELECT a.date, c.class_name, a.status
    FROM absensi a
    JOIN classes c ON a.class_id = c.class_id
    WHERE a.user_id = ?
  `;

  db.query(sql, [studentId], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Terjadi kesalahan pada server." });
    }
    res.json(results);
  });
});

// Endpoint untuk memperbarui status absensi (hanya untuk Admin dan Dosen)
router.put("/update/:absensiId", authorizeRoles(["admin", "dosen"]), (req, res) => {
  const { absensiId } = req.params;
  const { status } = req.body;

  if (!status || !["hadir", "tidak hadir"].includes(status)) {
    return res.status(400).json({ message: "Status tidak valid." });
  }

  const sql = "UPDATE absensi SET status = ? WHERE absensi_id = ?";
  db.query(sql, [status, absensiId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Terjadi kesalahan pada server." });
    }
    res.json({ message: "Status absensi berhasil diperbarui.", result });
  });
});

module.exports = router;

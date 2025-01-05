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

    res.json({ classes: results });
  });
});

// Endpoint untuk membuat kelas baru
router.post("/", (req, res) => {
  const { class_name, description, selectedUsers } = req.body;

  if (!class_name || !selectedUsers || selectedUsers.length === 0) {
    return res.status(400).json({ message: "Nama kelas dan anggota wajib diisi" });
  }

  // Insert kelas baru
  const sqlInsertClass = "INSERT INTO classes (class_name, description, created_at) VALUES (?, ?, NOW())";
  db.query(sqlInsertClass, [class_name, description], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Kesalahan server saat membuat kelas" });
    }

    const classId = results.insertId;

    // Insert anggota kelas ke tabel class_members
    const classMembers = selectedUsers.map((user) => [user.user_id, classId, user.role, new Date()]);
    const sqlInsertMembers = "INSERT INTO class_members (user_id, class_id, role, joined_at) VALUES ?";
    db.query(sqlInsertMembers, [classMembers], (err) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Kesalahan server saat menambahkan anggota kelas" });
      }

      res.status(201).json({ message: "Kelas berhasil dibuat beserta anggota" });
    });
  });
});

router.get("/:class_id", (req, res) => {
  const { class_id } = req.params;

  console.log("Menerima permintaan untuk class_id:", class_id);

  const sqlClass = `
    SELECT * FROM classes WHERE class_id = ?;
  `;
  const sqlMembers = `
    SELECT u.user_id, u.username, cm.role
    FROM class_members cm
    JOIN users u ON cm.user_id = u.user_id
    WHERE cm.class_id = ?;
  `;

  db.query(sqlClass, [class_id], (err, classResults) => {
    if (err || classResults.length === 0) {
      console.error("Kesalahan query kelas:", err);
      return res.status(404).json({ message: "Kelas tidak ditemukan" });
    }

    db.query(sqlMembers, [class_id], (err, memberResults) => {
      if (err) {
        console.error("Kesalahan query anggota kelas:", err);
        return res.status(500).json({ message: "Kesalahan server saat memuat anggota kelas" });
      }

      res.json({
        class: {
          ...classResults[0],
          members: memberResults,
        },
      });
    });
  });
});


module.exports = router;

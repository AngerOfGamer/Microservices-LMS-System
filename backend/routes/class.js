const express = require("express");
const db = require("../db");

const router = express.Router();

// Middleware untuk role authorization
const authorizeRoles = (roles) => (req, res, next) => {
  const userRole = req.session.user?.role; // Ambil role dari session
  if (!userRole) {
    return res.status(401).json({ message: "You must be logged in to access this resource." });
  }
  if (roles.includes(userRole)) {
    next();
  } else {
    res.status(403).json({ message: "You do not have access to this feature." });
  }
};

// Endpoint untuk mendapatkan semua kelas
router.get("/", (req, res) => {
  const sql = "SELECT * FROM classes";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Database error:", err.message);
      return res.status(500).json({ message: "Terjadi kesalahan pada server." });
    }
    res.json(results); // Mengirimkan data kelas ke frontend
  });
});

// Endpoint untuk menambahkan kelas (hanya bisa diakses oleh Admin)
router.post("/", authorizeRoles(["admin"]), (req, res) => {
  const { class_name, description } = req.body;

  // Validasi input
  if (!class_name || !description) {
    return res.status(400).json({ message: "Class name and description are required." });
  }

  const sql = "INSERT INTO classes (class_name, description) VALUES (?, ?)";
  db.query(sql, [class_name, description], (err, result) => {
    if (err) {
      console.error("Database error:", err.message);
      return res.status(500).json({ message: "There was a problem creating the class." });
    }
    res.status(201).json({ message: "Class successfully created.", class_id: result.insertId });
  });
});

// Endpoint untuk menambahkan anggota kelas (dosen dan mahasiswa) ke kelas tertentu (akses Admin)
router.post("/:class_id/participants", authorizeRoles(["admin"]), (req, res) => {
  const { class_id } = req.params;
  const { user_id, role } = req.body; // role bisa "dosen" atau "mahasiswa"

  // Validasi input
  if (!user_id || !role || !["dosen", "mahasiswa"].includes(role)) {
    return res.status(400).json({ message: "Valid user_id and role (dosen/mahasiswa) are required." });
  }

  // Insert anggota ke dalam kelas
  const sql = "INSERT INTO class_members (class_id, user_id, role) VALUES (?, ?, ?)";
  db.query(sql, [class_id, user_id, role], (err, result) => {
    if (err) {
      console.error("Database error:", err.message);
      return res.status(500).json({ message: "There was an issue adding the participant." });
    }
    res.status(201).json({ message: "User successfully added to the class." });
  });
});

// Endpoint untuk mengambil anggota kelas berdasarkan class_id (akses untuk Admin, Dosen)
router.get("/:class_id/participants", authorizeRoles(["admin", "dosen"]), (req, res) => {
  const { class_id } = req.params;

  const sql = `
    SELECT users.username, users.nip_nim, class_members.role 
    FROM class_members 
    JOIN users ON class_members.user_id = users.user_id 
    WHERE class_members.class_id = ?`;

  db.query(sql, [class_id], (err, results) => {
    if (err) {
      console.error("Database error:", err.message);
      return res.status(500).json({ message: "There was a problem fetching participants." });
    }
    res.json(results); // Mengirimkan data anggota kelas ke frontend
  });
});

module.exports = router;

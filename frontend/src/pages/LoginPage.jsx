import express from "express";
import mysql from "mysql2";

const router = express.Router();

// Koneksi ke database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "your_database_name",
});

// Cek koneksi database
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to database.");
});

// Login endpoint
router.post("/login", (req, res) => {
  const { username, nip_nim } = req.body;

  // Validasi input
  if (!username || !nip_nim) {
    return res
      .status(400)
      .json({ message: "Username dan NIP/NIM harus diisi" });
  }

  // Cari user di database
  const query = "SELECT * FROM users WHERE username = ? AND nip_nim = ?";
  db.query(query, [username, nip_nim], (err, results) => {
    if (err) {
      console.error("Error saat query database:", err);
      return res
        .status(500)
        .json({ message: "Terjadi kesalahan pada server." });
    }

    if (results.length > 0) {
      // User ditemukan
      const user = results[0];
      res.json({
        message: "Login berhasil",
        user: {
          user_id: user.user_id,
          username: user.username,
          role: user.role,
        },
      });
    } else {
      // User tidak ditemukan
      res.status(401).json({ message: "Username atau NIP/NIM salah." });
    }
  });
});

export default router;

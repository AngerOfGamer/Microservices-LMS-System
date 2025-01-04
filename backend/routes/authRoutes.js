import express from "express";
import bcrypt from "bcrypt"; // Jika Anda ingin menggunakan password terenkripsi
import { User } from "../models/user.js"; // Import model User
import session from "express-session";

const router = express.Router();

// Middleware untuk session (gunakan di server.js jika diperlukan)
router.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true jika menggunakan HTTPS
  }),
);

// Login endpoint
router.post("/login", async (req, res) => {
  const { username, nip_nim } = req.body;

  // Validasi input
  if (!username || !nip_nim) {
    return res
      .status(400)
      .json({ message: "Username dan NIP/NIM harus diisi" });
  }

  try {
    // Cari user di database
    const user = await User.findOne({ where: { username, nip_nim } });

    if (!user) {
      return res.status(401).json({ message: "Username atau NIP/NIM salah" });
    }

    // Simpan data user di session
    req.session.user = {
      user_id: user.user_id,
      username: user.username,
      role: user.role,
    };

    res.json({
      message: "Login berhasil",
      user: req.session.user, // Kirim data user ke client
    });
  } catch (err) {
    console.error("Error saat login:", err);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
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

export default router;

const express = require("express");
const User = require("../models/user");

const router = express.Router();

// Middleware untuk validasi header
const authenticate = async (req, res, next) => {
  const { username, role } = req.headers;

  if (!username || !role) {
    return res.status(401).json({ error: "Unauthorized: Missing username or role in headers" });
  }

  try {
    const user = await User.findOne({ username, role });
    if (!user) {
      return res.status(401).json({ error: "Unauthorized: Invalid username or role" });
    }
    req.user = { username, role };
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all users
router.get("/", authenticate, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Unexpected error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add new user
router.post("/", authenticate, async (req, res) => {
  const { username, nip_nim, role } = req.body;

  if (!username || !nip_nim || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ nip_nim });
    if (existingUser) {
      return res.status(409).json({ error: "User with this NIP/NIM already exists" });
    }

    const newUser = new User({
      username,
      nip_nim,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    console.error("Unexpected error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/roles", async (req, res) => {
  try {
    const users = await User.find({ role: { $in: ["dosen", "mahasiswa"] } }).select("username role");
    res.json({ users });
  } catch (error) {
    console.error("Error fetching roles:", error);
    res.status(500).json({ message: "Kesalahan server." });
  }
});

module.exports = router;

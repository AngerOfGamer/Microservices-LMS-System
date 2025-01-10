const express = require("express");
const mongoose = require("mongoose");
const Class = require("../models/class");
const ClassMember = require("../models/classMember");
const User = require("../models/user");

const router = express.Router();

// Middleware autentikasi
const authenticate = async (req, res, next) => {
  const { username, role } = req.headers;

  if (!username || !role) {
    console.error("Authentication failed: Missing username or role");
    return res.status(401).json({ error: "Unauthorized: Missing username or role in headers" });
  }

  try {
    const user = await User.findOne({ username, role });
    if (!user) {
      console.error(`Authentication failed: Invalid user (${username}, ${role})`);
      return res.status(401).json({ error: "Unauthorized: Invalid username or role" });
    }
    req.user = { username, role, _id: user._id }; // Tambahkan _id untuk referensi
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Endpoint untuk mendapatkan daftar kelas
router.get("/", authenticate, async (req, res) => {
  try {
    let classes;

    console.log("Request user:", req.user); // Logging untuk melihat data user

    if (req.user.role === "admin") {
      // Admin dapat melihat semua kelas
      classes = await Class.find();
    } else {
      // Cari user berdasarkan username
      const user = await User.findOne({ username: req.user.username });

      if (!user) {
        console.error("User not found");
        return res.status(404).json({ error: "User not found" });
      }

      // Cari kelas yang diikuti oleh mahasiswa/dosen
      const classIds = await ClassMember.find({ user_id: user._id }).select("class_id");
      console.log("Class IDs:", classIds);

      classes = await Class.find({ _id: { $in: classIds.map((member) => member.class_id) } });
    }

    res.json(classes);
  } catch (error) {
    console.error("Error fetching classes:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint untuk menambahkan anggota ke kelas
router.post("/:class_id/members", authenticate, async (req, res) => {
  const { class_id } = req.params;
  const { members } = req.body;

  if (!members || members.length === 0) {
    return res.status(400).json({ error: "Members are required" });
  }

  try {
    const classData = await Class.findById(class_id);
    if (!classData) {
      return res.status(404).json({ error: "Class not found" });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Forbidden: Only admins can add members" });
    }

    const newMembers = members.map((member) => ({
      class_id,
      user_id: mongoose.Types.ObjectId(member.user_id), // Pastikan ObjectId
      role: member.role,
    }));

    await ClassMember.insertMany(newMembers);

    res.status(201).json({ message: "Members added successfully" });
  } catch (error) {
    console.error("Error adding members:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint untuk mendapatkan detail kelas
router.get("/:class_id", authenticate, async (req, res) => {
  const { class_id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(class_id)) {
      return res.status(400).json({ error: "Invalid class ID" });
    }

    const classData = await Class.findById(class_id);
    if (!classData) {
      return res.status(404).json({ error: "Class not found" });
    }

    const members = await ClassMember.find({ class_id })
      .populate("user_id", "username role");

    res.json({ class: classData, members });
  } catch (error) {
    console.error("Error fetching class details:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

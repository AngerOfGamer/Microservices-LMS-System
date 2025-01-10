const express = require("express");
const User = require("../models/user");

const router = express.Router();

// Login endpoint
router.post("/login", async (req, res) => {
  const { username, nip_nim } = req.body;

  if (!username || !nip_nim) {
    return res.status(400).json({ error: "Username and NIP/NIM are required" });
  }

  try {
    const user = await User.findOne({ username, nip_nim });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Simpan informasi user di session
    req.session.user = {
      username: user.username,
      role: user.role,
    };

    res.json({ message: "Login successful", user: req.session.user });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ error: "Error logging in" });
  }
});

module.exports = router;

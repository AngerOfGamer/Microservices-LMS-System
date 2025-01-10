const express = require("express");
const multer = require("multer");
const path = require("path");
<<<<<<< HEAD
<<<<<<< HEAD
const fs = require("fs");
=======
>>>>>>> d668b388ed32a1f2bead092f2e848edd78b12482
=======
const fs = require("fs");
>>>>>>> eb94ad15042376d4eebd0dd04ed4ef0df0c5dbb1
const Content = require("../models/content");
const User = require("../models/user");

const router = express.Router();

// Middleware autentikasi
const authenticate = (req, res, next) => {
  const { username, role } = req.headers;
  if (!username || !role) {
    return res.status(401).json({ error: "Unauthorized: Missing username or role in headers" });
  }
  req.user = { username, role };
  next();
};

router.use(authenticate);

// Konfigurasi multer untuk upload file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> eb94ad15042376d4eebd0dd04ed4ef0df0c5dbb1
    const uploadPath = path.join(__dirname, "../uploads/");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
<<<<<<< HEAD
=======
    cb(null, "uploads/");
>>>>>>> d668b388ed32a1f2bead092f2e848edd78b12482
=======
>>>>>>> eb94ad15042376d4eebd0dd04ed4ef0df0c5dbb1
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage });

// POST: Menambahkan konten baru dengan file
router.post("/", upload.single("file"), async (req, res) => {
  const { username } = req.user;
  const { class_id, content_title, content_description, category } = req.body;
  const file_url = req.file ? `/uploads/${req.file.filename}` : null;

  if (!class_id || !content_title || !category) {
<<<<<<< HEAD
<<<<<<< HEAD
    return res.status(400).json({ error: "Class ID, Title, and Category are required" });
  }

  try {
=======
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Cari user berdasarkan username
>>>>>>> d668b388ed32a1f2bead092f2e848edd78b12482
=======
    return res.status(400).json({ error: "Class ID, Title, and Category are required" });
  }

  try {
>>>>>>> eb94ad15042376d4eebd0dd04ed4ef0df0c5dbb1
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

<<<<<<< HEAD
<<<<<<< HEAD
=======
    // Membuat content baru
>>>>>>> d668b388ed32a1f2bead092f2e848edd78b12482
=======
>>>>>>> eb94ad15042376d4eebd0dd04ed4ef0df0c5dbb1
    const content = new Content({
      class_id,
      content_title,
      content_description,
      category,
<<<<<<< HEAD
<<<<<<< HEAD
      created_by: user._id,
      content_url: file_url,
    });

    await content.save();
=======
      created_by: user._id, // Menyimpan ID user
      content_url: file_url
    });

    await content.save();

>>>>>>> d668b388ed32a1f2bead092f2e848edd78b12482
=======
      created_by: user._id,
      content_url: file_url,
    });

    await content.save();
>>>>>>> eb94ad15042376d4eebd0dd04ed4ef0df0c5dbb1
    res.status(201).json({ message: "Content added successfully", content_id: content._id });
  } catch (err) {
    console.error("Error adding content:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET: Mendapatkan semua konten berdasarkan `class_id`
router.get("/", async (req, res) => {
  const { class_id } = req.query;

  if (!class_id) {
    return res.status(400).json({ error: "Missing class_id in query" });
  }

  try {
<<<<<<< HEAD
<<<<<<< HEAD
    const contents = await Content.find({ class_id }).populate("created_by", "username -_id");
=======
    const contents = await Content.find({ class_id }).populate("created_by", "username -_id"); // Populate user data (created_by)
>>>>>>> d668b388ed32a1f2bead092f2e848edd78b12482
=======
    const contents = await Content.find({ class_id }).populate("created_by", "username -_id");
>>>>>>> eb94ad15042376d4eebd0dd04ed4ef0df0c5dbb1
    res.json(contents);
  } catch (err) {
    console.error("Error fetching content:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

const express = require('express');
const Class = require('../models/class');
const ClassMember = require('../models/classMember');
const User = require('../models/user');

const router = express.Router();

// Endpoint untuk mendapatkan kelas berdasarkan role
router.get('/', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Anda belum login' });
  }

  const { role, user_id } = req.session.user;

  try {
    let classes;

    if (role === 'admin') {
      // Admin mendapatkan semua kelas
      classes = await Class.find();
    } else if (role === 'dosen' || role === 'mahasiswa') {
      // Dosen atau mahasiswa mendapatkan kelas berdasarkan peran mereka
      const classMembers = await ClassMember.find({ user_id, role })
        .populate('class_id', 'class_name description created_at');
      classes = classMembers.map(member => member.class_id);
    } else {
      return res.status(403).json({ message: 'Role tidak dikenali.' });
    }

    res.json({ classes });
  } catch (err) {
    console.error('Kesalahan server:', err.message);
    res.status(500).json({ message: 'Kesalahan server.' });
  }
});

// Endpoint untuk membuat kelas baru
router.post('/', async (req, res) => {
  const { class_name, description, selectedUsers } = req.body;

  if (!class_name || !selectedUsers || selectedUsers.length === 0) {
    return res.status(400).json({ message: 'Nama kelas dan anggota wajib diisi' });
  }

  try {
    // Buat kelas baru
    const newClass = new Class({ class_name, description });
    const savedClass = await newClass.save();

    // Tambahkan anggota kelas
    const classMembers = selectedUsers.map(user => ({
      user_id: user.user_id,
      class_id: savedClass._id,
      role: user.role
    }));
    await ClassMember.insertMany(classMembers);

    res.status(201).json({ message: 'Kelas berhasil dibuat beserta anggota' });
  } catch (err) {
    console.error('Kesalahan server saat membuat kelas:', err.message);
    res.status(500).json({ message: 'Kesalahan server.' });
  }
});

// Endpoint untuk mendapatkan detail kelas berdasarkan class_id
router.get('/:class_id', async (req, res) => {
  const { class_id } = req.params;

  try {
    const classData = await Class.findById(class_id);
    if (!classData) {
      return res.status(404).json({ message: 'Kelas tidak ditemukan' });
    }

    const members = await ClassMember.find({ class_id })
      .populate('user_id', 'username role -_id');

    res.json({
      class: {
        ...classData.toObject(),
        members
      }
    });
  } catch (err) {
    console.error('Kesalahan server saat memuat kelas:', err.message);
    res.status(500).json({ message: 'Kesalahan server.' });
  }
});

module.exports = router;

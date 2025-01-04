const express = require('express');
const Joi = require('joi');
const Content = require('../models/content');
const Class = require('../models/class');
const User = require('../models/user');

const router = express.Router();
     
// Validasi Input
const contentSchema = Joi.object({
  class_id: Joi.number().required(),
  content_type: Joi.string().valid('video', 'document', 'quiz', 'assignment').required(),
  content_title: Joi.string().max(100).required(),
  content_description: Joi.string().optional(),
  content_url: Joi.string().uri().optional(),
  created_by: Joi.number().required(),
});

// POST - Tambah Konten Baru
router.post('/', async (req, res) => {
  try {
    const { error } = contentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { class_id, content_type, content_title, content_description, content_url, created_by } = req.body;

    const content = await Content.create({
      class_id,
      content_type,
      content_title,
      content_description,
      content_url,
      created_by,
    });

    res.status(201).json({ message: 'Konten berhasil ditambahkan', content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan saat menambahkan konten', error });
  }
});

// GET - Ambil Semua Konten atau Berdasarkan `class_id`
router.get('/', async (req, res) => {
  try {
    const { class_id } = req.query;

    const whereClause = {};
    if (class_id) whereClause.class_id = class_id;

    const contents = await Content.findAll({
      where: whereClause,
      include: [
        { model: Class, as: 'Class' },
        { model: User, as: 'Creator' },
      ],
    });

    res.status(200).json({ contents });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil konten', error });
  }
});

// GET - Ambil Konten Berdasarkan ID
router.get('/:content_id', async (req, res) => {
  try {
    const { content_id } = req.params;

    const content = await Content.findByPk(content_id, {
      include: [
        { model: Class, as: 'Class' },
        { model: User, as: 'Creator' },
      ],
    });

    if (!content) {
      return res.status(404).json({ message: 'Konten tidak ditemukan' });
    }

    res.status(200).json({ content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil konten', error });
  }
});

// PUT - Update Konten Berdasarkan ID
router.put('/:content_id', async (req, res) => {
  try {
    const { content_id } = req.params;

    const { error } = contentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const content = await Content.findByPk(content_id);

    if (!content) {
      return res.status(404).json({ message: 'Konten tidak ditemukan' });
    }

    const { class_id, content_type, content_title, content_description, content_url, created_by } = req.body;

    await content.update({
      class_id,
      content_type,
      content_title,
      content_description,
      content_url,
      created_by,
    });

    res.status(200).json({ message: 'Konten berhasil diperbarui', content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui konten', error });
  }
});

// DELETE - Hapus Konten Berdasarkan ID
router.delete('/:content_id', async (req, res) => {
  try {
    const { content_id } = req.params;

    const content = await Content.findByPk(content_id);

    if (!content) {
      return res.status(404).json({ message: 'Konten tidak ditemukan' });
    }

    await content.destroy();

    res.status(200).json({ message: 'Konten berhasil dihapus' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan saat menghapus konten', error });
  }
});

module.exports = router;

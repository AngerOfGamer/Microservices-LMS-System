import express from 'express';
import Absensi from '../models/absensi.js';

const router = express.Router();

// POST - Tambah Absensi
router.post('/absensi', async (req, res) => {
    try {
        const { class_id, user_id, date, status } = req.body;

        const absensi = await Absensi.create({
            class_id,
            user_id,
            date,
            status
        });

        res.status(201).json({ message: 'Absensi berhasil ditambahkan', absensi });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan saat menambahkan absensi', error });
    }
});

// GET - Ambil Absensi berdasarkan user_id dan date
router.get('/absensi', async (req, res) => {
    try {
        const { user_id, date } = req.query;

        const absensi = await Absensi.findAll({
            where: { user_id, date },
            include: ['Class', 'User']  // Pastikan relasi sudah benar
        });

        res.status(200).json({ absensi });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data absensi', error });
    }
});

// PUT - Update Absensi
router.put('/absensi/:absensi_id', async (req, res) => {
    try {
        const { absensi_id } = req.params;
        const { status } = req.body;

        const absensi = await Absensi.findByPk(absensi_id);

        if (!absensi) {
            return res.status(404).json({ message: 'Absensi tidak ditemukan' });
        }

        absensi.status = status;
        await absensi.save();

        res.status(200).json({ message: 'Status absensi berhasil diperbarui', absensi });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui absensi', error });
    }
});

// DELETE - Hapus Absensi
router.delete('/absensi/:absensi_id', async (req, res) => {
    try {
        const { absensi_id } = req.params;

        const absensi = await Absensi.findByPk(absensi_id);

        if (!absensi) {
            return res.status(404).json({ message: 'Absensi tidak ditemukan' });
        }

        await absensi.destroy();

        res.status(200).json({ message: 'Absensi berhasil dihapus' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan saat menghapus absensi', error });
    }
});

export default router;

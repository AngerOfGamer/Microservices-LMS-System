const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  notification_id: { type: Number, required: true, unique: true },
  title: { type: String, required: true, maxlength: 255 },
  content: { type: String, required: true },
  category: { type: String, enum: ['materi', 'tugas', 'penilaian', 'libur'], required: true },
  role: { type: String, enum: ['mahasiswa', 'dosen', 'admin', 'semua'], required: true },
  class_id: { type: Number, default: null },
  recipient_ids: { type: [Number], default: [] },
  created_by: { type: Number, required: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', NotificationSchema);

const mongoose = require('mongoose');
const getNextSequence = require('../utils/increment');

const NotificationSchema = new mongoose.Schema({
  notification_id: { type: Number, unique: true },
  title: { type: String, required: true, maxlength: 255 },
  content: { type: String, required: true },
  category: { type: String, enum: ['materi', 'tugas', 'penilaian', 'libur'], required: true },
<<<<<<< HEAD
  recipient_roles: { type: [String], enum: ['admin', 'dosen', 'mahasiswa'], required: true },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  created_at: { type: Date, default: Date.now },
});

NotificationSchema.pre('save', async function (next) {
  if (!this.notification_id) {
    this.notification_id = await getNextSequence('notification');
  }
  next();
});
=======
  role: { type: String, enum: ['mahasiswa', 'dosen', 'admin', 'semua'], required: true },
  class_id: { type: Number, ref:'Class', default: null },
  recipient_ids: { type: [Number], default: [] },
  created_by: { type: Number, required: true },
  created_at: { type: Date, default: Date.now }
});

NotificationSchema.pre('save', async function (next) {
    if (!this.notification_id) {
      this.notification_id = await getNextSequence('notification'); 
    }
    next();
  });
>>>>>>> d668b388ed32a1f2bead092f2e848edd78b12482

module.exports = mongoose.model('Notification', NotificationSchema);

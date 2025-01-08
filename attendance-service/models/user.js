const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  user_id: { type: Number, required: true, unique: true },
  username: { type: String, required: true, maxlength: 50 },
  nip_nim: { type: String, required: true, unique: true, maxlength: 255 },
  role: { type: String, enum: ['admin', 'dosen', 'mahasiswa'], required: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);

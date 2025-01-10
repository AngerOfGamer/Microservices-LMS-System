const mongoose = require('mongoose');
const getNextSequence = require('../utils/increment');

const UserSchema = new mongoose.Schema({
  user_id: { type: Number, unique: true },
  username: { type: String, required: true, maxlength: 50 },
  nip_nim: { type: String, required: true, unique: true, maxlength: 255 },
  role: { type: String, enum: ['admin', 'dosen', 'mahasiswa'], required: true },
  created_at: { type: Date, default: Date.now },
});

UserSchema.pre('save', async function (next) {
  if (!this.user_id) {
    this.user_id = await getNextSequence('users');
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);
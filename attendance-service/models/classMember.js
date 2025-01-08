const mongoose = require('mongoose');

const ClassMemberSchema = new mongoose.Schema({
  class_member_id: { type: Number, required: true, unique: true },
  user_id: { type: Number, required: true },
  class_id: { type: Number, required: true },
  role: { type: String, enum: ['dosen', 'mahasiswa'], required: true },
  joined_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ClassMember', ClassMemberSchema);

const mongoose = require('mongoose');
const getNextSequence = require('../utils/increment');

const UserSchema = new mongoose.Schema({
<<<<<<< HEAD
<<<<<<< HEAD
  user_id: { type: Number, unique: true },
  username: { type: String, required: true, maxlength: 50 },
  nip_nim: { type: String, required: true, unique: true, maxlength: 255 },
  role: { type: String, enum: ['admin', 'dosen', 'mahasiswa'], required: true },
  created_at: { type: Date, default: Date.now },
=======
  uuser_id: { type: Number, unique: true },
  username: { type: String, required: true, maxlength: 50 },
  nip_nim: { type: String, required: true, unique: true, maxlength: 255 },
  role: { type: String, enum: ['admin', 'dosen', 'mahasiswa'], required: true },
  created_at: { type: Date, default: Date.now }
>>>>>>> d668b388ed32a1f2bead092f2e848edd78b12482
=======
  user_id: { type: Number, unique: true },
  username: { type: String, required: true, maxlength: 50 },
  nip_nim: { type: String, required: true, unique: true, maxlength: 255 },
  role: { type: String, enum: ['admin', 'dosen', 'mahasiswa'], required: true },
  created_at: { type: Date, default: Date.now },
>>>>>>> eb94ad15042376d4eebd0dd04ed4ef0df0c5dbb1
});

UserSchema.pre('save', async function (next) {
  if (!this.user_id) {
<<<<<<< HEAD
<<<<<<< HEAD
    this.user_id = await getNextSequence('users');
=======
    this.user_id = await getNextSequence('users'); 
>>>>>>> d668b388ed32a1f2bead092f2e848edd78b12482
=======
    this.user_id = await getNextSequence('users');
>>>>>>> eb94ad15042376d4eebd0dd04ed4ef0df0c5dbb1
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);

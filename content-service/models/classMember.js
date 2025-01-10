const mongoose = require('mongoose');
const getNextSequence = require('../utils/increment');

const ClassMemberSchema = new mongoose.Schema({
  class_member_id: { type: Number, unique: true },
<<<<<<< HEAD
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  role: { type: String, enum: ['dosen', 'mahasiswa'], required: true },
  joined_at: { type: Date, default: Date.now },
});

ClassMemberSchema.pre('save', async function (next) {
  if (!this.class_member_id) {
    this.class_member_id = await getNextSequence('class_member');
  }
  next();
=======
  user_id: { type: Number, ref:'User', required: true },
  class_id: { type: Number,ref:'Class', required: true },
  role: { type: String, enum: ['dosen', 'mahasiswa'], required: true },
  joined_at: { type: Date, default: Date.now }
});

ClassMemberSchema.pre('save', async function (next) {
    if (!this.class_member_id) {
      this.class_member_id = await getNextSequence('class_member'); 
    }
    next();
>>>>>>> d668b388ed32a1f2bead092f2e848edd78b12482
});

module.exports = mongoose.model('ClassMember', ClassMemberSchema);

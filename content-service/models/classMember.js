const mongoose = require('mongoose');
const getNextSequence = require('../utils/increment');

const ClassMemberSchema = new mongoose.Schema({
  class_member_id: { type: Number, unique: true },
<<<<<<< HEAD
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
=======
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
>>>>>>> eb94ad15042376d4eebd0dd04ed4ef0df0c5dbb1
  role: { type: String, enum: ['dosen', 'mahasiswa'], required: true },
  joined_at: { type: Date, default: Date.now },
});

ClassMemberSchema.pre('save', async function (next) {
<<<<<<< HEAD
    if (!this.class_member_id) {
      this.class_member_id = await getNextSequence('class_member'); 
    }
    next();
>>>>>>> d668b388ed32a1f2bead092f2e848edd78b12482
=======
  if (!this.class_member_id) {
    this.class_member_id = await getNextSequence('class_member');
  }
  next();
>>>>>>> eb94ad15042376d4eebd0dd04ed4ef0df0c5dbb1
});

module.exports = mongoose.model('ClassMember', ClassMemberSchema);

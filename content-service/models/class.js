const mongoose = require('mongoose');
const getNextSequence = require('../utils/increment');

const ClassSchema = new mongoose.Schema({
  class_id: { type: Number, unique: true },
  class_name: { type: String, required: true, maxlength: 100 },
  description: { type: String, default: null },
<<<<<<< HEAD
<<<<<<< HEAD
  created_at: { type: Date, default: Date.now },
=======
  created_at: { type: Date, default: Date.now }
>>>>>>> d668b388ed32a1f2bead092f2e848edd78b12482
=======
  created_at: { type: Date, default: Date.now },
>>>>>>> eb94ad15042376d4eebd0dd04ed4ef0df0c5dbb1
});

ClassSchema.pre('save', async function (next) {
  if (!this.class_id) {
<<<<<<< HEAD
<<<<<<< HEAD
    this.class_id = await getNextSequence('class');
=======
    this.class_id = await getNextSequence('class'); 
>>>>>>> d668b388ed32a1f2bead092f2e848edd78b12482
=======
    this.class_id = await getNextSequence('class');
>>>>>>> eb94ad15042376d4eebd0dd04ed4ef0df0c5dbb1
  }
  next();
});

module.exports = mongoose.model('Class', ClassSchema);

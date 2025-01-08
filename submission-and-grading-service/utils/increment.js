const Counter = require('../models/counter');

const getNextSequence = async (name) => {
  try {
    const counter = await Counter.findOneAndUpdate(
      { _id: name },                 
      { $inc: { sequence_value: 1 } }, 
      { new: true, upsert: true }      
    );
    return counter.sequence_value;    
  } catch (error) {
    console.error('Error in getNextSequence:', error);
    throw error;
  }
};

module.exports = getNextSequence;

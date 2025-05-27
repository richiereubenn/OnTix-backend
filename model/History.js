const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  idHistory: {
    type: String,
    required: true,
    unique: true, 
  },
  idEvent: {
    type: String,
    required: true,
  },
  account: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('History', historySchema);

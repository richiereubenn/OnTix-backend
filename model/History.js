const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  idEvent: {
    type: mongoose.Schema.Types.ObjectId,
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

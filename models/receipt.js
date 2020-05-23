const mongoose = require('mongoose');

const receiptSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
  },
  fee_room: {
    type: Number,
    default: 0,
  },
  fee_living: {
    type: Number,
    default: 0,
  },
  payment: String,

  date_valid_fee_room: {
    type: String,
  },
  date_valid_fee_living: {
    type: String,
  },

});

const receiptModel = mongoose.model('Receipt', receiptSchema);
module.exports = receiptModel;

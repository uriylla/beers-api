var mongoose = require('mongoose');

var Beer = mongoose.model('Beer', {
  amount: {
    type: Number,
    required: true
  },
  delivered: {
    type: Boolean,
    default: false
  },
  _winner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  _loser: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

module.exports = {Beer};

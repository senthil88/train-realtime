/*! * Module dependencies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** Train schema */
const TrainSchema = new Schema({
  name: { type: String, default: '', required: true },
  number: { type: String, default: '', required: true },
  coordinates: {
    type: [Number],
    required: true
  }
});


TrainSchema.method({});

TrainSchema.static({});

mongoose.model('Train', TrainSchema);

/*! * Module dependencies */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** Station schema */
const StationSchema = new Schema({
  display_name: { type: String, default: '', required: true },
  city: { type: String, default: '', required: true },
  state: { type: String, default: '', required: true },
  pincode: { type: String, default: '', required: true },
  coordinates: {
    type: [Number],
    required: true
  }
});


StationSchema.method({});

StationSchema.static({});

mongoose.model('Station', StationSchema);

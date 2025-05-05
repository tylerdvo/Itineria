const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  day: { type: Number, required: true },
  time: { type: String, required: true },
  date: { type: Date },
});

const ItinerarySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, default: Date.now },
  activities: [ActivitySchema],
});

module.exports = mongoose.model('Itinerary', ItinerarySchema);

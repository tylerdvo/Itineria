const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add an activity title']
  },
  description: {
    type: String
  },
  location: {
    type: String
  },
  category: {
    type: String,
    enum: ['sightseeing', 'food', 'shopping', 'entertainment', 'nature', 'culture', 'relaxation', 'other'],
    default: 'other'
  },
  date: {
    type: Date,
    required: [true, 'Please add an activity date']
  },
  startTime: {
    type: String,
    match: [
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      'Please add a valid start time (HH:MM)'
    ]
  },
  endTime: {
    type: String,
    match: [
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      'Please add a valid end time (HH:MM)'
    ]
  },
  cost: {
    type: Number,
    default: 0
  },
  imageUrl: {
    type: String
  }
});

const ItinerarySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add an itinerary title'],
    trim: true
  },
  description: {
    type: String
  },
  destination: {
    type: String,
    required: [true, 'Please add a destination']
  },
  startDate: {
    type: Date,
    required: [true, 'Please add a start date']
  },
  endDate: {
    type: Date,
    required: [true, 'Please add an end date']
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  collaborators: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  activities: [ActivitySchema],
  isPublic: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String
  }],
  budget: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field on save
ItinerarySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Itinerary', ItinerarySchema);
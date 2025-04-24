const mongoose = require('mongoose');

const PreferenceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  interests: [{
    type: String
  }],
  accommodationType: {
    type: String,
    enum: ['budget', 'mid-range', 'luxury'],
    default: 'mid-range'
  },
  transportationPreference: {
    type: String,
    enum: ['public', 'rental', 'walking', 'tour'],
    default: 'public'
  },
  foodPreferences: [{
    type: String
  }],
  accessibility: {
    type: Boolean,
    default: false
  },
  pacePreference: {
    type: String,
    enum: ['relaxed', 'moderate', 'intense'],
    default: 'moderate'
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
PreferenceSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Preference', PreferenceSchema);
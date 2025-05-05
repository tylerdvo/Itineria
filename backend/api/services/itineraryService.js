const Itinerary = require('../models/Itinerary');

exports.addActivityToUser = async (userId, activityData) => {
  let itinerary = await Itinerary.findOne({ user: userId });
  if (!itinerary) {
    itinerary = new Itinerary({ user: userId, activities: [] });
  }

  const date = new Date(itinerary.startDate);
  date.setDate(date.getDate() + parseInt(activityData.day));
  const activity = { ...activityData, date };

  itinerary.activities.push(activity);
  await itinerary.save();

  return activity;
};

exports.getActivitiesByUser = async (userId) => {
  const itinerary = await Itinerary.findOne({ user: userId });
  return itinerary ? itinerary.activities : [];
};

exports.getUserItineraries = async (userId) => {
  const itineraries = await Itinerary.find({ user: userId });
  return itineraries;
};


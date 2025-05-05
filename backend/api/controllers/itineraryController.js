const Itinerary = require('../models/Itinerary');

exports.addActivity = async (req, res) => {
  const userId = req.params.id;
  const { title, description, day, time } = req.body;

  try {
    let itinerary = await Itinerary.findOne({ user: userId });
    if (!itinerary) {
      itinerary = new Itinerary({ user: userId, activities: [] });
    }

    const date = new Date(itinerary.startDate);
    date.setDate(date.getDate() + parseInt(day));

    const activity = { title, description, day, time, date };
    itinerary.activities.push(activity);

    await itinerary.save();
    res.status(201).json(activity);
  } catch (error) {
    console.error('Add activity error:', error);
    res.status(500).json({ error: 'Failed to add activity' });
  }
};

exports.getUserItineraries = async (req, res) => {
  const userId = req.params.id;

  try {
    const itinerary = await Itinerary.findOne({ user: userId });
    if (!itinerary) return res.status(404).json({ message: 'No itinerary found' });
    res.json(itinerary.activities);
  } catch (error) {
    console.error('Get itineraries error:', error);
    res.status(500).json({ error: 'Failed to retrieve activities' });
  }
};

exports.updateActivity = async (req, res) => {
  const { id: itineraryId, activityId } = req.params;
  const { title, description, day, time } = req.body;

  try {
    let itinerary = await Itinerary.findOne({ user: itineraryId });
    if (!itinerary) return res.status(404).json({ message: 'No itinerary found' });

    // Find and update the specific activity
    const activityIndex = itinerary.activities.findIndex(
      activity => activity._id.toString() === activityId
    );

    if (activityIndex === -1) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    // Update the activity
    itinerary.activities[activityIndex] = {
      ...itinerary.activities[activityIndex].toObject(),
      title,
      description,
      day,
      time
    };

    await itinerary.save();
    res.json(itinerary.activities[activityIndex]);
  } catch (error) {
    console.error('Update activity error:', error);
    res.status(500).json({ error: 'Failed to update activity' });
  }
};

exports.deleteActivity = async (req, res) => {
  const { id: itineraryId, activityId } = req.params;

  try {
    let itinerary = await Itinerary.findOne({ user: itineraryId });
    if (!itinerary) return res.status(404).json({ message: 'No itinerary found' });

    // Remove the activity
    itinerary.activities = itinerary.activities.filter(
      activity => activity._id.toString() !== activityId
    );

    await itinerary.save();
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Delete activity error:', error);
    res.status(500).json({ error: 'Failed to delete activity' });
  }
};

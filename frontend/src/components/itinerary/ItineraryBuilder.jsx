import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Grid, 
  Paper,
  Card,
  CardContent,
  Divider,
  IconButton,
  Alert,
  Snackbar,
  CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventIcon from '@mui/icons-material/Event';
import DescriptionIcon from '@mui/icons-material/Description';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import itineraryService from '../../services/itineraryService';

const ItineraryBuilder = ({ onNext, onActivityAdded, initialActivities = [], editMode = false }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [day, setDay] = useState('');
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('Activity added successfully!');
  const [editingActivity, setEditingActivity] = useState(null);

  const user = useSelector((state) => state.auth.user);

  // Initialize with activities if provided - only on first render
  useEffect(() => {
    if (initialActivities && initialActivities.length > 0) {
      console.log('Initializing with activities:', initialActivities);
      setActivities(initialActivities);
      
      // If in edit mode and there's exactly one activity, populate the form with it
      if (editMode && initialActivities.length === 1) {
        const activity = initialActivities[0];
        setTitle(activity.title || '');
        setDescription(activity.description || '');
        setTime(activity.time || '');
        setDay(activity.day?.toString() || '');
        setEditingActivity(activity);
        setSuccessMessage('Activity updated successfully!');
      }
    }
  }, []); // Empty dependency array - only run on mount

  // Notify parent component when activities change - but prevent the circular dependency
  useEffect(() => {
    // Skip the initial render or when activities are set from initialActivities
    const isInitialRender = JSON.stringify(activities) === JSON.stringify(initialActivities);
    
    if (typeof onActivityAdded === 'function' && !isInitialRender) {
      onActivityAdded(activities);
    }
  }, [activities]); // Removed onActivityAdded from dependency array

  const handleAddActivity = async () => {
    // Validation
    if (!title || !time || !day) {
      setError('Please fill in all required fields');
      return;
    }

    if (!user || !user._id) {
      setError('You must be logged in to add activities');
      return;
    }

    const activityData = {
      title,
      description,
      time,
      day: parseInt(day),
    };

    setLoading(true);
    setError('');

    try {
      if (editingActivity) {
        // Update existing activity
        const updatedActivity = await itineraryService.updateActivity(
          user._id, 
          editingActivity._id, 
          activityData
        );
        
        // Replace the activity in the list
        setActivities(activities.map(activity => 
          activity._id === editingActivity._id ? updatedActivity : activity
        ));
        
        // Reset editing state
        setEditingActivity(null);
      } else {
        // Create new activity
        const savedActivity = await itineraryService.createActivity(user._id, activityData);
        setActivities([...activities, savedActivity]);
      }
      
      // Reset form
      setTitle('');
      setDescription('');
      setTime('');
      setDay('');
      
      // Show success message
      setSuccess(true);
    } catch (err) {
      console.error('Error saving activity:', err);
      setError('Failed to save activity. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditActivity = (activity) => {
    // Set form fields to the activity values
    setTitle(activity.title || '');
    setDescription(activity.description || '');
    setTime(activity.time || '');
    setDay(activity.day?.toString() || '');
    setEditingActivity(activity);
    setSuccessMessage('Activity updated successfully!');
    
    // Scroll to the form
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleCancelEdit = () => {
    // Reset form
    setTitle('');
    setDescription('');
    setTime('');
    setDay('');
    setEditingActivity(null);
    setSuccessMessage('Activity added successfully!');
  };

  const handleDeleteActivity = async (activityId) => {
    try {
      // In a complete implementation, this would call an API endpoint
      await itineraryService.deleteActivity(user._id, activityId);
      
      // Remove from local state
      setActivities(activities.filter(activity => 
        activity._id !== activityId
      ));
      
      // If the deleted activity is the one being edited, reset the form
      if (editingActivity && editingActivity._id === activityId) {
        handleCancelEdit();
      }
    } catch (err) {
      console.error('Error deleting activity:', err);
      setError('Failed to delete activity. Please try again.');
    }
  };

  const handleCloseSnackbar = () => {
    setSuccess(false);
  };

  // Sort activities by day
  const sortedActivities = [...activities].sort((a, b) => a.day - b.day);

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom color="primary">
          {editingActivity ? 'Edit Activity' : 'Create Your Travel Itinerary'}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {editingActivity 
            ? 'Update the details of your activity below.'
            : 'Add activities to your travel itinerary below. You\'ll need at least one activity to proceed.'
          }
        </Typography>
        
        {/* Activity Form */}
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Activity Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Visit Eiffel Tower"
              required
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: <LocationOnIcon color="action" sx={{ mr: 1 }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="e.g., 10:00 AM"
              required
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: <AccessTimeIcon color="action" sx={{ mr: 1 }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              fullWidth
              label="Day"
              type="number"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              placeholder="e.g., 1"
              required
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: <EventIcon color="action" sx={{ mr: 1 }} />,
                inputProps: { min: 1 }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {editingActivity ? (
              <Box sx={{ display: 'flex', gap: 1, height: '100%' }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  onClick={handleAddActivity}
                  disabled={loading}
                  sx={{ flexGrow: 1 }}
                >
                  {loading ? 'Saving...' : 'Update'}
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleCancelEdit}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </Box>
            ) : (
              <Button
                variant="contained"
                color="primary"
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AddIcon />}
                onClick={handleAddActivity}
                disabled={loading}
                fullWidth
                sx={{ height: '100%' }}
              >
                Add Activity
              </Button>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your activity..."
              multiline
              rows={2}
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: <DescriptionIcon color="action" sx={{ mr: 1, mt: 1 }} />,
              }}
            />
          </Grid>
        </Grid>
        
        {/* Error Message */}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Paper>
      
      {/* Activities List */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Planned Activities ({activities.length})
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        {activities.length === 0 ? (
          <Paper elevation={1} sx={{ p: 3, textAlign: 'center', bgcolor: 'background.paper' }}>
            <Typography variant="body1" color="text.secondary">
              No activities added yet. Start building your itinerary above.
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={2}>
            {sortedActivities.map((activity) => (
              <Grid item xs={12} sm={6} md={4} key={activity._id || `${activity.title}-${activity.time}`}>
                <Card 
                  elevation={2}
                  sx={{ 
                    height: '100%',
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 4
                    },
                    position: 'relative'
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Typography variant="h6" component="div" gutterBottom>
                        {activity.title}
                      </Typography>
                      <Box>
                        <IconButton 
                          size="small" 
                          color="primary"
                          onClick={() => handleEditActivity(activity)}
                          sx={{ mr: 0.5 }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          color="error"
                          onClick={() => handleDeleteActivity(activity._id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <EventIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="body2" color="text.secondary">
                        Day {activity.day}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <AccessTimeIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="body2" color="text.secondary">
                        {activity.time}
                      </Typography>
                    </Box>
                    {activity.description && (
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {activity.description}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Next Button */}
      {typeof onNext === 'function' && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={onNext}
            disabled={activities.length === 0}
            sx={{ px: 4 }}
          >
            Next
          </Button>
        </Box>
      )}
      
      {/* Success Message */}
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ItineraryBuilder;
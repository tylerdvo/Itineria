import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, Button, Container, Typography, TextField, Paper,
  Stepper, Step, StepLabel, Grid, IconButton, Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useItinerary } from '../../hooks/useItinerary';
import { useAuth } from '../../hooks/useAuth';
import ActivityCard from './ActivityCard';

const steps = ['Basic Info', 'Destinations', 'Activities', 'Review'];

const ItineraryBuilder = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createItinerary, error, loading } = useItinerary();
  const [activeStep, setActiveStep] = useState(0);
  const [itinerary, setItinerary] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    destinations: [''],
    activities: []
  });
  const [validationErrors, setValidationErrors] = useState({});

  const handleNext = () => {
    // Validation for each step
    if (activeStep === 0) {
      const errors = {};
      if (!itinerary.title) errors.title = 'Title is required';
      if (!itinerary.startDate) errors.startDate = 'Start date is required';
      if (!itinerary.endDate) errors.endDate = 'End date is required';
      
      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        return;
      }
    } else if (activeStep === 1) {
      const errors = {};
      if (itinerary.destinations.length === 0 || 
          itinerary.destinations.some(dest => !dest)) {
        errors.destinations = 'At least one valid destination is required';
        setValidationErrors(errors);
        return;
      }
    }
    
    setValidationErrors({});
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItinerary({ ...itinerary, [name]: value });
  };

  const handleDestinationChange = (index, value) => {
    const newDestinations = [...itinerary.destinations];
    newDestinations[index] = value;
    setItinerary({ ...itinerary, destinations: newDestinations });
  };

  const addDestination = () => {
    setItinerary({
      ...itinerary,
      destinations: [...itinerary.destinations, '']
    });
  };

  const removeDestination = (index) => {
    const newDestinations = [...itinerary.destinations];
    newDestinations.splice(index, 1);
    setItinerary({ ...itinerary, destinations: newDestinations });
  };

  const addActivity = (activity) => {
    setItinerary({
      ...itinerary,
      activities: [...itinerary.activities, { ...activity, id: Date.now() }]
    });
  };

  const removeActivity = (activityId) => {
    setItinerary({
      ...itinerary,
      activities: itinerary.activities.filter(activity => activity.id !== activityId)
    });
  };

  const handleSubmit = async () => {
    try {
      await createItinerary({ ...itinerary, userId: user.id });
      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to create itinerary:', err);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ my: 3 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Title"
              name="title"
              value={itinerary.title}
              onChange={handleInputChange}
              error={!!validationErrors.title}
              helperText={validationErrors.title}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Description"
              name="description"
              multiline
              rows={3}
              value={itinerary.description}
              onChange={handleInputChange}
            />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Start Date"
                  name="startDate"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={itinerary.startDate}
                  onChange={handleInputChange}
                  error={!!validationErrors.startDate}
                  helperText={validationErrors.startDate}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="End Date"
                  name="endDate"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={itinerary.endDate}
                  onChange={handleInputChange}
                  error={!!validationErrors.endDate}
                  helperText={validationErrors.endDate}
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ my: 3 }}>
            <Typography variant="h6" gutterBottom>
              Where are you going?
            </Typography>
            {validationErrors.destinations && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {validationErrors.destinations}
              </Alert>
            )}
            {itinerary.destinations.map((destination, index) => (
              <Box key={index} sx={{ display: 'flex', mb: 2 }}>
                <TextField
                  fullWidth
                  label={`Destination ${index + 1}`}
                  value={destination}
                  onChange={(e) => handleDestinationChange(index, e.target.value)}
                />
                {itinerary.destinations.length > 1 && (
                  <IconButton onClick={() => removeDestination(index)}>
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
            ))}
            <Button
              startIcon={<AddIcon />}
              onClick={addDestination}
              variant="outlined"
              sx={{ mt: 1 }}
            >
              Add Destination
            </Button>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ my: 3 }}>
            <Typography variant="h6" gutterBottom>
              Plan Your Activities
            </Typography>
            {/* Activity form would go here, using ActivityCard component */}
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle1">Add New Activity</Typography>
              {/* Simplified activity form - this would be expanded */}
              <TextField 
                fullWidth
                margin="normal"
                label="Activity Name"
                id="new-activity-name"
              />
              <TextField
                fullWidth
                margin="normal"
                label="Location"
                id="new-activity-location"
              />
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => addActivity({
                  name: document.getElementById('new-activity-name').value,
                  location: document.getElementById('new-activity-location').value,
                  date: new Date().toISOString().split('T')[0]
                })}
              >
                Add Activity
              </Button>
            </Paper>
            
            <Typography variant="subtitle1" sx={{ mt: 3, mb: 2 }}>
              Planned Activities
            </Typography>
            {itinerary.activities.length === 0 ? (
              <Typography variant="body2" color="textSecondary">
                No activities added yet
              </Typography>
            ) : (
              <Grid container spacing={2}>
                {itinerary.activities.map((activity) => (
                  <Grid item xs={12} sm={6} md={4} key={activity.id}>
                    <ActivityCard
                      activity={activity}
                      onDelete={() => removeActivity(activity.id)}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        );
      case 3:
        return (
          <Box sx={{ my: 3 }}>
            <Typography variant="h6" gutterBottom>
              Review Your Itinerary
            </Typography>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5">{itinerary.title}</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {itinerary.startDate} to {itinerary.endDate}
              </Typography>
              <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                {itinerary.description || 'No description provided.'}
              </Typography>
              
              <Typography variant="h6" sx={{ mt: 3 }}>Destinations</Typography>
              <ul>
                {itinerary.destinations.map((destination, index) => (
                  <li key={index}>{destination}</li>
                ))}
              </ul>
              
              <Typography variant="h6" sx={{ mt: 3 }}>Activities</Typography>
              {itinerary.activities.length === 0 ? (
                <Typography variant="body2" color="textSecondary">
                  No activities planned yet
                </Typography>
              ) : (
                <ul>
                  {itinerary.activities.map((activity) => (
                    <li key={activity.id}>
                      {activity.name} - {activity.location}
                    </li>
                  ))}
                </ul>
              )}
            </Paper>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 4, my: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Create New Itinerary
        </Typography>
        
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
        
        {getStepContent(activeStep)}
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>
          <Box>
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Create Itinerary'}
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
              >
                Next
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ItineraryBuilder;
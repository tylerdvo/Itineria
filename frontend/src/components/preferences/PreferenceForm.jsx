import React, { useState, useEffect } from 'react';
import { 
  Box, Paper, Typography, TextField, Slider, Button, 
  Grid, Divider, FormControl, FormLabel, 
  FormControlLabel, Checkbox, Rating, Alert
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useAuth } from '../../hooks/useAuth';
import InterestSelector from './InterestSelector';

const PreferenceForm = ({ onSave, existingPreferences = null }) => {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState({
    travelStyle: 'balanced', // adventurous, relaxed, cultural, luxury, balanced
    budget: 'medium', // budget, medium, luxury
    pace: 3, // 1-5 scale, 1 = slow, 5 = fast
    foodPreference: 'no_preference', // local, international, vegetarian, vegan, no_preference
    accommodationType: 'hotel', // hotel, hostel, apartment, resort, camping
    interests: [], // array of interests from InterestSelector
    transportationPreference: {
      publicTransport: true,
      car: false,
      walking: true,
      cycling: false
    },
    accessibility: false,
    childFriendly: false,
    avoidCrowds: false,
    prioritizeSustainability: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Load existing preferences if provided
  useEffect(() => {
    if (existingPreferences) {
      setPreferences(prevPrefs => ({
        ...prevPrefs,
        ...existingPreferences
      }));
    }
  }, [existingPreferences]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPreferences(prevPrefs => ({
      ...prevPrefs,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    
    // Handle transportationPreference nested object
    if (name.startsWith('transportation.')) {
      const transportType = name.split('.')[1];
      setPreferences(prevPrefs => ({
        ...prevPrefs,
        transportationPreference: {
          ...prevPrefs.transportationPreference,
          [transportType]: checked
        }
      }));
    } else {
      setPreferences(prevPrefs => ({
        ...prevPrefs,
        [name]: checked
      }));
    }
  };

  const handleSliderChange = (name) => (e, newValue) => {
    setPreferences(prevPrefs => ({
      ...prevPrefs,
      [name]: newValue
    }));
  };

  const handleInterestsChange = (selectedInterests) => {
    setPreferences(prevPrefs => ({
      ...prevPrefs,
      interests: selectedInterests
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
      await onSave({
        ...preferences,
        userId: user.id
      });
      setSuccessMessage('Your travel preferences have been saved successfully!');
    } catch (err) {
      setError('Failed to save preferences. Please try again.');
      console.error('Save preferences error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper component="form" onSubmit={handleSubmit} sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Your Travel Preferences
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
        Help us understand your travel style to generate better personalized itineraries.
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      {successMessage && <Alert severity="success" sx={{ mb: 3 }}>{successMessage}</Alert>}
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Travel Style
        </Typography>
        <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
          <FormLabel component="legend">How would you describe your travel style?</FormLabel>
          <TextField
            select
            name="travelStyle"
            value={preferences.travelStyle}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            SelectProps={{
              native: true,
            }}
          >
            <option value="adventurous">Adventurous - I seek thrills and unique experiences</option>
            <option value="relaxed">Relaxed - I prefer to take it easy and unwind</option>
            <option value="cultural">Cultural - I focus on local history, art, and traditions</option>
            <option value="luxury">Luxury - I enjoy high-end experiences and comfort</option>
            <option value="balanced">Balanced - I like a mix of activities and relaxation</option>
          </TextField>
        </FormControl>
        
        <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
          <FormLabel component="legend">What's your typical travel budget?</FormLabel>
          <TextField
            select
            name="budget"
            value={preferences.budget}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            SelectProps={{
              native: true,
            }}
          >
            <option value="budget">Budget - I prefer affordable options</option>
            <option value="medium">Medium - I'm willing to spend for good experiences</option>
            <option value="luxury">Luxury - I want the best experiences available</option>
          </TextField>
        </FormControl>
        
        <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
          <FormLabel component="legend">Travel Pace</FormLabel>
          <Typography id="pace-slider" gutterBottom>
            How fast do you like to travel? (1 = slow and relaxed, 5 = fast-paced)
          </Typography>
          <Slider
            aria-labelledby="pace-slider"
            value={preferences.pace}
            onChange={handleSliderChange('pace')}
            step={1}
            marks
            min={1}
            max={5}
            valueLabelDisplay="auto"
          />
        </FormControl>
      </Box>
      
      <Divider sx={{ my: 3 }} />
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Accommodation & Food
        </Typography>
        
        <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
          <FormLabel component="legend">What type of accommodation do you prefer?</FormLabel>
          <TextField
            select
            name="accommodationType"
            value={preferences.accommodationType}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            SelectProps={{
              native: true,
            }}
          >
            <option value="hotel">Hotels</option>
            <option value="hostel">Hostels</option>
            <option value="apartment">Apartments/Rentals</option>
            <option value="resort">Resorts</option>
            <option value="camping">Camping/Outdoor</option>
          </TextField>
        </FormControl>
        
        <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
          <FormLabel component="legend">Food Preferences</FormLabel>
          <TextField
            select
            name="foodPreference"
            value={preferences.foodPreference}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            SelectProps={{
              native: true,
            }}
          >
            <option value="local">Local cuisine</option>
            <option value="international">International cuisine</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="no_preference">No specific preference</option>
          </TextField>
        </FormControl>
      </Box>
      
      <Divider sx={{ my: 3 }} />
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Interests & Activities
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          Select your interests to help us recommend activities you'll enjoy.
        </Typography>
        
        <InterestSelector 
          selectedInterests={preferences.interests}
          onChange={handleInterestsChange}
        />
      </Box>
      
      <Divider sx={{ my: 3 }} />
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Transportation
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          How do you prefer to get around while traveling?
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={preferences.transportationPreference.publicTransport}
                  onChange={handleCheckboxChange}
                  name="transportation.publicTransport"
                />
              }
              label="Public Transportation"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={preferences.transportationPreference.car}
                  onChange={handleCheckboxChange}
                  name="transportation.car"
                />
              }
              label="Car/Taxi"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={preferences.transportationPreference.walking}
                  onChange={handleCheckboxChange}
                  name="transportation.walking"
                />
              }
              label="Walking"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={preferences.transportationPreference.cycling}
                  onChange={handleCheckboxChange}
                  name="transportation.cycling"
                />
              }
              label="Cycling"
            />
          </Grid>
        </Grid>
      </Box>
      
      <Divider sx={{ my: 3 }} />
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Additional Preferences
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={preferences.accessibility}
                  onChange={handleCheckboxChange}
                  name="accessibility"
                />
              }
              label="Accessibility requirements"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={preferences.childFriendly}
                  onChange={handleCheckboxChange}
                  name="childFriendly"
                />
              }
              label="Family-friendly (with children)"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={preferences.avoidCrowds}
                  onChange={handleCheckboxChange}
                  name="avoidCrowds"
                />
              }
              label="Avoid crowded places"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={preferences.prioritizeSustainability}
                  onChange={handleCheckboxChange}
                  name="prioritizeSustainability"
                />
              }
              label="Prioritize eco-friendly options"
            />
          </Grid>
        </Grid>
      </Box>
      
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Preferences'}
        </Button>
      </Box>
    </Paper>
  );
};

export default PreferenceForm;
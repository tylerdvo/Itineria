import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Stepper, 
  Step, 
  StepLabel, 
  Button, 
  Box, 
  Typography, 
  Paper,
  Container,
  Divider,
  IconButton
} from '@mui/material';
import ItineraryBuilder from '../components/itinerary/ItineraryBuilder';
import PreferenceForm from '../components/preferences/PreferenceForm';
import ItineraryView from '../components/itinerary/ItineraryView';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckIcon from '@mui/icons-material/Check';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const ItineraryPlanner = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [itineraryData, setItineraryData] = useState({
    activities: [],
    preferences: {}
  });
  const navigate = useNavigate();

  // Check if there's an activity to edit from the dashboard
  useEffect(() => {
    const editActivityData = sessionStorage.getItem('editActivity');
    
    if (editActivityData) {
      try {
        const activityToEdit = JSON.parse(editActivityData);
        // Set edit mode to true
        setEditMode(true);
        // Add the activity to edit to the itinerary data
        setItineraryData(prev => ({
          ...prev,
          activities: [activityToEdit]
        }));
        // Clear the session storage item
        sessionStorage.removeItem('editActivity');
      } catch (error) {
        console.error('Failed to parse activity to edit:', error);
      }
    }
  }, []);

  const steps = ['Build Itinerary', 'Set Preferences', 'Review'];

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleFinish = () => {
    // Here you could navigate to dashboard or perform other actions
    alert('Itinerary created successfully!');
    // Navigate to dashboard
    navigate('/dashboard');
  };

  const handleBackToDashboard = () => {
    // Navigate back to dashboard
    navigate('/dashboard');
  };

  const updateActivities = (activities) => {
    setItineraryData((prev) => ({ ...prev, activities }));
  };

  const updatePreferences = (preferences) => {
    // Log to confirm preferences are received
    console.log("Received preferences in ItineraryPlanner:", preferences);
    setItineraryData((prev) => ({ ...prev, preferences }));
  };

  const canProceed = () => {
    // Check if user can proceed to next step
    if (activeStep === 0) {
      return itineraryData.activities.length > 0;
    }
    return true;
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <ItineraryBuilder
            onActivityAdded={updateActivities}
            initialActivities={itineraryData.activities}
            onNext={handleNext}
            editMode={editMode}
          />
        );
      case 1:
        return (
          <PreferenceForm 
            onSave={updatePreferences} 
            existingPreferences={itineraryData.preferences}
          />
        );
      case 2:
        return <ItineraryView itineraryData={itineraryData} />;
      default:
        return <Typography>Unknown Step</Typography>;
    }
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={2} sx={{ p: 4, my: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h4" color="primary">
            Plan Your Trip
          </Typography>
          <IconButton 
            onClick={handleBackToDashboard} 
            aria-label="back to dashboard"
            sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
          >
            <KeyboardBackspaceIcon /> 
            <Typography variant="button" sx={{ ml: 1 }}>Back to Dashboard</Typography>
          </IconButton>
        </Box>
        <Divider sx={{ mb: 4 }} />
        
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 4 }}>{renderStepContent(activeStep)}</Box>

        {/* Only show bottom navigation buttons for steps 1 and 2 */}
        {(activeStep === 1 || activeStep === 2) && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button 
              startIcon={<ArrowBackIcon />}
              onClick={handleBack}
            >
              Back
            </Button>
            
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleFinish}
                endIcon={<CheckIcon />}
                sx={{ px: 4 }}
              >
                Finish
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                endIcon={<ArrowForwardIcon />}
                sx={{ px: 4 }}
                disabled={!canProceed()}
              >
                Next
              </Button>
            )}
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default ItineraryPlanner;
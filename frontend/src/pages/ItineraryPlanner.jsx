import React, { useState, useEffect } from 'react';
import { 
  Box, Container, Typography, Stepper, Step, StepLabel, 
  Button, CircularProgress, Paper, Grid, Alert, Divider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckIcon from '@mui/icons-material/Check';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useItinerary } from '../hooks/useItinerary';
import ItineraryBuilder from '../components/itinerary/ItineraryBuilder';
import PreferenceForm from '../components/preferences/PreferenceForm';

const steps = ['Choose Destinations', 'Set Preferences', 'Generate Itinerary', 'Customize & Finalize'];

const ItineraryPlanner = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // For editing existing itineraries
  const { user } = useAuth();
  const { 
    getItinerary, 
    getUserPreferences, 
    createItinerary, 
    updateItinerary, 
    generateItinerary,
    loading, 
    error 
  } = useItinerary();
  
  const [activeStep, setActiveStep] = useState(0);
  const [itineraryData, setItineraryData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    destinations: [''],
    activities: []
  });
  const [userPreferences, setUserPreferences] = useState(null);
  const [generatedItinerary, setGeneratedItinerary] = useState(null);
  const [processingItinerary, setProcessingItinerary] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchPreferences = async () => {
      if (user) {
        try {
          const preferences = await getUserPreferences(user.id);
          setUserPreferences(preferences);
        } catch (err) {
          console.error('Failed to fetch user preferences:', err);
        }
      }
    };

    const fetchItinerary = async () => {
      if (id) {
        try {
          const data = await getItinerary(id);
          setItineraryData(data);
          setIsEditing(true);
        } catch (err) {
          console.error('Failed to fetch itinerary:', err);
        }
      }
    };

    fetchPreferences();
    if (id) {
      fetchItinerary();
    }
  }, [user, id, getItinerary, getUserPreferences]);

  const handleNext = () => {
    // Validation would go here
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    // If moving to the generate step, trigger AI generation
    if (activeStep === 1) {
      handleGenerateItinerary();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleGenerateItinerary = async () => {
    setProcessingItinerary(true);
    setAiMessage('Analyzing your preferences...');
    
    // Simulate AI processing steps with messages
    setTimeout(() => setAiMessage('Researching destinations...'), 2000);
    setTimeout(() => setAiMessage('Finding the best activities...'), 4000);
    setTimeout(() => setAiMessage('Optimizing your schedule...'), 6000);
    
    try {
      // This would be a real API call in production
      const generated = await generateItinerary({
        destinations: itineraryData.destinations,
        startDate: itineraryData.startDate,
        endDate: itineraryData.endDate,
        preferences: userPreferences
      });
      
      setGeneratedItinerary(generated);
      
      // Update our itinerary data with the AI-generated content
      setItineraryData(prevData => ({
        ...prevData,
        activities: generated.activities || [],
        // Other fields that the AI might have enhanced
      }));
      
      setAiMessage('Itinerary successfully generated!');
    } catch (err) {
      console.error('Failed to generate itinerary:', err);
      setAiMessage('Error generating itinerary. Please try again.');
    } finally {
      setProcessingItinerary(false);
    }
  };

  const handleSaveItinerary = async () => {
    try {
      if (isEditing) {
        await updateItinerary(id, itineraryData);
      } else {
        const savedItinerary = await createItinerary({
          ...itineraryData,
          userId: user.id
        });
        navigate(`/itinerary/${savedItinerary.id}`);
      }
    } catch (err) {
      console.error('Failed to save itinerary:', err);
    }
  };

  const handleItineraryChange = (updatedData) => {
    setItineraryData(prevData => ({
      ...prevData,
      ...updatedData
    }));
  };

  const handlePreferencesSave = (preferences) => {
    setUserPreferences(preferences);
    handleNext();
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        // Basic itinerary information and destinations
        return (
          <ItineraryBuilder 
            itinerary={itineraryData}
            onChange={handleItineraryChange}
            step="basic" // To control which part of the form to show
          />
        );
      case 1:
        // User preferences
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Your Travel Preferences
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              Tell us about your travel style to personalize your itinerary.
            </Typography>
            
            <PreferenceForm 
              onSave={handlePreferencesSave}
              existingPreferences={userPreferences}
            />
          </Box>
        );
      case 2:
        // AI Generation step
        return (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h5" gutterBottom>
              {processingItinerary ? 'Creating Your Perfect Itinerary' : 'Itinerary Generated'}
            </Typography>
            
            {processingItinerary ? (
              <Box>
                <CircularProgress size={60} sx={{ my: 3 }} />
                <Typography variant="body1" sx={{ mt: 2 }}>
                  {aiMessage}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 4 }}>
                  This may take a minute as our AI crafts a personalized experience for you.
                </Typography>
              </Box>
            ) : (
              <Box>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    color: 'success.main',
                    my: 3
                  }}
                >
                  <CheckIcon sx={{ fontSize: 60 }} />
                </Box>
                
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Your itinerary is ready!
                </Typography>
                
                <Typography variant="body1" paragraph>
                  We've created an itinerary with {itineraryData.activities.length} activities
                  based on your preferences.
                </Typography>
                
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={handleNext}
                  sx={{ mt: 2 }}
                >
                  Review & Customize
                </Button>
              </Box>
            )}
          </Box>
        );
      case 3:
        // Customization step
        return (
          <ItineraryBuilder 
            itinerary={itineraryData}
            onChange={handleItineraryChange}
            step="activities" // To show the activities part of the form
          />
        );
      default:
        return 'Unknown step';
    }
  };

  if (loading && !processingItinerary) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 4, my: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          {isEditing ? 'Edit Itinerary' : 'Create Your Travel Itinerary'}
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
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            startIcon={<ArrowBackIcon />}
          >
            Back
          </Button>
          
          <Box>
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveItinerary}
                startIcon={<CheckIcon />}
                disabled={loading}
              >
                {isEditing ? 'Update Itinerary' : 'Save Itinerary'}
              </Button>
            ) : (
              activeStep === 1 ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleGenerateItinerary}
                  startIcon={<AutoFixHighIcon />}
                  disabled={processingItinerary}
                >
                  Generate with AI
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  endIcon={<ArrowForwardIcon />}
                  disabled={processingItinerary || (activeStep === 0 && (!itineraryData.destinations[0] || !itineraryData.startDate || !itineraryData.endDate))}
                >
                  {activeStep === 2 ? 'Customize' : 'Next'}
                </Button>
              )
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ItineraryPlanner;
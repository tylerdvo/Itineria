import React, { useState, useEffect } from 'react';
import { 
  Box, Container, Typography, Grid, Paper, Button, 
  Card, CardContent, CardActions, Divider, Tabs, Tab,
  CircularProgress, Chip, Avatar, IconButton, Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import ExploreIcon from '@mui/icons-material/Explore';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TuneIcon from '@mui/icons-material/Tune';
import { useAuth } from '../hooks/useAuth';
import { useItinerary } from '../hooks/useItinerary';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getUserItineraries, error, loading } = useItinerary();
  const [itineraries, setItineraries] = useState({
    upcoming: [],
    past: [],
    saved: []
  });
  const [tabValue, setTabValue] = useState(0);
  const [loadingPreferences, setLoadingPreferences] = useState(false);
  const [preferencesComplete, setPreferencesComplete] = useState(false);

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const data = await getUserItineraries(user.id);
        
        // Sort and categorize itineraries
        const now = new Date();
        const upcoming = [];
        const past = [];
        const saved = [];
        
        data.forEach(itinerary => {
          const endDate = new Date(itinerary.endDate);
          if (itinerary.isFavorite) {
            saved.push(itinerary);
          } else if (endDate < now) {
            past.push(itinerary);
          } else {
            upcoming.push(itinerary);
          }
        });
        
        setItineraries({
          upcoming,
          past,
          saved
        });
      } catch (err) {
        console.error('Failed to fetch itineraries:', err);
      }
    };

    // Check if user has completed preferences
    const checkPreferences = async () => {
      setLoadingPreferences(true);
      try {
        // This would normally be an API call
        // const response = await getUserPreferences(user.id);
        // setPreferencesComplete(response && Object.keys(response).length > 0);
        
        // Mock for now
        setPreferencesComplete(true);
      } catch (err) {
        console.error('Failed to fetch preferences:', err);
      } finally {
        setLoadingPreferences(false);
      }
    };

    if (user) {
      fetchItineraries();
      checkPreferences();
    }
  }, [user, getUserItineraries]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleCreateItinerary = () => {
    navigate('/itinerary/new');
  };

  const handleViewItinerary = (id) => {
    navigate(`/itinerary/${id}`);
  };

  const handleEditPreferences = () => {
    navigate('/preferences');
  };

  // Welcome section with quick actions
  const WelcomeSection = () => (
    <Paper sx={{ p: 4, mb: 4, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Welcome back, {user?.name || 'Traveler'}!
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            {itineraries.upcoming.length > 0 
              ? `You have ${itineraries.upcoming.length} upcoming trip${itineraries.upcoming.length !== 1 ? 's' : ''}.` 
              : 'Ready to plan your next adventure?'}
          </Typography>
        </Box>
        
        <Box sx={{ mt: { xs: 2, sm: 0 } }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            size="large"
            onClick={handleCreateItinerary}
          >
            Create New Itinerary
          </Button>
        </Box>
      </Box>
      
      {!preferencesComplete && !loadingPreferences && (
        <Alert 
          severity="info" 
          action={
            <Button color="inherit" size="small" onClick={handleEditPreferences}>
              Set Now
            </Button>
          }
          sx={{ mt: 2 }}
        >
          Complete your travel preferences to get personalized recommendations
        </Alert>
      )}
    </Paper>
  );

  // Itinerary card component
  const ItineraryCard = ({ itinerary }) => {
    const startDate = new Date(itinerary.startDate).toLocaleDateString();
    const endDate = new Date(itinerary.endDate).toLocaleDateString();
    
    return (
      <Card 
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 3
          }
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Typography variant="h6" component="h3" gutterBottom>
              {itinerary.title}
            </Typography>
            <IconButton size="small">
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <AccessTimeIcon fontSize="small" color="action" sx={{ mr: 1 }} />
            <Typography variant="body2" color="textSecondary">
              {startDate} - {endDate}
            </Typography>
          </Box>
          
          <Box sx={{ mb: 2 }}>
            {itinerary.destinations.slice(0, 3).map((destination, index) => (
              <Chip 
                key={index} 
                label={destination} 
                size="small" 
                sx={{ mr: 0.5, mb: 0.5 }} 
              />
            ))}
            {itinerary.destinations.length > 3 && (
              <Chip 
                label={`+${itinerary.destinations.length - 3} more`} 
                size="small" 
                variant="outlined"
                sx={{ mb: 0.5 }}
              />
            )}
          </Box>
          
          <Typography variant="body2" color="textSecondary">
            {itinerary.activities?.length || 0} activities planned
          </Typography>
        </CardContent>
        
        <CardActions sx={{ justifyContent: 'space-between', padding: 2, pt: 0 }}>
          <Button 
            size="small" 
            startIcon={<ExploreIcon />}
            onClick={() => handleViewItinerary(itinerary.id)}
          >
            View
          </Button>
          <IconButton size="small" color={itinerary.isFavorite ? "primary" : "default"}>
            <FavoriteIcon fontSize="small" />
          </IconButton>
        </CardActions>
      </Card>
    );
  };

  // Content for each tab
  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
    
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`itinerary-tabpanel-${index}`}
        aria-labelledby={`itinerary-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ py: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  };

  // Empty state component
  const EmptyState = ({ message, actionText, onAction }) => (
    <Box sx={{ textAlign: 'center', py: 6 }}>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        {message}
      </Typography>
      {actionText && onAction && (
        <Button 
          variant="outlined" 
          color="primary" 
          onClick={onAction}
          sx={{ mt: 2 }}
        >
          {actionText}
        </Button>
      )}
    </Box>
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <WelcomeSection />
      
      <Box sx={{ mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="itinerary tabs"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Upcoming Trips" id="itinerary-tab-0" />
            <Tab label="Past Trips" id="itinerary-tab-1" />
            <Tab label="Saved Itineraries" id="itinerary-tab-2" />
          </Tabs>
        </Box>
        
        <TabPanel value={tabValue} index={0}>
          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
          
          {itineraries.upcoming.length > 0 ? (
            <Grid container spacing={3}>
              {itineraries.upcoming.map((itinerary) => (
                <Grid item key={itinerary.id} xs={12} sm={6} md={4}>
                  <ItineraryCard itinerary={itinerary} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <EmptyState 
              message="You don't have any upcoming trips planned yet"
              actionText="Create an Itinerary"
              onAction={handleCreateItinerary}
            />
          )}
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          {itineraries.past.length > 0 ? (
            <Grid container spacing={3}>
              {itineraries.past.map((itinerary) => (
                <Grid item key={itinerary.id} xs={12} sm={6} md={4}>
                  <ItineraryCard itinerary={itinerary} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <EmptyState 
              message="You haven't completed any trips yet"
            />
          )}
        </TabPanel>
        
        <TabPanel value={tabValue} index={2}>
          {itineraries.saved.length > 0 ? (
            <Grid container spacing={3}>
              {itineraries.saved.map((itinerary) => (
                <Grid item key={itinerary.id} xs={12} sm={6} md={4}>
                  <ItineraryCard itinerary={itinerary} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <EmptyState 
              message="You haven't saved any itineraries yet"
            />
          )}
        </TabPanel>
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<TuneIcon />}
          onClick={handleEditPreferences}
        >
          Update Travel Preferences
        </Button>
      </Box>
    </Container>
  );
};

export default Dashboard;
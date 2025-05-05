import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import itineraryService from '../services/itineraryService';
import { 
  Typography, 
  Box, 
  Grid, 
  Paper, 
  Button, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActions,
  Divider,
  CircularProgress,
  Stack,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import AddIcon from '@mui/icons-material/Add';
import ExploreIcon from '@mui/icons-material/Explore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        setLoading(true);
        
        if (!user || !user._id) {
          throw new Error('User not authenticated');
        }

        const data = await itineraryService.getActivities(user._id);
        setActivities(data);
      } catch (err) {
        console.error('Failed to fetch itineraries:', err);
        
        // Don't show error for 404 - it's expected for new users
        if (err.response && err.response.status !== 404) {
          setError('Failed to load your itineraries. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchItineraries();
  }, [user]);

  const handleMenuClick = (event, activity) => {
    setAnchorEl(event.currentTarget);
    setSelectedActivity(activity);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditActivity = () => {
    handleMenuClose();
    // Store the activity to edit in sessionStorage
    sessionStorage.setItem('editActivity', JSON.stringify(selectedActivity));
    // Navigate to planner page - use the correct route
    navigate('/planner');
  };

  const handleCreateNewItinerary = () => {
    // Clear any previous edit activity data
    sessionStorage.removeItem('editActivity');
    // Navigate to planner page - use the correct route
    navigate('/planner');
  };

  const handleDeleteClick = () => {
    handleMenuClose();
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      // Call API to delete activity
      await itineraryService.deleteActivity(user._id, selectedActivity._id);
      
      // Update local state
      setActivities(activities.filter(activity => activity._id !== selectedActivity._id));
      
      // Close dialog
      setDeleteDialogOpen(false);
    } catch (err) {
      console.error('Failed to delete activity:', err);
      setError('Failed to delete activity. Please try again.');
      setDeleteDialogOpen(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  // Render empty state for new users
  const renderEmptyState = () => (
    <Box sx={{ mt: 4, mb: 6 }}>
      <Paper 
        elevation={2} 
        sx={{ 
          p: 4, 
          mb: 4, 
          borderRadius: 2,
          textAlign: 'center',
          background: 'linear-gradient(to right, #f5f7fa, #e4e7eb)'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <TravelExploreIcon sx={{ fontSize: 80, color: 'primary.main', opacity: 0.8 }} />
        </Box>
        <Typography variant="h5" gutterBottom color="primary">
          Ready to plan your adventure?
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          You haven't created any itineraries yet. Start by creating your first travel plan!
        </Typography>
        <Button 
          variant="contained" 
          size="large" 
          startIcon={<AddIcon />}
          onClick={handleCreateNewItinerary}
          sx={{ mt: 2, px: 4, py: 1.5 }}
        >
          Create New Itinerary
        </Button>
      </Paper>

      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Explore Travel Ideas
      </Typography>
      
      <Grid container spacing={3}>
        {popularDestinations.map((destination) => (
          <Grid item xs={12} sm={6} md={4} key={destination.id}>
            <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="140"
                image={destination.image}
                alt={destination.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div">
                  {destination.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {destination.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  startIcon={<ExploreIcon />}
                  onClick={handleCreateNewItinerary}
                >
                  Explore
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  // Render activities when user has them
  const renderActivities = () => (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Your Itinerary Activities
      </Typography>
      
      <Grid container spacing={2}>
        {activities.map((activity, index) => (
          <Grid item xs={12} sm={6} md={4} key={activity._id || index}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 2,
                position: 'relative',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6
                }
              }}
            >
              {/* Menu button */}
              <IconButton 
                size="small" 
                sx={{ position: 'absolute', top: 8, right: 8 }}
                onClick={(e) => handleMenuClick(e, activity)}
              >
                <MoreVertIcon fontSize="small" />
              </IconButton>

              <Typography variant="subtitle1" gutterBottom><strong>{activity.title}</strong></Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {activity.description || 'No description'}
              </Typography>
              <Box sx={{ display: 'flex', mt: 2 }}>
                <Box sx={{ mr: 3 }}>
                  <Typography variant="caption" color="text.secondary">DAY</Typography>
                  <Typography variant="body2"><strong>{activity.day}</strong></Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">TIME</Typography>
                  <Typography variant="body2"><strong>{activity.time || 'Not specified'}</strong></Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={handleCreateNewItinerary}
        >
          Create New Itinerary
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box p={3}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <FlightTakeoffIcon sx={{ fontSize: 32, mr: 2, color: 'primary.main' }} />
        <Typography variant="h4" gutterBottom>
          Welcome back{user && user.name ? `, ${user.name}` : ''}!
        </Typography>
      </Box>
      
      <Divider sx={{ mb: 3 }} />
      
      {error && (
        <Paper elevation={0} sx={{ p: 2, mb: 3, bgcolor: 'error.light', color: 'error.contrastText' }}>
          <Typography>{error}</Typography>
        </Paper>
      )}
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <Stack direction="column" spacing={2} alignItems="center">
            <CircularProgress />
            <Typography color="text.secondary">Loading your itineraries...</Typography>
          </Stack>
        </Box>
      ) : (
        activities.length > 0 ? renderActivities() : renderEmptyState()
      )}

      {/* Activity Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditActivity}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDeleteClick}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>Delete Activity</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this activity? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// Sample placeholder data for popular destinations
const popularDestinations = [
  {
    id: 'paris',
    name: 'Paris, France',
    description: 'Explore the City of Light with its iconic Eiffel Tower, world-class museums, and charming cafés.',
    image: '/api/placeholder/400/240',
  },
  {
    id: 'tokyo',
    name: 'Tokyo, Japan',
    description: 'Experience the perfect blend of traditional culture and futuristic technology in this vibrant metropolis.',
    image: '/api/placeholder/400/240',
  },
  {
    id: 'bali',
    name: 'Bali, Indonesia',
    description: 'Discover paradise with stunning beaches, lush rice terraces, and spiritual temples.',
    image: '/api/placeholder/400/240',
  }
];

export default Dashboard;
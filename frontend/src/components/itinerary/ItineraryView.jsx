import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Divider, 
  Chip,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardHeader,
  CardContent,
  Avatar
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import DirectionsTransitIcon from '@mui/icons-material/DirectionsTransit';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HotelIcon from '@mui/icons-material/Hotel';
import SpeedIcon from '@mui/icons-material/Speed';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import StyleIcon from '@mui/icons-material/Style';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import AccessibleIcon from '@mui/icons-material/Accessible';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import PeopleIcon from '@mui/icons-material/People';
import NatureIcon from '@mui/icons-material/Nature';

const ItineraryView = ({ itineraryData }) => {
  const { activities = [], preferences = {} } = itineraryData || {};

  // Group activities by day
  const groupActivitiesByDay = () => {
    const grouped = {};
    
    if (Array.isArray(activities)) {
      activities.forEach(activity => {
        const day = activity.day || 1;
        if (!grouped[day]) {
          grouped[day] = [];
        }
        grouped[day].push(activity);
      });
    }
    
    return grouped;
  };

  const groupedActivities = groupActivitiesByDay();
  const days = Object.keys(groupedActivities).sort((a, b) => a - b);

  // Preference display helpers
  const formatTravelStyle = (style) => {
    const styleMap = {
      'adventurous': 'Adventurous',
      'relaxed': 'Relaxed',
      'cultural': 'Cultural',
      'luxury': 'Luxury',
      'balanced': 'Balanced'
    };
    return styleMap[style] || style;
  };

  const formatBudget = (budget) => {
    const budgetMap = {
      'budget': 'Budget-friendly',
      'medium': 'Medium',
      'luxury': 'Luxury'
    };
    return budgetMap[budget] || budget;
  };

  const formatFoodPreference = (pref) => {
    const prefMap = {
      'local': 'Local Cuisine',
      'international': 'International Cuisine',
      'vegetarian': 'Vegetarian',
      'vegan': 'Vegan',
      'no_preference': 'No Specific Preference'
    };
    return prefMap[pref] || pref;
  };

  const formatAccommodationType = (type) => {
    const typeMap = {
      'hotel': 'Hotels',
      'hostel': 'Hostels',
      'apartment': 'Apartments/Rentals',
      'resort': 'Resorts',
      'camping': 'Camping/Outdoor'
    };
    return typeMap[type] || type;
  };

  const getTransportationString = (transportPrefs) => {
    if (!transportPrefs || typeof transportPrefs !== 'object') {
      return 'Not specified';
    }
    
    const options = [];
    if (transportPrefs.publicTransport) options.push('Public Transport');
    if (transportPrefs.car) options.push('Car/Taxi');
    if (transportPrefs.walking) options.push('Walking');
    if (transportPrefs.cycling) options.push('Cycling');
    
    return options.length > 0 ? options.join(', ') : 'Not specified';
  };

  const formatBoolean = (value) => value ? 'Yes' : 'No';

  // Render the interests in a more compact way
  const renderInterests = (interests) => {
    if (!interests || !Array.isArray(interests) || interests.length === 0) {
      return <Typography variant="body2" color="text.secondary">None selected</Typography>;
    }
    
    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
        {interests.map((interest, index) => (
          <Chip 
            key={index} 
            label={interest} 
            size="small" 
            variant="outlined" 
            color="primary"
            sx={{ m: 0.5 }}
          />
        ))}
      </Box>
    );
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <TravelExploreIcon sx={{ fontSize: 32, mr: 2, color: 'primary.main' }} />
        <Typography variant="h4">Your Itinerary</Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Left Column - Trip Overview and Schedule */}
        <Grid item xs={12} md={7}>
          <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
            <Typography variant="h5" color="primary" gutterBottom>
              Trip Overview
            </Typography>
            <Typography variant="body1">
              Your itinerary spans {days.length} {days.length === 1 ? 'day' : 'days'} with {activities.length} {activities.length === 1 ? 'activity' : 'activities'}.
            </Typography>
          </Paper>
          
          <Typography variant="h5" gutterBottom>
            Daily Schedule
          </Typography>
          
          {days.length === 0 ? (
            <Paper elevation={1} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body1">No activities added to your itinerary yet.</Typography>
            </Paper>
          ) : (
            <>
              {days.map(day => (
                <Paper key={day} elevation={2} sx={{ mb: 3, overflow: 'hidden', borderRadius: 2 }}>
                  <Box 
                    sx={{ 
                      bgcolor: 'primary.main', 
                      color: 'primary.contrastText', 
                      py: 1.5, 
                      px: 3 
                    }}
                  >
                    <Typography variant="h6">Day {day}</Typography>
                  </Box>
                  
                  <List sx={{ py: 0 }}>
                    {groupedActivities[day]
                      .sort((a, b) => {
                        // Safely handle time strings
                        if (!a.time || !b.time) return 0;
                        
                        try {
                          // Convert time strings to comparable values
                          const aHour = parseInt(a.time.split(':')[0]) || 0;
                          const bHour = parseInt(b.time.split(':')[0]) || 0;
                          
                          // Check if AM/PM
                          const aIsPM = a.time.includes('PM') && !a.time.includes('12:');
                          const bIsPM = b.time.includes('PM') && !b.time.includes('12:');
                          
                          // Convert to 24-hour format for comparison
                          const aHour24 = aIsPM ? aHour + 12 : aHour;
                          const bHour24 = bIsPM ? bHour + 12 : bHour;
                          
                          return aHour24 - bHour24;
                        } catch (error) {
                          return 0;
                        }
                      })
                      .map((activity, index) => (
                        <React.Fragment key={activity._id || index}>
                          <ListItem sx={{ py: 2 }}>
                            <ListItemIcon>
                              <AccessTimeIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography variant="subtitle1">{activity.title}</Typography>
                              }
                              secondary={
                                <Box>
                                  <Typography variant="body2" color="text.secondary">
                                    {activity.time || 'Time not specified'}
                                  </Typography>
                                  {activity.description && (
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                      {activity.description}
                                    </Typography>
                                  )}
                                </Box>
                              }
                            />
                          </ListItem>
                          {index < groupedActivities[day].length - 1 && (
                            <Divider variant="inset" component="li" />
                          )}
                        </React.Fragment>
                      ))}
                  </List>
                </Paper>
              ))}
            </>
          )}
        </Grid>
        
        {/* Right Column - Preferences and Activity Summary */}
        <Grid item xs={12} md={5}>
          {/* Preferences Section */}
          <Typography variant="h5" gutterBottom>
            Your Preferences
          </Typography>
          
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {/* Travel Style & Budget */}
            <Grid item xs={12} sm={6} md={12} lg={6}>
              <Card variant="outlined">
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <StyleIcon />
                    </Avatar>
                  }
                  title="Travel Style"
                  subheader={formatTravelStyle(preferences.travelStyle)}
                />
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={12} lg={6}>
              <Card variant="outlined">
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <AccountBalanceWalletIcon />
                    </Avatar>
                  }
                  title="Budget"
                  subheader={formatBudget(preferences.budget)}
                />
              </Card>
            </Grid>
            
            {/* Pace & Food */}
            <Grid item xs={12} sm={6} md={12} lg={6}>
              <Card variant="outlined">
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <SpeedIcon />
                    </Avatar>
                  }
                  title="Pace"
                  subheader={preferences.pace ? `${preferences.pace}/5` : 'Not specified'}
                />
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={12} lg={6}>
              <Card variant="outlined">
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <RestaurantIcon />
                    </Avatar>
                  }
                  title="Food Preference"
                  subheader={formatFoodPreference(preferences.foodPreference)}
                />
              </Card>
            </Grid>
            
            {/* Accommodation & Transportation */}
            <Grid item xs={12} sm={6} md={12} lg={6}>
              <Card variant="outlined">
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <HotelIcon />
                    </Avatar>
                  }
                  title="Accommodation Type"
                  subheader={formatAccommodationType(preferences.accommodationType)}
                />
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={12} lg={6}>
              <Card variant="outlined">
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <DirectionsTransitIcon />
                    </Avatar>
                  }
                  title="Transportation"
                  subheader={getTransportationString(preferences.transportationPreference)}
                />
              </Card>
            </Grid>
            
            {/* Interests */}
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <LocalActivityIcon />
                    </Avatar>
                  }
                  title="Interests"
                />
                <CardContent sx={{ pt: 0 }}>
                  {renderInterests(preferences.interests)}
                </CardContent>
              </Card>
            </Grid>
            
            {/* Additional Preferences */}
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardHeader
                  title="Additional Preferences"
                />
                <CardContent sx={{ pt: 0 }}>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <AccessibleIcon sx={{ mr: 1, color: 'primary.main', fontSize: 20 }} />
                        <Typography variant="body2">
                          Accessibility: {formatBoolean(preferences.accessibility)}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <FamilyRestroomIcon sx={{ mr: 1, color: 'primary.main', fontSize: 20 }} />
                        <Typography variant="body2">
                          Child Friendly: {formatBoolean(preferences.childFriendly)}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <PeopleIcon sx={{ mr: 1, color: 'primary.main', fontSize: 20 }} />
                        <Typography variant="body2">
                          Avoid Crowds: {formatBoolean(preferences.avoidCrowds)}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <NatureIcon sx={{ mr: 1, color: 'primary.main', fontSize: 20 }} />
                        <Typography variant="body2">
                          Sustainability: {formatBoolean(preferences.prioritizeSustainability)}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          
          {/* Activity Summary */}
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Activity Summary
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FormatListBulletedIcon color="primary" sx={{ mr: 1 }} />
                  <Box>
                    <Typography variant="subtitle2">Total Activities</Typography>
                    <Typography variant="h6">{activities.length}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <EventIcon color="primary" sx={{ mr: 1 }} />
                  <Box>
                    <Typography variant="subtitle2">Trip Duration</Typography>
                    <Typography variant="h6">{days.length} days</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ItineraryView;
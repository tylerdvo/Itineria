import React from 'react';
import { Box, Chip, Typography, Grid } from '@mui/material';
// Import icons for interest categories
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import MuseumIcon from '@mui/icons-material/Museum';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import NaturePeopleIcon from '@mui/icons-material/NaturePeople';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import PaletteIcon from '@mui/icons-material/Palette';
import SportsIcon from '@mui/icons-material/Sports';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import NightlifeIcon from '@mui/icons-material/Nightlife';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';

const InterestSelector = ({ selectedInterests = [], onChange }) => {
  // Define all available interests with their icons
  const interests = [
    { id: 'sightseeing', name: 'Sightseeing', icon: <LocalActivityIcon /> },
    { id: 'museums', name: 'Museums & Galleries', icon: <MuseumIcon /> },
    { id: 'food', name: 'Food & Dining', icon: <RestaurantIcon /> },
    { id: 'nature', name: 'Nature & Outdoors', icon: <NaturePeopleIcon /> },
    { id: 'shopping', name: 'Shopping', icon: <ShoppingBagIcon /> },
    { id: 'beaches', name: 'Beaches', icon: <BeachAccessIcon /> },
    { id: 'arts', name: 'Arts & Culture', icon: <PaletteIcon /> },
    { id: 'sports', name: 'Sports & Recreation', icon: <SportsIcon /> },
    { id: 'photography', name: 'Photography', icon: <PhotoCameraIcon /> },
    { id: 'nightlife', name: 'Nightlife', icon: <NightlifeIcon /> },
    { id: 'history', name: 'History', icon: <AccountBalanceIcon /> },
    { id: 'hiking', name: 'Hiking & Trekking', icon: <DirectionsWalkIcon /> },
    { id: 'adventure', name: 'Adventure', icon: <AirplaneTicketIcon /> }
  ];

  const handleToggle = (interestId) => {
    let newSelected = [...selectedInterests];
    
    if (newSelected.includes(interestId)) {
      // Remove if already selected
      newSelected = newSelected.filter(id => id !== interestId);
    } else {
      // Add if not already selected
      newSelected.push(interestId);
    }
    
    onChange(newSelected);
  };

  // Group interests by category
  const culturalInterests = interests.filter(i => 
    ['museums', 'arts', 'history'].includes(i.id)
  );
  
  const outdoorInterests = interests.filter(i => 
    ['nature', 'beaches', 'hiking', 'adventure', 'sports'].includes(i.id)
  );
  
  const leisureInterests = interests.filter(i => 
    ['shopping', 'food', 'nightlife', 'sightseeing', 'photography'].includes(i.id)
  );

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="subtitle2" gutterBottom>
            Cultural
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {culturalInterests.map((interest) => (
              <Chip
                key={interest.id}
                icon={interest.icon}
                label={interest.name}
                onClick={() => handleToggle(interest.id)}
                color={selectedInterests.includes(interest.id) ? "primary" : "default"}
                variant={selectedInterests.includes(interest.id) ? "filled" : "outlined"}
                sx={{ m: 0.5 }}
              />
            ))}
          </Box>
        </Grid>
        
        <Grid item xs={12}>
          <Typography variant="subtitle2" gutterBottom>
            Outdoors & Adventure
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {outdoorInterests.map((interest) => (
              <Chip
                key={interest.id}
                icon={interest.icon}
                label={interest.name}
                onClick={() => handleToggle(interest.id)}
                color={selectedInterests.includes(interest.id) ? "primary" : "default"}
                variant={selectedInterests.includes(interest.id) ? "filled" : "outlined"}
                sx={{ m: 0.5 }}
              />
            ))}
          </Box>
        </Grid>
        
        <Grid item xs={12}>
          <Typography variant="subtitle2" gutterBottom>
            Leisure & Entertainment
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {leisureInterests.map((interest) => (
              <Chip
                key={interest.id}
                icon={interest.icon}
                label={interest.name}
                onClick={() => handleToggle(interest.id)}
                color={selectedInterests.includes(interest.id) ? "primary" : "default"}
                variant={selectedInterests.includes(interest.id) ? "filled" : "outlined"}
                sx={{ m: 0.5 }}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InterestSelector;
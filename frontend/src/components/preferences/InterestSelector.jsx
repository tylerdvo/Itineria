import React, { useState } from 'react';
import { 
  Box, Chip, Typography, TextField, Paper,
  Grid, Autocomplete
} from '@mui/material';
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

// Pre-defined list of common travel interests with icons
const interestOptions = [
  { name: 'Cultural', icon: <MuseumIcon fontSize="small" /> },
  { name: 'Culinary', icon: <RestaurantIcon fontSize="small" /> },
  { name: 'Nature', icon: <NaturePeopleIcon fontSize="small" /> },
  { name: 'Shopping', icon: <ShoppingBagIcon fontSize="small" /> },
  { name: 'Beach', icon: <BeachAccessIcon fontSize="small" /> },
  { name: 'Art', icon: <PaletteIcon fontSize="small" /> },
  { name: 'Sports', icon: <SportsIcon fontSize="small" /> },
  { name: 'Photography', icon: <PhotoCameraIcon fontSize="small" /> },
  { name: 'Nightlife', icon: <NightlifeIcon fontSize="small" /> },
  { name: 'History', icon: <AccountBalanceIcon fontSize="small" /> },
  { name: 'Hiking', icon: <DirectionsWalkIcon fontSize="small" /> },
  { name: 'Adventure', icon: <LocalActivityIcon fontSize="small" /> },
  { name: 'Architecture', icon: <AccountBalanceIcon fontSize="small" /> },
  { name: 'Local Experiences', icon: <AirplaneTicketIcon fontSize="small" /> },
];

const InterestSelector = ({ selectedInterests = [], onChange }) => {
  const [customInterest, setCustomInterest] = useState('');

  const handleToggleInterest = (interest) => {
    const currentIndex = selectedInterests.indexOf(interest);
    const newSelectedInterests = [...selectedInterests];

    if (currentIndex === -1) {
      newSelectedInterests.push(interest);
    } else {
      newSelectedInterests.splice(currentIndex, 1);
    }

    onChange(newSelectedInterests);
  };

  const handleAddCustomInterest = () => {
    if (customInterest && !selectedInterests.includes(customInterest)) {
      const newSelectedInterests = [...selectedInterests, customInterest];
      onChange(newSelectedInterests);
      setCustomInterest('');
    }
  };

  const getInterestIcon = (interestName) => {
    const option = interestOptions.find(opt => opt.name === interestName);
    return option ? option.icon : <LocalActivityIcon fontSize="small" />;
  };

  // Filter out already selected interests from the autocomplete
  const filteredOptions = interestOptions.filter(
    option => !selectedInterests.includes(option.name)
  );

  return (
    <Box>
      <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Your Selected Interests
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {selectedInterests.length === 0 ? (
            <Typography variant="body2" color="textSecondary">
              No interests selected yet
            </Typography>
          ) : (
            selectedInterests.map((interest) => (
              <Chip
                key={interest}
                label={interest}
                icon={getInterestIcon(interest)}
                onDelete={() => handleToggleInterest(interest)}
                color="primary"
                variant="outlined"
                sx={{ m: 0.5 }}
              />
            ))
          )}
        </Box>
      </Paper>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" gutterBottom>
            Common Interests
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {interestOptions.map((option) => {
              const isSelected = selectedInterests.includes(option.name);
              return (
                <Chip
                  key={option.name}
                  label={option.name}
                  icon={option.icon}
                  onClick={() => handleToggleInterest(option.name)}
                  color={isSelected ? "primary" : "default"}
                  variant={isSelected ? "filled" : "outlined"}
                  sx={{ m: 0.5 }}
                />
              );
            })}
          </Box>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" gutterBottom>
            Add Custom Interest
          </Typography>
          <Autocomplete
            freeSolo
            options={filteredOptions.map(option => option.name)}
            inputValue={customInterest}
            onInputChange={(event, newValue) => {
              setCustomInterest(newValue);
            }}
            renderInput={(params) => (
              <TextField 
                {...params} 
                label="Type a custom interest" 
                variant="outlined"
                fullWidth
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCustomInterest();
                  }
                }}
              />
            )}
            sx={{ mb: 2 }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default InterestSelector;
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  IconButton,
  Chip,
  Grid,
  Collapse,
  Button,
  TextField,
  Menu,
  MenuItem
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PlaceIcon from '@mui/icons-material/Place';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EuroIcon from '@mui/icons-material/Euro';

const ActivityCard = ({ 
  activity, 
  onDelete, 
  onEdit, 
  isEditing = false,
  onEditCancel,
  onEditSave
}) => {
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editedActivity, setEditedActivity] = useState({ ...activity });
  
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleEditClick = () => {
    onEdit(activity.id);
    handleMenuClose();
  };
  
  const handleDeleteClick = () => {
    onDelete(activity.id);
    handleMenuClose();
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedActivity({ ...editedActivity, [name]: value });
  };
  
  const handleSave = () => {
    onEditSave(editedActivity);
  };
  
  const handleCancel = () => {
    setEditedActivity({ ...activity });
    onEditCancel();
  };
  
  const formatTime = (time, duration) => {
    if (!time) return 'Time not specified';
    
    // For simplicity, we'll just append the duration
    return `${time} (${duration} ${duration === 1 ? 'hour' : 'hours'})`;
  };
  
  // Render the activity card in edit mode
  if (isEditing) {
    return (
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <TextField
            fullWidth
            label="Activity Name"
            name="name"
            value={editedActivity.name}
            onChange={handleInputChange}
            variant="outlined"
            size="small"
            sx={{ mb: 2 }}
          />
          
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Day"
                name="day"
                type="number"
                value={editedActivity.day}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
                InputProps={{ inputProps: { min: 1 } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Time"
                name="time"
                value={editedActivity.time}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
              />
            </Grid>
          </Grid>
          
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Duration (hours)"
                name="duration"
                type="number"
                value={editedActivity.duration}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
                InputProps={{ inputProps: { min: 1 } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                label="Type"
                name="type"
                value={editedActivity.type}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
              >
                {['Sightseeing', 'Museum', 'Food', 'Shopping', 'Entertainment', 'Nature', 'Cultural', 'Adventure'].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleCancel}>
            Cancel
          </Button>
          <Button size="small" color="primary" onClick={handleSave}>
            Save
          </Button>
        </CardActions>
      </Card>
    );
  }
  
  // Render the activity card in view mode
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="h6" component="div">
            {activity.name}
          </Typography>
          <IconButton size="small" onClick={handleMenuClick}>
            <EditIcon fontSize="small" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleEditClick}>Edit</MenuItem>
            <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
          </Menu>
        </Box>
        
        <Chip 
          size="small" 
          label={activity.type} 
          color="primary" 
          variant="outlined" 
          sx={{ mb: 1 }}
        />
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <AccessTimeIcon fontSize="small" color="action" sx={{ mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            {formatTime(activity.time, activity.duration)}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PlaceIcon fontSize="small" color="action" sx={{ mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            Day {activity.day}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button 
          size="small" 
          onClick={handleExpandClick}
          sx={{ ml: 'auto' }}
        >
          {expanded ? 'Less' : 'More'}
        </Button>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {activity.description || 'No additional details available for this activity.'}
          </Typography>
          {activity.cost && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <EuroIcon fontSize="small" color="action" sx={{ mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                Approx. cost: ${activity.cost}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ActivityCard;
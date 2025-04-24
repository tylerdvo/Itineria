import React from 'react';
import { 
  Card, CardContent, CardActions, CardMedia, 
  Typography, IconButton, Chip, Box 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PlaceIcon from '@mui/icons-material/Place';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EuroIcon from '@mui/icons-material/Euro';
import { useAuth } from '../../hooks/useAuth';

const ActivityCard = ({ activity, onDelete, onEdit, viewOnly = false }) => {
  const { user } = useAuth();
  
  // Default placeholder image if none provided
  const imageSrc = activity.image || 'https://via.placeholder.com/300x150?text=Activity';
  
  // Format date to be more readable
  const formatDate = (dateString) => {
    if (!dateString) return 'No date specified';
    return new Date(dateString).toLocaleDateString();
  };

  // Format time in a readable way
  const formatTime = (timeString) => {
    if (!timeString) return '';
    return timeString;
  };

  // Determine if user can edit this activity
  const canEdit = !viewOnly && user?.id === activity.userId;

  return (
    <Card elevation={2} sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'transform 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-4px)'
      }
    }}>
      <CardMedia
        component="img"
        height="140"
        image={imageSrc}
        alt={activity.name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="div" gutterBottom>
          {activity.name}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <PlaceIcon fontSize="small" color="action" sx={{ mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            {activity.location || 'Location not specified'}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <AccessTimeIcon fontSize="small" color="action" sx={{ mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            {formatDate(activity.date)}
            {activity.time && `, ${formatTime(activity.time)}`}
          </Typography>
        </Box>
        
        {activity.cost && (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <EuroIcon fontSize="small" color="action" sx={{ mr: 1 }} />
            <Typography variant="body2" color="text.secondary">
              {typeof activity.cost === 'number' ? `€${activity.cost.toFixed(2)}` : activity.cost}
            </Typography>
          </Box>
        )}
        
        {activity.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            {activity.description}
          </Typography>
        )}
        
        {activity.category && (
          <Box sx={{ mt: 2 }}>
            <Chip 
              label={activity.category} 
              size="small" 
              color="primary" 
              variant="outlined" 
            />
          </Box>
        )}
      </CardContent>
      
      {canEdit && (
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <IconButton size="small" onClick={() => onEdit && onEdit(activity)}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={() => onDelete && onDelete(activity.id)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
};

export default ActivityCard;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Box, Container, Typography, Paper, Grid, Divider, 
  Tabs, Tab, Button, CircularProgress, Alert 
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useItinerary } from '../../hooks/useItinerary';
import { useAuth } from '../../hooks/useAuth';
import ActivityCard from './ActivityCard';

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
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

const ItineraryView = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { getItinerary, favoriteItinerary, error, loading } = useItinerary();
  const [itinerary, setItinerary] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const data = await getItinerary(id);
        setItinerary(data);
        setIsFavorite(data.favorites?.includes(user?.id));
      } catch (err) {
        console.error('Failed to fetch itinerary:', err);
      }
    };

    if (id) {
      fetchItinerary();
    }
  }, [id, getItinerary, user]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleFavorite = async () => {
    try {
      await favoriteItinerary(id);
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error('Failed to favorite itinerary:', err);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    // Would normally trigger a snackbar/notification here
    alert('Link copied to clipboard!');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (!itinerary) {
    return (
      <Container>
        <Alert severity="info" sx={{ mt: 4 }}>
          Itinerary not found
        </Alert>
      </Container>
    );
  }

  const isOwner = user?.id === itinerary.userId;

  return (
    <Container maxWidth="lg">
      <Paper sx={{ p: { xs: 2, md: 4 }, mt: 4, mb: 2 }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' }
        }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {itinerary.title}
          </Typography>
          
          <Box sx={{ display: 'flex', mt: { xs: 2, sm: 0 } }}>
            <Button 
              startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              onClick={handleFavorite}
              sx={{ mr: 1 }}
            >
              {isFavorite ? 'Favorited' : 'Favorite'}
            </Button>
            <Button startIcon={<ShareIcon />} onClick={handleShare} sx={{ mr: 1 }}>
              Share
            </Button>
            {isOwner && (
              <Button startIcon={<EditIcon />} href={`/itinerary/edit/${id}`}>
                Edit
              </Button>
            )}
          </Box>
        </Box>

        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          {new Date(itinerary.startDate).toLocaleDateString()} - {new Date(itinerary.endDate).toLocaleDateString()}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body1" paragraph>
          {itinerary.description || 'No description provided.'}
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 4 }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="itinerary tabs">
            <Tab label="Overview" id="itinerary-tab-0" />
            <Tab label="Activities" id="itinerary-tab-1" />
            <Tab label="Map" id="itinerary-tab-2" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Destinations
              </Typography>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <ul style={{ paddingLeft: '20px', marginTop: 0 }}>
                  {itinerary.destinations.map((destination, index) => (
                    <li key={index}>
                      <Typography variant="body1">{destination}</Typography>
                    </li>
                  ))}
                </ul>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Trip Details
              </Typography>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="body2">
                  <strong>Duration:</strong> {
                    Math.ceil((new Date(itinerary.endDate) - new Date(itinerary.startDate)) / (1000 * 60 * 60 * 24))
                  } days
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>Activities:</strong> {itinerary.activities?.length || 0}
                </Typography>
                {/* Additional itinerary details would go here */}
              </Paper>
            </Grid>
          </Grid>

          {/* Preview of activities */}
          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
            Highlighted Activities
          </Typography>
          <Grid container spacing={2}>
            {itinerary.activities?.slice(0, 3).map((activity) => (
              <Grid item xs={12} sm={6} md={4} key={activity.id}>
                <ActivityCard activity={activity} viewOnly />
              </Grid>
            ))}
            {(itinerary.activities?.length === 0) && (
              <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary">
                  No activities planned yet
                </Typography>
              </Grid>
            )}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>
            All Activities
          </Typography>

          <Grid container spacing={2}>
            {itinerary.activities?.map((activity) => (
              <Grid item xs={12} sm={6} md={4} key={activity.id}>
                <ActivityCard activity={activity} viewOnly />
              </Grid>
            ))}
            {(itinerary.activities?.length === 0) && (
              <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary">
                  No activities planned yet
                </Typography>
              </Grid>
            )}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>
            Trip Map
          </Typography>
          <Paper 
            variant="outlined" 
            sx={{ 
              height: 400, 
              width: '100%', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center' 
            }}
          >
            <Typography color="textSecondary">
              Map view will be implemented here
            </Typography>
          </Paper>
        </TabPanel>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
        <Button startIcon={<DownloadIcon />} variant="outlined">
          Export Itinerary
        </Button>
      </Box>
    </Container>
  );
};

export default ItineraryView;
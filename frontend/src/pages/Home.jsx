import React from 'react';
import { 
  Box, Button, Container, Typography, Grid, 
  Paper, Card, CardContent, CardMedia, 
  List, ListItem, ListItemIcon, ListItemText 
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExploreIcon from '@mui/icons-material/Explore';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import MapIcon from '@mui/icons-material/Map';
import PublicIcon from '@mui/icons-material/Public';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
  const { user, isAuthenticated } = useAuth();

  // Hero section
  const Hero = () => (
    <Box sx={{ 
      bgcolor: 'primary.main', 
      color: 'white', 
      pt: 8, 
      pb: 6,
      borderRadius: { xs: 0, sm: '0 0 50px 50px' }
    }}>
      <Container maxWidth="md">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          gutterBottom
          sx={{ fontWeight: 'bold' }}
        >
          Discover Your Perfect Journey
        </Typography>
        <Typography variant="h5" align="center" paragraph>
          Itinera uses AI to create personalized travel itineraries based on your preferences.
          Plan smarter, travel better, and create unforgettable memories.
        </Typography>
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Button
            component={RouterLink}
            to={isAuthenticated ? "/dashboard" : "/login"}
            variant="contained"
            color="secondary"
            size="large"
            sx={{ mr: 2 }}
          >
            {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
          </Button>
          <Button
            component={RouterLink}
            to="/about"
            variant="outlined"
            color="inherit"
            size="large"
          >
            Learn More
          </Button>
        </Box>
      </Container>
    </Box>
  );

  // Features section
  const Features = () => (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Typography
          component="h2"
          variant="h3"
          align="center"
          gutterBottom
        >
          How Itinera Works
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" paragraph>
          Your personalized travel companion powered by AI
        </Typography>
        
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6
                }
              }}
            >
              <CardMedia
                component="div"
                sx={{
                  pt: '56.25%', // 16:9 aspect ratio
                  bgcolor: 'primary.light',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <PublicIcon sx={{ fontSize: 60, color: 'white', position: 'absolute' }} />
              </CardMedia>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h3">
                  Share Your Preferences
                </Typography>
                <Typography>
                  Tell us about your travel style, interests, and must-see destinations. Our AI learns what makes your perfect trip.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6
                }
              }}
            >
              <CardMedia
                component="div"
                sx={{
                  pt: '56.25%',
                  bgcolor: 'secondary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ExploreIcon sx={{ fontSize: 60, color: 'white', position: 'absolute' }} />
              </CardMedia>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h3">
                  AI Creates Your Itinerary
                </Typography>
                <Typography>
                  Our intelligent algorithms generate a personalized travel plan optimized for your preferences and timeframe.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6
                }
              }}
            >
              <CardMedia
                component="div"
                sx={{
                  pt: '56.25%',
                  bgcolor: 'success.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <MapIcon sx={{ fontSize: 60, color: 'white', position: 'absolute' }} />
              </CardMedia>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h3">
                  Travel With Confidence
                </Typography>
                <Typography>
                  Access your itinerary anywhere, share with travel companions, and make adjustments on the go.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );

  // Benefits section
  const Benefits = () => (
    <Box sx={{ py: 8, bgcolor: 'grey.100' }}>
      <Container maxWidth="md">
        <Typography
          component="h2"
          variant="h3"
          align="center"
          gutterBottom
        >
          Why Choose Itinera
        </Typography>
        
        <Paper sx={{ p: 4, mt: 4 }}>
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Personalized Recommendations" 
                secondary="Our AI analyzes your preferences to suggest activities you'll love." 
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Save Planning Time" 
                secondary="Create complete itineraries in minutes instead of hours of research." 
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Discover Hidden Gems" 
                secondary="Go beyond tourist traps with local insights and unique experiences." 
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Collaborative Planning" 
                secondary="Easily share and modify itineraries with travel companions." 
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Intelligent Optimization" 
                secondary="Efficiently organize activities based on location, opening hours, and your pace." 
              />
            </ListItem>
          </List>
        </Paper>
        
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button
            component={RouterLink}
            to={isAuthenticated ? "/itinerary/new" : "/register"}
            variant="contained"
            color="primary"
            size="large"
            startIcon={<FlightTakeoffIcon />}
          >
            {isAuthenticated ? 'Create Your First Itinerary' : 'Sign Up Free'}
          </Button>
        </Box>
      </Container>
    </Box>
  );

  // Testimonials would go here in a real app

  return (
    <Box>
      <Hero />
      <Features />
      <Benefits />
    </Box>
  );
};

export default Home
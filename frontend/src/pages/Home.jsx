import React from 'react';
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia,
  Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ExploreIcon from '@mui/icons-material/Explore';
import FlightIcon from '@mui/icons-material/Flight';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state => state.auth || {});

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/planner');
    } else {
      navigate('/register');
    }
  };

  const features = [
    {
      icon: <AutoAwesomeIcon fontSize="large" color="primary" />,
      title: 'AI-Powered Planning',
      description: 'Our intelligent system learns your preferences and creates personalized itineraries tailored just for you.'
    },
    {
      icon: <ExploreIcon fontSize="large" color="primary" />,
      title: 'Discover Hidden Gems',
      description: 'Find unique experiences and local favorites that most tourists miss on their travels.'
    },
    {
      icon: <LocalActivityIcon fontSize="large" color="primary" />,
      title: 'Curated Activities',
      description: 'Choose from a selection of hand-picked activities and experiences based on your interests.'
    },
    {
      icon: <FlightIcon fontSize="large" color="primary" />,
      title: 'Seamless Travel',
      description: 'All your travel plans in one place, accessible anytime, anywhere.'
    }
  ];

  const destinations = [
    {
      name: 'Paris',
      image: 'https://source.unsplash.com/featured/?paris',
      description: 'Experience the romance and culture of the City of Light.'
    },
    {
      name: 'Tokyo',
      image: 'https://source.unsplash.com/featured/?tokyo',
      description: 'Explore the perfect blend of tradition and futuristic innovation.'
    },
    {
      name: 'Bali',
      image: 'https://source.unsplash.com/featured/?bali',
      description: 'Discover tropical paradise with stunning beaches and unique culture.'
    },
    {
      name: 'New York',
      image: 'https://source.unsplash.com/featured/?newyork',
      description: 'Experience the vibrant energy of the city that never sleeps.'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'white', 
          py: 8,
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://source.unsplash.com/featured/?travel)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
              Travel Smarter with AI
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 4 }}>
              Personalized travel itineraries created just for you
            </Typography>
            <Button 
              variant="contained" 
              size="large" 
              color="secondary"
              onClick={handleGetStarted}
              sx={{ px: 4, py: 1, fontSize: '1.1rem' }}
            >
              Plan Your Trip
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Why Choose Itinera?
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" align="center" paragraph sx={{ mb: 6 }}>
          Our AI-powered platform makes travel planning simple, personalized, and enjoyable.
        </Typography>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  boxShadow: 2,
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 4
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Box sx={{ mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography gutterBottom variant="h5" component="h3">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Popular Destinations */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            Popular Destinations
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" align="center" paragraph sx={{ mb: 6 }}>
            Get inspired for your next adventure
          </Typography>
          
          <Grid container spacing={4}>
            {destinations.map((destination, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: 2,
                    transition: '0.3s',
                    borderRadius: 2,
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'scale(1.03)',
                      boxShadow: 4
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="160"
                    image={destination.image}
                    alt={destination.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h3">
                      {destination.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {destination.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="md">
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={3} 
            justifyContent="space-between"
            alignItems="center"
          >
            <Box sx={{ maxWidth: 'sm' }}>
              <Typography variant="h4" component="h2" gutterBottom>
                Ready to start your journey?
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: { xs: 3, sm: 0 } }}>
                Create your personalized travel itinerary today!
              </Typography>
            </Box>
            <Button 
              variant="contained" 
              color="secondary" 
              size="large"
              onClick={handleGetStarted}
              sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
            >
              Get Started
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
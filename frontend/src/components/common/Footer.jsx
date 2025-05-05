import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link, 
  Divider,
  IconButton
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.dark',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <FlightTakeoffIcon sx={{ mr: 1 }} />
              <Typography variant="h6" component="div">
                Itinera
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Your AI-powered travel companion, creating personalized itineraries since 2023.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton color="inherit" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn">
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" component="div" gutterBottom>
              Explore
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link component={RouterLink} to="/" color="inherit" underline="hover">
                Home
              </Link>
              <Link component={RouterLink} to="/about" color="inherit" underline="hover">
                About Us
              </Link>
              <Link component={RouterLink} to="/planner" color="inherit" underline="hover">
                Plan a Trip
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Popular Destinations
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Travel Guides
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" component="div" gutterBottom>
              Support
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="inherit" underline="hover">
                Help Center
              </Link>
              <Link href="#" color="inherit" underline="hover">
                FAQs
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Contact Us
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Privacy Policy
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Terms of Service
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" component="div" gutterBottom>
              Subscribe
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Join our newsletter to receive travel tips and exclusive offers.
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              {/* Email input field would go here in a real implementation */}
              <Typography variant="body2" sx={{ mt: 2 }}>
                By subscribing, you agree to our Privacy Policy and Terms of Service.
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4, bgcolor: 'rgba(255, 255, 255, 0.2)' }} />
        
        <Typography variant="body2" align="center">
          &copy; {new Date().getFullYear()} Itinera. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
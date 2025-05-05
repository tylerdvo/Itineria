import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Avatar,
  Divider
} from '@mui/material';

const About = () => {
  const teamMembers = [
    {
      name: 'Emma Johnson',
      role: 'CEO & Founder',
      image: 'https://source.unsplash.com/random/300x300/?woman',
      bio: 'Travel enthusiast with 10+ years in the travel industry and a passion for AI technology.'
    },
    {
      name: 'David Chen',
      role: 'CTO',
      image: 'https://source.unsplash.com/random/300x300/?man',
      bio: 'AI expert with a background in machine learning and natural language processing.'
    },
    {
      name: 'Sofia Rodriguez',
      role: 'Head of User Experience',
      image: 'https://source.unsplash.com/random/300x300/?woman',
      bio: 'Designer focused on creating intuitive and delightful experiences for travelers.'
    },
    {
      name: 'Marcus Williams',
      role: 'Travel Specialist',
      image: 'https://source.unsplash.com/random/300x300/?man',
      bio: 'Former travel guide with expertise in curating unique and authentic experiences.'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* About Us Section */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          About Itinera
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" paragraph>
          Reimagining travel planning with artificial intelligence
        </Typography>
        <Divider sx={{ my: 4 }} />
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box 
              component="img" 
              src="https://source.unsplash.com/featured/?travel,planning" 
              alt="Travel Planning"
              sx={{ 
                width: '100%', 
                height: 'auto', 
                borderRadius: 2,
                boxShadow: 3 
              }} 
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Our Story
            </Typography>
            <Typography variant="body1" paragraph>
              Itinera was born from a simple idea: travel planning should be as enjoyable as the journey itself. We recognized that traditional travel planning is often overwhelming and time-consuming, with endless options and fragmented information.
            </Typography>
            <Typography variant="body1" paragraph>
              Founded in 2023, we set out to create an intelligent travel assistant that truly understands each traveler's unique preferences and crafts personalized experiences. By combining advanced AI with deep travel expertise, we've built a platform that makes travel planning simple, intuitive, and enjoyable.
            </Typography>
            <Typography variant="body1">
              Our mission is to help people discover the world on their own terms, with itineraries that reflect their individual interests, pace, and style of travel.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Our Technology Section */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" gutterBottom align="center">
          Our Technology
        </Typography>
        <Divider sx={{ my: 4 }} />
        <Typography variant="body1" paragraph>
          At the heart of Itinera is our proprietary AI recommendation engine that understands natural language and translates your preferences into personalized travel plans. Our technology combines several cutting-edge approaches:
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Natural Language Processing
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Our advanced NLP models interpret your preferences, whether they're specific or vague, and convert them into actionable travel recommendations.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Machine Learning
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Our system learns from user interactions and feedback to continuously improve recommendations and discover hidden patterns in travel preferences.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Contextual Awareness
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Taking into account factors like seasonality, local events, and logistical constraints to create itineraries that are not just personalized, but practical.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Team Section */}
      <Box>
        <Typography variant="h4" gutterBottom align="center">
          Meet Our Team
        </Typography>
        <Divider sx={{ my: 4 }} />
        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ height: '100%', boxShadow: 2 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Avatar
                    src={member.image}
                    alt={member.name}
                    sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
                  />
                  <Typography variant="h6" gutterBottom>
                    {member.name}
                  </Typography>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    {member.role}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.bio}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default About;
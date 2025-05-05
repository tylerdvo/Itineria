import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Box sx={{ p: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>

        {user ? (
          <>
            <Typography variant="h6">Name:</Typography>
            <Typography>{user.name}</Typography>

            <Typography variant="h6" sx={{ mt: 2 }}>Email:</Typography>
            <Typography>{user.email}</Typography>

            <Typography variant="h6" sx={{ mt: 2 }}>User ID:</Typography>
            <Typography>{user._id}</Typography>
          </>
        ) : (
          <Typography color="error">User data not available.</Typography>
        )}
      </Paper>
    </Box>
  );
};

export default Profile;

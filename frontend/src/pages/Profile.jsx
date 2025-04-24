import React, { useState, useEffect } from 'react';
import { 
  Box, Container, Typography, Grid, Paper, Button, 
  TextField, Avatar, Divider, CircularProgress, 
  Alert, Snackbar, Tab, Tabs, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import { useAuth } from '../hooks/useAuth';

const Profile = () => {
  const { user, updateUser, updatePassword, deleteAccount, loading, error } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    bio: '',
    location: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '',
        location: user.location || ''
      });
    }
  }, [user]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    
    // Reset form if canceling edit
    if (isEditing && user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '',
        location: user.location || ''
      });
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(profileData);
      setIsEditing(false);
      setSuccessMessage('Profile updated successfully');
      setOpenSnackbar(true);
    } catch (err) {
      console.error('Profile update error:', err);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      // Would normally set a validation error here
      return;
    }
    
    try {
      await updatePassword(passwordData.currentPassword, passwordData.newPassword);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setSuccessMessage('Password updated successfully');
      setOpenSnackbar(true);
    } catch (err) {
      console.error('Password update error:', err);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation === 'DELETE') {
      try {
        await deleteAccount();
        // This would normally redirect to the home page or login page
      } catch (err) {
        console.error('Account deletion error:', err);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
    
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`profile-tabpanel-${index}`}
        aria-labelledby={`profile-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ py: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  };

  if (loading || !user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Avatar 
            src={user.photoURL} 
            alt={user.name}
            sx={{ width: 80, height: 80, mr: 3, bgcolor: 'primary.main' }}
          >
            {!user.photoURL && <PersonIcon fontSize="large" />}
          </Avatar>
          
          <Box>
            <Typography variant="h4" gutterBottom>
              {user.name}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {user.email}
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              aria-label="profile tabs"
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab 
                icon={<PersonIcon />} 
                label="Profile" 
                id="profile-tab-0" 
                iconPosition="start" 
              />
              <Tab 
                icon={<SecurityIcon />} 
                label="Security" 
                id="profile-tab-1" 
                iconPosition="start" 
              />
            </Tabs>
          </Box>
          
          <TabPanel value={tabValue} index={0}>
            <form onSubmit={handleProfileSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
                      color={isEditing ? "primary" : "secondary"}
                      variant={isEditing ? "contained" : "outlined"}
                      onClick={isEditing ? undefined : handleEditToggle}
                      type={isEditing ? "submit" : "button"}
                    >
                      {isEditing ? 'Save Changes' : 'Edit Profile'}
                    </Button>
                    
                    {isEditing && (
                      <Button
                        sx={{ ml: 2 }}
                        onClick={handleEditToggle}
                      >
                        Cancel
                      </Button>
                    )}
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    required
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    required
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Bio"
                    name="bio"
                    multiline
                    rows={4}
                    value={profileData.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Tell us about yourself and your travel style"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    value={profileData.location}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="City, Country"
                  />
                </Grid>
              </Grid>
            </form>
          </TabPanel>
          
          <TabPanel value={tabValue} index={1}>
            <Typography variant="h6" gutterBottom>
              Change Password
            </Typography>
            
            <form onSubmit={handlePasswordSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Current Password"
                    name="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="New Password"
                    name="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Confirm New Password"
                    name="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                    error={passwordData.newPassword !== passwordData.confirmPassword}
                    helperText={
                      passwordData.newPassword !== passwordData.confirmPassword && 
                      "Passwords don't match"
                    }
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<PasswordIcon />}
                    disabled={
                      !passwordData.currentPassword || 
                      !passwordData.newPassword ||
                      !passwordData.confirmPassword ||
                      passwordData.newPassword !== passwordData.confirmPassword
                    }
                  >
                    Update Password
                  </Button>
                </Grid>
              </Grid>
            </form>
            
            <Divider sx={{ my: 4 }} />
            
            <Typography variant="h6" gutterBottom sx={{ color: 'error.main' }}>
              Delete Account
            </Typography>
            <Typography variant="body2" paragraph color="textSecondary">
              This action cannot be undone. All your data will be permanently deleted.
            </Typography>
            
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => setDeleteDialogOpen(true)}
            >
              Delete Account
            </Button>
          </TabPanel>
        </Box>
      </Paper>
      
      {/* Delete account confirmation dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle sx={{ color: 'error.main' }}>
          Are you sure you want to delete your account?
        </DialogTitle>
        <DialogContent>
          <Typography paragraph>
            This action cannot be undone. All your data will be permanently deleted.
          </Typography>
          <Typography paragraph>
            Type "DELETE" to confirm:
          </Typography>
          <TextField
            fullWidth
            value={deleteConfirmation}
            onChange={(e) => setDeleteConfirmation(e.target.value)}
            placeholder="DELETE"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteAccount} 
            color="error"
            disabled={deleteConfirmation !== 'DELETE'}
          >
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Success snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={successMessage}
      />
    </Container>
  );
};

export default Profile;
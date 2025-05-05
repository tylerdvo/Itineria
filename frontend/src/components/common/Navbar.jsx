import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Container,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // For the user menu in desktop view
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  // For the drawer in mobile view
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  
  const handleLogout = async () => {
    await logout();
    handleClose();
    navigate('/');
  };
  
  // Navigation links
  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'About', path: '/about' }
  ];
  
  // Authenticated links
  const authLinks = [
    { title: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    { title: 'Create Itinerary', path: '/planner', icon: <AddIcon /> },
    { title: 'Profile', path: '/profile', icon: <PersonIcon /> }
  ];
  
  // Mobile drawer content
  const drawer = (
    <Box sx={{ width: 250, mt: 2 }} role="presentation">
      <List>
        {navLinks.map((link) => (
          <ListItem 
            button 
            key={link.title} 
            component={RouterLink} 
            to={link.path}
            onClick={handleDrawerToggle}
          >
            <ListItemText primary={link.title} />
          </ListItem>
        ))}
      </List>
      
      <Divider />
      
      {isAuthenticated ? (
        <>
          <List>
            {authLinks.map((link) => (
              <ListItem 
                button 
                key={link.title} 
                component={RouterLink} 
                to={link.path}
                onClick={handleDrawerToggle}
              >
                <ListItemIcon>{link.icon}</ListItemIcon>
                <ListItemText primary={link.title} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon><ExitToAppIcon /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </>
      ) : (
        <List>
          <ListItem 
            button 
            component={RouterLink} 
            to="/login"
            onClick={handleDrawerToggle}
          >
            <ListItemText primary="Login" />
          </ListItem>
          <ListItem 
            button 
            component={RouterLink} 
            to="/register"
            onClick={handleDrawerToggle}
          >
            <ListItemText primary="Register" />
          </ListItem>
        </List>
      )}
    </Box>
  );
  
  return (
    <AppBar position="static" color="primary">
      <Container>
        <Toolbar disableGutters>
          {/* Logo and brand */}
          <FlightTakeoffIcon sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              flexGrow: 1,
            }}
          >
            Itinera
          </Typography>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {navLinks.map((link) => (
                  <Button
                    key={link.title}
                    color="inherit"
                    component={RouterLink}
                    to={link.path}
                    sx={{ mx: 1 }}
                  >
                    {link.title}
                  </Button>
                ))}
                
                {isAuthenticated ? (
                  <>
                    <Button
                      color="inherit"
                      component={RouterLink}
                      to="/dashboard"
                      sx={{ mx: 1 }}
                    >
                      Dashboard
                    </Button>
                    <Button
                      color="inherit"
                      component={RouterLink}
                      to="/planner"
                      sx={{ mx: 1 }}
                    >
                      Plan Trip
                    </Button>
                    <IconButton
                      onClick={handleMenu}
                      color="inherit"
                      sx={{ ml: 1 }}
                    >
                      <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                        {user?.name?.charAt(0) || <AccountCircleIcon />}
                      </Avatar>
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={open}
                      onClose={handleClose}
                    >
                      <MenuItem 
                        onClick={() => {
                          handleClose();
                          navigate('/profile');
                        }}
                      >
                        Profile
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                  </>
                ) : (
                  <>
                    <Button
                      color="inherit"
                      component={RouterLink}
                      to="/login"
                      sx={{ mx: 1 }}
                    >
                      Login
                    </Button>
                    <Button
                      color="secondary"
                      variant="contained"
                      component={RouterLink}
                      to="/register"
                      sx={{ ml: 1 }}
                    >
                      Register
                    </Button>
                  </>
                )}
              </Box>
            </>
          )}
          
          {/* Mobile Navigation */}
          {isMobile && (
            <>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={handleDrawerToggle}
              >
                {drawer}
              </Drawer>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
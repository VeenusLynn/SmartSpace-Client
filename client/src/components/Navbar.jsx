import React, { useState } from 'react';
import { LightModeOutlined, DarkModeOutlined, Menu as MenuIcon, SettingsOutlined, ArrowDropDownOutlined } from '@mui/icons-material';
import FlexBetween from './FlexBetween';
import { useDispatch } from 'react-redux';
import { setMode, setLogout } from 'state'; // Assuming you have setLogout action
import profileImage from 'assets/profile.jpg';
import { AppBar, Button, IconButton, Toolbar, useTheme, Box, Typography, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = ({
    user,
    isSidebarOpen,
    setIsSidebarOpen
}) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);   
    }

    const handleLogout = async () => {
        // Dispatch action to handle logout state
        dispatch(setLogout());

        try {
            const response = await fetch('http://localhost:5000/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: user._id })
            });

            if (response.ok) {
                console.log('Logout successful');
                navigate('/login');
            } else {
                console.error('Error logging out:', response.statusText);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    }

    return (
        <AppBar
            sx={{
                position: 'static',
                boxShadow: "none",
                background: "none"
            }}
        >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                {/* Left Side */}
                <FlexBetween>
                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        <MenuIcon />
                    </IconButton>
                    
                </FlexBetween>

                {/* Right Side */}

                <FlexBetween gap="1.5rem">
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === "dark" ? (<DarkModeOutlined sx={{ fontSize : "25px"}} />) : (<LightModeOutlined sx={{ fontSize : "25px"}} />)  }
                    </IconButton>
                    <IconButton>
                        <SettingsOutlined sx={{ fontSize : "25px"}} />
                    </IconButton>

                    <FlexBetween>
                        <Button
                            onClick={handleClick}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                textTransform: "none",
                                gap: "1rem",
                            }}
                        >
                            <Box
                                component="img"
                                alt="profile"
                                src={profileImage}
                                sx={{
                                    width: "32px",
                                    height: "32px",
                                    borderRadius: "50%",
                                    objectFit: "cover"
                                }}
                            />
                            <Box textAlign="left">
                                <Typography 
                                    fontWeight="bold"
                                    fontSize="0.9rem"
                                    sx={{ color: theme.palette.secondary[100] }}
                                >
                                    {user.fullName}
                                </Typography>
                                <Typography 
                                    fontSize="0.rem"
                                    sx={{ color: theme.palette.secondary[200] }}
                                >
                                    {user.role}
                                </Typography>
                            </Box>
                            <ArrowDropDownOutlined sx={{ color: theme.palette.secondary[300], fontSize: "25px" }} />
                        </Button>
                        <Menu 
                            anchorEl={anchorEl} 
                            open={isOpen} 
                            onClose={handleClose} 
                            anchorOrigin={{ 
                                vertical: "bottom", 
                                horizontal: "center"
                            }} 
                        >
                            <MenuItem onClick={handleClose}>My Profile</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </FlexBetween>
                </FlexBetween>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;

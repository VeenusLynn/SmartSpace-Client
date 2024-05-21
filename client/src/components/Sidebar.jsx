import React from 'react'
import { 
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
    InputBase
 } from '@mui/material'
import { 
    SettingsOutlined, 
    ChevronLeft, 
    ChevronRightOutlined, 
    HomeOutlined, 
    AdminPanelSettingsOutlined,
    WarehouseOutlined,
    InventoryOutlined,
    BugReportOutlined,
    ArticleOutlined,
    CameraOutdoorOutlined,
    Search,
    HelpOutline
} from '@mui/icons-material'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FlexBetween from './FlexBetween'
import profileImage from 'assets/profile.jpg'
import logoDark from 'assets/logoDark.png'
import logoLight from 'assets/logoLight.png'


const navItems = [
    {
        text: "Dashboard",
        icon: <HomeOutlined />,
    },
    {
        text: "Management Interfaces",
        icon: null,
    },
    {
        text: "Warehouse",
        icon: <WarehouseOutlined />,
    },
    {
        text: "Inventory",
        icon: <InventoryOutlined />,
    },
    {
        text: "VideoProcessing",
        icon: <CameraOutdoorOutlined />,
    },
    {
        text: "Reports",
        icon: <ArticleOutlined />,
    },
    {
        text: "FAQ",
        icon: <HelpOutline />,
    },
    {
        text: "Admin",
        icon: null,
    },
    {
        text: "ControlPanel",
        icon: <AdminPanelSettingsOutlined />,
    },
    {
        text: "BugReports",
        icon: <BugReportOutlined />,
    }
]

const Sidebar = ({
    user,
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile
}) => {

    const { pathname } = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();
    const theme = useTheme();
    
    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    return (
        <Box component="nav">
            {isSidebarOpen && (
                <Drawer
                    open={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    variant='persistent'
                    anchor='left'
                    sx={{
                        width: drawerWidth,
                        '& .MuiDrawer-paper': {
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            color: theme.palette.secondary[200],
                            boxSizing: 'border-box',
                            backgroundColor: theme.palette.mode === "dark" ? theme.palette.primary[800] : theme.palette.secondary[900] ,
                            borderWidth: isNonMobile ? 0 : "2px",
                            width: drawerWidth,
                        }
                    }}
                >
                    <Box>
                        <Box m="1.5rem 2rem 2rem 3rem">
                            <FlexBetween color={theme.palette.secondary.main}>
                                <Box display="flex" alignItems="center" gap="0.5rem">
                                    {theme.palette.mode === "dark" ? (<img src={logoDark} alt="logoDark" style={{ width: "120px", height: "70px"}} />) : <img src={logoLight} alt="logoLight" style={{ width: "120px", height: "70px"}} />}
                                </Box>
                
                                {!isNonMobile && (
                                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                        <ChevronLeft />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        </Box>
                        <Box>
                            <FlexBetween
                                backgroundColor={theme.palette.background.alt}
                                borderRadius="15px"
                                gap="3.5rem"
                                padding="0.1rem 1rem"
                                width="80%"
                                margin="1.5rem"
                                >
                                <InputBase placeholder='Search ...'></InputBase>
                                <IconButton>
                                    <Search />
                                </IconButton>
                            </FlexBetween>
                        </Box>
                        <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                            <List>
                                {navItems.map(({ text, icon }) => {
                                    if (!icon) {
                                        return (
                                            <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>{text}</Typography>
                                        );
                                    }
                                    const lowerCaseText = text.toLowerCase();

                                    return (
                                        <ListItem key={text} disablePadding>
                                            <ListItemButton 
                                                onClick={() => { navigate(`/${lowerCaseText}`); setActive(lowerCaseText); }}
                                                sx={{
                                                    backgroundColor: active === lowerCaseText ? theme.palette.secondary[300] : "transparent",
                                                    color: active === lowerCaseText ? theme.palette.primary[600] : theme.palette.secondary[100],
                                                    borderRadius: "15px"
                                                }}
                                            >
                                                <ListItemIcon sx={{
                                                    ml: "2rem",
                                                    color: active === lowerCaseText ? theme.palette.primary[600] : theme.palette.secondary[200]
                                                }}>
                                                    {icon}
                                                </ListItemIcon>
                                                <ListItemText primary={text} />
                                                {active === lowerCaseText && (
                                                    <ChevronRightOutlined sx={{ ml: "auto" }} />
                                                )}
                                            </ListItemButton>
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </Box>
                    </Box>
                    <Box sx={{ p: "1rem" }}>
                        <Divider />
                        
                        <FlexBetween
                            textTransform="none"
                            gap="2rem"
                            m="1.5rem 2rem 0 1rem"
                        >
                            <Box
                                component="img"
                                alt="profile"
                                src={profileImage}
                                sx={{
                                    width: "40px",
                                    height: "40px",
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
                            <IconButton>
                                <SettingsOutlined sx={{ color: theme.palette.secondary[300], fontSize: "25px"}} />
                            </IconButton>
                        </FlexBetween>
                    </Box>
                </Drawer>
            )}
        </Box>
    );
};


export default Sidebar

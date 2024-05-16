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
    useTheme
 } from '@mui/material'
import { 
    SettingsOutlined, 
    ChevronLeft, 
    ChevronRightOutlined, 
    HomeOutlined, 
    ShoppingCartOutlined,
    Groups2Outlined,
    ReceiptLongOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutline,
    PointOfSaleOutlined
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
        text: "Client Facing",
        icon: null,
    },
    {
        text: "Products",
        icon: <ShoppingCartOutlined />,
    },
    {
        text: "Customers",
        icon: <Groups2Outlined />,
    },
    {
        text: "Transactions",
        icon: <ReceiptLongOutlined />,
    },
    {
        text: "Sales",
        icon: null,
    },
    {
        text: "Overview",
        icon: <PointOfSaleOutlined />,
    },
    {
        text: "Breakdown",
        icon: <PieChartOutline />,
    },
    {
        text: "Management",
        icon: null,
    },
    {
        text: "Admin",
        icon: <AdminPanelSettingsOutlined />,
    },
    {
        text: "performance",
        icon: <TrendingUpOutlined />,
    }
]


const Sidebar = ({
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile
}) => {

    const { pathname } = useLocation()
    const [active, setActive] = useState("")
    const navigate = useNavigate()
    const theme = useTheme()
    
    useEffect(() => {
        setActive(pathname.substring(1))
    }, [pathname])

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
                        color: theme.palette.secondary[200],
                        boxSizing: 'border-box',
                        backgroundColor: theme.palette.background.default,
                        borderWidth: isNonMobile ? 0 : "2px",
                        width: drawerWidth,
                    }
                }}
                >
                    <Box width="100%" >
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
                        <List>
                        {navItems.map(({text, icon}) => {
                            if (!icon) {
                                return (
                                    <Typography key={text} sx={{m:"2.25rem 0 1rem 3rem"}}>{text}</Typography>
                                )
                            }
                            const lowerCaseText = text.toLowerCase();

                            return(
                                <ListItem key={text} disablePadding>
                                    <ListItemButton 
                                    onClick={() =>{ navigate(`/${lowerCaseText}`);
                                    setActive(lowerCaseText);
                                    }}
                                    sx={{
                                        backgroundColor: active === lowerCaseText ? theme.palette.secondary[300] : "transparent",
                                        color: active === lowerCaseText ? theme.palette.primary[600] : theme.palette.secondary[100]
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
                                            <ChevronRightOutlined sx={{ml: "auto"}} />
                                        )}
                                    </ListItemButton>
                                </ListItem>
                            )
                        })} 
                        </List>
                    </Box>
                </Drawer>
            )}
        </Box>
    )
}

export default Sidebar
import { Typography, Box, useTheme } from "@mui/material";

import React from 'react'

const Header = ({title, subtitle}) => {
    const theme = useTheme()
    return (
        <Box margin="10px">
            <Typography 
                variant="h1" 
                color={theme.palette.secondary[100]}
                fontWeight="bold"
                sx={{ mb: "5px"}}    
            >
                {title}
            </Typography>
            <Typography 
                variant="h3" 
                color={theme.palette.secondary[300]}  
            >
                {subtitle}
            </Typography>
        </Box>
    )
}

export default Header
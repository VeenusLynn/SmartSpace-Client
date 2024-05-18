import React from 'react'
import { Box, useMediaQuery } from '@mui/material'
import cargo from 'assets/cargo.jpg'
import logoLight from 'assets/logoLight.png'
import { useNavigate } from 'react-router-dom'
import Form from 'scenes/login/form'


const Login = () => {
    const isNonMobile = useMediaQuery('(min-width:600px)');
    const navigate = useNavigate();
     return (
        <Box 
            sx={{
                backgroundColor: "#385E72",
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <Box
                width={isNonMobile ? "65%" : "95%"}
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "stretch",
                    justifyContent: "center",
                    
                    height: "85%",
                    bgcolor: "white",
                    borderRadius: 8,
                    boxShadow: 4,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "50%",
                        height: "100%",
                        bgcolor: "#D9E4EC",
                        borderRadius: 8,
                        
                    }}
                >
                    {/* Content for the light blue box : aka login form */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "80%",
                            height: "80%",
                        }}
                    >
                       <Form />
                        
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "50%",
                        height: "100%",
                        borderTopRightRadius: 8,
                        borderBottomRightRadius: 8,
                    }}
                >
                    <Box
                        component={"img"}
                        src={logoLight}
                        alt="logo"
                        width="50%"
                        onClick={() => {navigate("/")} }
                    /> 
                    <Box
                        component={"img"}
                        src={cargo}
                        alt="cargo"
                        width="90%"
                    /> 
                </Box>
            </Box>
        </Box>
    );
};

export default Login
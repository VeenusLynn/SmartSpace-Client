import React, { useState } from 'react';
import { Box, Button, Typography, Link, IconButton, InputAdornment, Input, FormControl, InputLabel } from '@mui/material';
import { Visibility, VisibilityOff, AlternateEmail, LockOpen, Person, Phone } from '@mui/icons-material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (values) => {
    const response = await fetch('http://localhost:5000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    console.log(response);
    console.log(values);
    if (response.ok) {
      // Redirect to login page after successful registration (so the user can generate the access token and login)
      navigate('/login'); 
    } else {
      setError(true);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Formik
      initialValues={{ fullName: '', phoneNumber: '', email: '', password: '' }}
      validationSchema={Yup.object({
        fullName: Yup.string().required('Required'),
        phoneNumber: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
      })}
      onSubmit={(values) => {
        handleRegister(values);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80%',
            height: '80%',
          }}
        >
          <FormControl
            variant="standard"
            error={errors.fullName && touched.fullName}
            sx={{ marginBottom: 2, width: '100%' }}
          >
            <InputLabel 
            htmlFor="fullName" 
            sx={{ 
                color: errors.fullName && touched.fullName ? 'red' : '#071330', 
                fontSize: '18px' 
            }}>
                Full Name
            </InputLabel>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              value={values.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              startAdornment={<InputAdornment position="start"><Person sx={{ color: errors.fullName && touched.fullName ? 'red' : '#071330' }} /></InputAdornment>}
              sx={{ 
                color: errors.fullName && touched.fullName ? 'red' : '#071330',
                '&:before': {
                    borderBottom: errors.email && touched.email ? '2px solid red' : '2px solid #071330',
                  },
                '&:after': {
                    borderBottom: errors.email && touched.email ? '2px solid red' : '2px solid #071330',
                },
            }}
            />
            {errors.fullName && touched.fullName && (
              <Typography variant="body2" color="error">
                {errors.fullName}
              </Typography>
            )}
          </FormControl>
          <FormControl
            variant="standard"
            error={errors.phoneNumber && touched.phoneNumber}
            sx={{ marginBottom: 2, width: '100%' }}
          >
            <InputLabel htmlFor="phoneNumber" sx={{ color: errors.phoneNumber && touched.phoneNumber ? 'red' : '#071330', fontSize: '18px' }}>Phone Number</InputLabel>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              value={values.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              startAdornment={<InputAdornment position="start"><Phone sx={{ color: errors.phoneNumber && touched.phoneNumber ? 'red' : '#071330' }} /></InputAdornment>}
              sx={{ 
                color: errors.phoneNumber && touched.phoneNumber ? 'red' : '#071330',
                '&:before': {
                    borderBottom: errors.email && touched.email ? '2px solid red' : '2px solid #071330',
                  },
                '&:after': {
                  borderBottom: errors.email && touched.email ? '2px solid red' : '2px solid #071330',
                },
              }}
            />
            {errors.phoneNumber && touched.phoneNumber && (
              <Typography variant="body2" color="error">
                {errors.phoneNumber}
              </Typography>
            )}
          </FormControl>
          <FormControl
            variant="standard"
            error={errors.email && touched.email}
            sx={{ marginBottom: 2, width: '100%' }}
          >
            <InputLabel htmlFor="email" sx={{ color: errors.email && touched.email ? 'red' : '#071330', fontSize: '18px' }}>Email</InputLabel>
            <Input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              startAdornment={<InputAdornment position="start"><AlternateEmail sx={{ color: errors.email && touched.email ? 'red' : '#071330' }} /></InputAdornment>}
              sx={{ 
                color: errors.email && touched.email ? 'red' : '#071330', 
                '&:before': {
                    borderBottom: errors.email && touched.email ? '2px solid red' : '2px solid #071330',
                },
                '&:after': {
                    borderBottom: errors.email && touched.email ? '2px solid red' : '2px solid #071330',
                },
            }}
            />
            {errors.email && touched.email && (
              <Typography variant="body2" color="error">
                {errors.email}
              </Typography>
            )}
          </FormControl>
          <FormControl
            variant="standard"
            error={errors.password && touched.password}
            sx={{ marginBottom: 2, width: '100%' }}
          >
            <InputLabel htmlFor="password" sx={{ color: errors.password && touched.password ? 'red' : '#071330', fontSize: '18px' }}>Password</InputLabel>
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              startAdornment={<InputAdornment position="start"><LockOpen sx={{ color: errors.password && touched.password ? 'red' : '#071330' }} /></InputAdornment>}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={togglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff sx={{ color: errors.password && touched.password ? 'red' : '#071330' }} /> : <Visibility sx={{ color: errors.password && touched.password ? 'red' : '#071330' }} />}
                  </IconButton>
                </InputAdornment>
              }
              sx={{ 
                color: errors.password && touched.password ? 'red' : '#071330',
                '&:before': {
                    borderBottom: errors.email && touched.email ? '2px solid red' : '2px solid #071330',
                },
                '&:after': {
                    borderBottom: errors.email && touched.email ? '2px solid red' : '2px solid #071330',
                },
            }}
            />
            {errors.password && touched.password && (
              <Typography variant="body2" color="error">
                {errors.password}
              </Typography>
            )}
          </FormControl>
          {error && (
            <Typography variant="body2" sx={{ color: 'red', marginTop: 1 }}>
              Error occurred during registration
            </Typography>
          )}
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ 
                marginTop: "2rem",
                width: '120px',
                height: '50px',
                borderRadius: '30px',
                backgroundColor: '#385E72',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '14px',
                '&:hover': {
                    backgroundColor: '#071330',
                },
            }}
          >
            Register
          </Button>
          <Typography variant="body2" sx={{ marginTop: "1rem", color: '#071330', fontSize: "14px" }}>
            Already have an account?&nbsp;
            <Link 
            href="/login" 
            sx={{
                color: '#385E72',
                textDecoration: 'none',
                '&:hover': {
                  color: '#071330',
                  fontWeight: 'bold',
                },
                '&:active': {
                  color: '#071330',
                },
            }}
            >
              Login
            </Link>
          </Typography>
        </Box>
      )}
    </Formik>
  );
};

export default Form;

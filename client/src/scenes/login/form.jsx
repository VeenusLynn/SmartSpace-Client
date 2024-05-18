import React, { useState } from 'react';
import { Box, Button, Typography, Link, IconButton, InputAdornment, Input, FormControl, InputLabel } from '@mui/material';
import { Visibility, VisibilityOff, AlternateEmail, LockOpen } from '@mui/icons-material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from 'state';
import FlexBetween from 'components/FlexBetween';

const Form = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (values) => {
    const response = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      const data = await response.json();
      dispatch(setLogin(data));
      navigate('/dashboard');
    } else {
      setError(true);
    }
  };

  const handleRegisterClick = (event) => {
    event.preventDefault();
    navigate('/register');
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
      })}
      onSubmit={(values) => {
        handleLogin(values);
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
            error={errors.email && touched.email}
            sx={{ marginBottom: 2, width: '100%' }}
          >
            <InputLabel 
              htmlFor="email"
              sx={{
                color: errors.email && touched.email ? 'red' : '#071330',
                fontSize: '18px',
                '&.Mui-focused': {
                  color: errors.email && touched.email ? 'red' : '#071330',
                },
              }}
            >
              Email
            </InputLabel>
            <Input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              startAdornment={
                <InputAdornment position="start">
                  <AlternateEmail sx={{ color: errors.email && touched.email ? 'red' : '#071330' }} />
                </InputAdornment>
              }
              sx={{
                '&:before': {
                  borderBottom: errors.email && touched.email ? '2px solid red' : '2px solid #071330',
                },
                '&:after': {
                  borderBottom: errors.email && touched.email ? '2px solid red' : '2px solid #071330',
                },
                marginBottom: '2rem',
                color: '#071330',
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
            <InputLabel 
              htmlFor="password"
              sx={{
                color: errors.password && touched.password ? 'red' : '#071330',
                fontSize: '18px',
                '&.Mui-focused': {
                  color: errors.password && touched.password ? 'red' : '#071330',
                },
              }}
            >
              Password
            </InputLabel>
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              startAdornment={
                <InputAdornment position="start">
                  <LockOpen sx={{ color: errors.password && touched.password ? 'red' : '#071330' }} />
                </InputAdornment>
              }
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
                '&:before': {
                  borderBottom: errors.password && touched.password ? '2px solid red' : '2px solid #071330',
                },
                '&:after': {
                  borderBottom: errors.password && touched.password ? '2px solid red' : '2px solid #071330',
                },
                color: '#071330',
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
              Invalid email or password
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
            Login
          </Button>
          <FlexBetween>
            <Typography variant="body2" sx={{ marginTop: "1rem", color: '#071330', fontSize: "14px" }}>
              Don't have an account yet?&nbsp;
              <Link
                href="#"
                onClick={handleRegisterClick}
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
                Register now!
              </Link>
            </Typography>
          </FlexBetween>
        </Box>
      )}
    </Formik>
  );
};

export default Form;

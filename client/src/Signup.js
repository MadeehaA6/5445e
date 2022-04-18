import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import {
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from '@material-ui/core';
import GuestLayout from './components/layout/GuestLayout';

const useStyles = makeStyles(() => ({
  formControl: {
    margin: '1.5rem 0',
  },
}));
const Signup = ({ user, register }) => {
  const history = useHistory();
  const classes = useStyles();

  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements;
    const username = formElements.username.value;
    const email = formElements.email.value;
    const password = formElements.password.value;
    const confirmPassword = formElements.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: 'Passwords must match' });
      return;
    }
    await register({ username, email, password });
  };

  useEffect(() => {
    if (user && user.id) history.push('/home');
  }, [user, history]);

  return (
    <GuestLayout
      top={
        <>
          <Typography color="textSecondary">
            Already have an account?
          </Typography>
          <Button
            color="secondary"
            type="submit"
            variant="contained"
            size="large"
            onClick={() => {
              history.push('/login');
            }}
          >
            Login
          </Button>
        </>
      }
      bottom={
        <>
          <Typography variant="h1">
            <Box component="span" fontWeight="bold">
              Create an account.
            </Box>
          </Typography>
          <form onSubmit={handleRegister}>
            <FormControl fullWidth className={classes.formControl}>
              <TextField
                aria-label="username"
                label="Username"
                name="username"
                type="text"
                required
              />
            </FormControl>

            <FormControl fullWidth className={classes.formControl}>
              <TextField
                label="E-mail address"
                aria-label="e-mail address"
                type="email"
                name="email"
                required
              />
            </FormControl>

            <FormControl
              error={!!formErrorMessage.confirmPassword}
              fullWidth
              className={classes.formControl}
            >
              <TextField
                aria-label="password"
                label="Password"
                type="password"
                inputProps={{ minLength: 6 }}
                name="password"
                required
              />
              <FormHelperText>
                {formErrorMessage.confirmPassword}
              </FormHelperText>
            </FormControl>

            <FormControl
              error={!!formErrorMessage.confirmPassword}
              fullWidth
              className={classes.formControl}
            >
              <TextField
                fullWidth
                label="Confirm Password"
                aria-label="confirm password"
                type="password"
                inputProps={{ minLength: 6 }}
                name="confirmPassword"
                required
              />
              <FormHelperText>
                {formErrorMessage.confirmPassword}
              </FormHelperText>
            </FormControl>

            <Box align="center" sx={{ m: 2 }}>
              <Button
                color="primary"
                type="submit"
                variant="contained"
                size="large"
              >
                <Box sx={{ px: 2 }}> Create</Box>
              </Button>
            </Box>
          </form>
        </>
      }
    />
  );
};

export default Signup;

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MessengerButton from './components/UI/MessengerButton';
import {
  Box,
  Typography,
  FormControl,
  TextField,
  FormHelperText,
} from '@material-ui/core';
import GuestLayout from './components/layout/GuestLayout';
import MessengerForm from './components/UI/MessengerForm';

const Signup = ({ user, register }) => {
  const history = useHistory();

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
    <GuestLayout>
      <Box
        p={2}
        display="flex"
        gridGap={30}
        alignItems="center"
        alignSelf="end"
      >
        <Typography color="textSecondary">Already have an account?</Typography>
        <MessengerButton
          color="secondary"
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </MessengerButton>
      </Box>

      <MessengerForm formTitle="Create an account.">
        <form onSubmit={handleRegister}>
          <FormControl fullWidth>
            <TextField
              aria-label="username"
              label="Username"
              name="username"
              type="text"
              required
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              label="E-mail address"
              aria-label="e-mail address"
              type="email"
              name="email"
              required
            />
          </FormControl>

          <FormControl error={!!formErrorMessage.confirmPassword} fullWidth>
            <TextField
              aria-label="password"
              label="Password"
              type="password"
              inputProps={{ minLength: 6 }}
              name="password"
              required
            />
            <FormHelperText>{formErrorMessage.confirmPassword}</FormHelperText>
          </FormControl>

          <FormControl error={!!formErrorMessage.confirmPassword} fullWidth>
            <TextField
              fullWidth
              label="Confirm Password"
              aria-label="confirm password"
              type="password"
              inputProps={{ minLength: 6 }}
              name="confirmPassword"
              required
            />
            <FormHelperText>{formErrorMessage.confirmPassword}</FormHelperText>
          </FormControl>

          <Box align="center" m={2}>
            <MessengerButton color="primary">Create</MessengerButton>
          </Box>
        </form>
      </MessengerForm>
    </GuestLayout>
  );
};

export default Signup;

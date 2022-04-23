import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import GuestLayout from './components/layout/GuestLayout';
import { Box, Typography, FormControl, TextField } from '@material-ui/core';
import MessengerButton from './components/UI/MessengerButton';
import MessengerForm from './components/UI/MessengerForm';

const Login = ({ user, login }) => {
  const history = useHistory();

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements;
    const username = formElements.username.value;
    const password = formElements.password.value;

    await login({ username, password });
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
        <Typography color="textSecondary">Don’t have an account?</Typography>
        <MessengerButton
          color="secondary"
          onClick={() => {
            history.push('/register');
          }}
        >
          Create an account
        </MessengerButton>
      </Box>

      <MessengerForm formTitle="Welcome back!">
        <form onSubmit={handleLogin}>
          <FormControl required fullWidth>
            <TextField
              aria-label="username"
              label="Username"
              name="username"
              type="text"
            />
          </FormControl>

          <FormControl required fullWidth>
            <TextField
              label="password"
              aria-label="password"
              type="password"
              name="password"
            />
          </FormControl>
          <Box align="center" m={2}>
            <MessengerButton color="primary">Login</MessengerButton>
          </Box>
        </form>
      </MessengerForm>
    </GuestLayout>
  );
};

export default Login;

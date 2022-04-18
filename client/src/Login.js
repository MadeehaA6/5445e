import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import GuestLayout from './components/layout/GuestLayout';
import {
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  formControl: {
    margin: '1.5rem 0',
  },
}));

const Login = ({ user, login }) => {
  const history = useHistory();
  const classes = useStyles();

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
    <GuestLayout
      top={
        <>
          <Typography color="textSecondary">Don’t have an account?</Typography>
          <Button
            color="secondary"
            type="submit"
            variant="contained"
            size="large"
            onClick={() => {
              history.push('/register');
            }}
          >
            Create an account
          </Button>
        </>
      }
      bottom={
        <>
          <Typography variant="h1">
            <Box component="span" fontWeight="bold">
              Welcome back!
            </Box>
          </Typography>

          <form onSubmit={handleLogin}>
            <FormControl required fullWidth className={classes.formControl}>
              <TextField
                aria-label="username"
                label="Username"
                name="username"
                type="text"
              />
            </FormControl>

            <FormControl required fullWidth className={classes.formControl}>
              <TextField
                label="password"
                aria-label="password"
                type="password"
                name="password"
              />
            </FormControl>
            <Box align="center" sx={{ m: 2 }}>
              <Button
                color="primary"
                type="submit"
                variant="contained"
                size="large"
              >
                <Box sx={{ px: 2 }}> Login</Box>
              </Button>
            </Box>
          </form>
        </>
      }
    />
  );
};

export default Login;

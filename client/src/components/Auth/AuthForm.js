import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  Box,
  Typography,
  FormControl,
  TextField,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  formWrapper: {
    margin: "auto 0",
    width: "70%",

    "& > form > *": {
      marginTop: "2.375rem",
    },
  },
}));

function AuthForm(props) {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.formWrapper} alignSelf='center'>
        <Typography variant='h1'>
          <Box fontWeight='bold'>{props.formTitle}</Box>
        </Typography>

        <form onSubmit={props.onSubmit}>
          <FormControl required fullWidth>
            <TextField
              aria-label='username'
              label='Username'
              name='username'
              type='text'
            />
          </FormControl>

          <FormControl required fullWidth>
            <TextField
              label='password'
              aria-label='password'
              type='password'
              name='password'
            />
          </FormControl>

          {props.children}

          <Box align='center' m={2}>
            <Button color='primary' type='submit' variant='contained'>
              <Box p={1} px={4}>
                {props.onSubmitTitle}
              </Box>
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
}

export default AuthForm;

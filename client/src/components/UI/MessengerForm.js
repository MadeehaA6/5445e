import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Box, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  formWrapper: {
    margin: 'auto 0',
    width: '70%',

    '& > form > *': {
      marginTop: '2.375rem',
    },
  },
}));

function MessengerForm(props) {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.formWrapper} alignSelf="center">
        <Typography variant="h1">
          <Box fontWeight="bold"> {props.formTitle}</Box>
        </Typography>
        {props.children}
      </Box>
    </>
  );
}

export default MessengerForm;

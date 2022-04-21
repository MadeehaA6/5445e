import React from 'react';
import { Button, Box } from '@material-ui/core';

const MessengerButton = (props) => {
  return (
    <>
      <Button
        color={props.color}
        type="submit"
        variant="contained"
        size="large"
        onClick={props.onClick}
      >
        <Box px={2}>{props.children}</Box>
      </Button>
    </>
  );
};

export default MessengerButton;

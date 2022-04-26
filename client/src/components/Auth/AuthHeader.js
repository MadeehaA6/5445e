import React from "react";
import { Button, Box, Typography } from "@material-ui/core";

const MessengerButton = (props) => {
  return (
    <Box p={2} display="flex" gridGap={30} alignItems="center" alignSelf="end">
      <Typography color="textSecondary">{props.buttonLabel}</Typography>
      <Button
        color="secondary"
        type="submit"
        variant="contained"
        onClick={props.onClick}
      >
        <Box p={1}>{props.children}</Box>
      </Button>
    </Box>
  );
};

export default MessengerButton;

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  date: {
    fontSize: 11,
    color: '#BECCE2',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: '#91A3C0',
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: 'bold',
  },
  attachments: {
    aspectRatio: 1,
    objectFit: 'cover ',
    maxWidth: '200px',
  },
  bubble: {
    background: '#F4F6FA',
    borderRadius: '10px 10px 0 10px',
  },
}));

const SenderBubble = ({ time, attachments, text }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography className={classes.date}>{time}</Typography>
      <Box className={classes.bubble}>
        {attachments?.map((attachment) => {
          return (
            <img
              className={classes.attachments}
              key={attachment}
              src={attachment}
              alt={attachment}
            />
          );
        })}
        <Typography className={classes.text}>{text}</Typography>
      </Box>
    </Box>
  );
};

export default SenderBubble;

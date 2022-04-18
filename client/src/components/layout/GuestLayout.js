import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Grid, Box, Typography } from '@material-ui/core';
import bgImg from '../../assets/bg-img.png';
import bubble from '../../assets/bubble.svg';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
  },
  bgImg: {
    opacity: '0.85',
    backgroundImage: `linear-gradient(to top, rgba(58, 141, 255, 0.52 ) , rgba(134, 185, 255, 0.73 )), url(${bgImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'top center',
  },
  wrapper: {
    margin: 'auto 0',
  },
  formWrapper: {
    margin: 'auto 0',
    width: '50%',
  },
}));

const GuestLayout = (props) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid
        item
        xs={12}
        sm={6}
        className={classes.bgImg}
        container
        direction="column"
        alignContent="center"
      >
        <Box className={classes.wrapper} align="center" maxWidth={350}>
          <Box m={4}>
            <img src={bubble} alt="bubble" width="67" height="67" />
          </Box>
          <Box m={4}>
            <Typography variant="h1" color="secondary">
              Converse with anyone with any language
            </Typography>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12} sm={6} container direction="column">
        <Box
          sx={{ p: 2 }}
          display="flex"
          gridGap={30}
          alignItems="center"
          alignSelf="end"
        >
          {props.top}
        </Box>
        <Box className={classes.formWrapper} alignSelf="center">
          {props.bottom}
        </Box>
      </Grid>
    </Grid>
  );
};
export default GuestLayout;

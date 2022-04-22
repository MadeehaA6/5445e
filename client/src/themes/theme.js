import { createTheme } from '@material-ui/core';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
const breakpoints = createBreakpoints({});

export const theme = createTheme({
  typography: {
    fontFamily: 'Open Sans, sans-serif',
    fontSize: 14,
    fontWeightRegular: 400,
    button: {
      textTransform: 'none',
      letterSpacing: 0,
      fontWeight: 'bold',
    },
    h1: {
      fontSize: '1.2rem',
      lineHeight: '1.5',
      [breakpoints.up('md')]: {
        fontSize: '1.625rem',
      },
      [breakpoints.up('lg')]: {
        fontSize: '2.25rem',
      },
    },
    body1: {
      fontSize: '14px',
    },
  },

  overrides: {
    MuiInput: {
      input: {
        fontWeight: 'bold',
      },
    },
  },

  palette: {
    text: {
      primary: '#000000',
      secondary: '#B0B0B0',
    },
    primary: {
      main: '#3A8DFF',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ffffff',
      contrastText: '#3A8DFF',
    },
  },
});

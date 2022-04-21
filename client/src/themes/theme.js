import { createTheme } from '@material-ui/core';

export const theme = createTheme({
  typography: {
    fontFamily: 'Open Sans, sans-serif',
    fontSize: 14,
    button: {
      textTransform: 'none',
      letterSpacing: 0,
      fontWeight: 'bold',
    },
    h1: {
      fontSize: '1.25em',
      lineHeight: '1.5',
      '@media (min-width:600px)': {
        fontSize: '1.45em',
      },
      '@media (min-width:960px)': {
        fontSize: '1.625em',
      },
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

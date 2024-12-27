'use client';
import { createTheme } from '@mui/material';

const theme = createTheme({
  typography: {
    h1: {
      fontSize: '60px'
    },
    h2: {
      fontSize: '48px',
      '@media (max-width:600px)': {
        fontSize: '24px'
      }
    },
    h3: {
      fontSize: '36px'
    },
    h4: {
      fontSize: '30px',
      '@media (max-width:600px)': {
        fontSize: '18px'
      }
    },
    h5: {
      fontSize: '24px',
      '@media (max-width:600px)': {
        fontSize: '16px'
      }
    },
    h6: {
      fontSize: '20px',
      '@media (max-width:600px)': {
        fontSize: '16px'
      }
    },
    body1: {
      fontSize: '16px'
    },
    body2: {
      fontSize: '16px',
      color: '#676D75'
    }
  },
  palette: {
    primary: {
      main: '#0B3C95'
    },
    secondary: {
      main: '#F4F7FF'
    },
    text: {
      primary: '#252525',
      secondary: '#676D75'
    },
    error: {
      main: '#FF0000'
    },
    success: {
      main: '#28B446'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          padding: '16px 20px',
          maxWidth: 'fit-content'
        },
        sizeSmall: {
          fontSize: '14px'
        },
        sizeMedium: {
          fontSize: '16px'
        },
        sizeLarge: {
          fontSize: '18px'
        }
      }
    }
  }
});

export default theme;

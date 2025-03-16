import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4a90e2', // CodeKid blue from calculator app
      light: '#74b9ff',
      dark: '#2980b9'
    },
    secondary: {
      main: '#f5f6fa', // Light background from calculator
      light: '#ffffff',
      dark: '#e1e2e6'
    },
    text: {
      primary: '#2f3640' // Text color from calculator
    }
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          textTransform: 'none',
          padding: '10px 20px'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)'
        }
      }
    }
  }
});

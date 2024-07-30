import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#00ff00',
      },
      background: {
        default: '#2d2d2d',
        paper: '#3a3a3a',
      },
      text: {
        primary: '#ffffff',
      },
    },
    components: {
      MuiFilledInput: {
        styleOverrides: {
          root: {
            backgroundColor: '#dcdcdc',
            '&:hover': {
              backgroundColor: '#c0c0c0',
            },
            '&.Mui-focused': {
              backgroundColor: '#dcdcdc',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          contained: {
            color: '#000000',
          },
        },
      },
    },
  });
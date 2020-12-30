declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    customBackground: Palette['primary'];
  }
  interface PaletteOptions {
    customBackground: PaletteOptions['primary'];
  }
}

import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif'
  },
  palette: {
    primary: {
      main: '#405166',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#d85b43',
      contrastText: '#ffffff'
    },
    text: {
      primary: '#405166',
      secondary: '#253242',
      disabled: '#79889c',
      hint: '#79889c'
    },
    customBackground: {
      light: '#ffffff',
      main: '#eaf0f6',
      dark: '#33475b'
    },
  },
});

export default theme;

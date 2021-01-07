declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    backgrounds: {
      main: string;
      input: string;
      dialog: string;
    };
    sectionStyles: {
      hero?: customColors;
      banner?: customColors;
      contact?: customColors;
      gallery?: customColors;
      cards?: customColors;
      location?: customColors;
      quote?: customColors;
      text?: customColors;
      textWithImage?: customColors;
    };
    componentStyles: {
      navigation?: {
        main: customColors;
        dialog: customColors;
        transparent?: customColors;
      };
      footer?: customColors;
      input?: customColors;
      dialog?: customColors;
    }
  }
  interface PaletteOptions {
    backgrounds: {
      main: string;
      input: string;
      dialog: string;
    };
    sectionStyles: {
      hero?: customColors;
      banner?: customColors;
      contact?: customColors;
      gallery?: customColors;
      cards?: customColors;
      location?: customColors;
      quote?: customColors;
      text?: customColors;
      textWithImage?: customColors;
    };
    componentStyles: {
      navigation?: {
        main: customColors;
        dialog: customColors;
        transparent?: customColors;
      };
      footer?: customColors;
      input?: customColors;
      dialog?: customColors;
    }
  }
}

type customColors = {
  text?: string;
  textStrong?: string;
  textLight?: string;
  background?: string;
  textShadow?: string;
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
      hint: '#79889c'
    },
    backgrounds: {
      main: '#ffffff',
      input: '#ffffff',
      dialog: '#202020'
    },
    componentStyles: {
      navigation: {
        main: {
        },
        dialog: {
          background: 'linear-gradient(150deg,rgba(64, 81, 102,.6) 0%,rgba(64, 81, 102,1) 100%), linear-gradient(150deg,#ffffff 0%,#ffffff 100%)',
          text: '#ffffff'
        }
      },
      footer: {
      },
      dialog: {
      },
      input: {}
    },
    sectionStyles: {
      hero: {
        background: 'linear-gradient(150deg,rgba(64, 81, 102,.4) 0%,rgba(64, 81, 102,.4) 100%)',
        text: '#ffffff',
        textShadow: 'rgb(64, 81, 102)'
      },
      banner: {
        background: 'linear-gradient(150deg,rgba(64, 81, 102,.9) 0%,rgba(64, 81, 102,.85) 100%)',
        text: '#ffffff'
      },
      contact: {
      },
      gallery: {
      },
      cards: {
      },
      location: {
      },
      quote: {
      },
      text: {
      },
      textWithImage: {
      },
    }
  },
});

export default theme;

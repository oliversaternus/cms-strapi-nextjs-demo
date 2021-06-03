declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    backgrounds: {
      main: string;
      input: string;
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
export const themeDefault = createMuiTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif'
  },
  palette: {
    primary: {
      main: '#2d1582',
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
      input: '#ffffff'
    },
    componentStyles: {
      navigation: {
        main: {
        },
        dialog: {
          background: 'linear-gradient(150deg,rgba(64, 81, 102,0) 0%,rgba(64, 81, 102,0) 100%), linear-gradient(150deg,#ffffff 0%,#ffffff 100%)'
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
        background: 'linear-gradient(150deg,rgba(76, 64, 120,.4) 0%,rgba(76, 64, 120,.4) 100%)',
        text: '#ffffff',
        textShadow: 'rgb(64, 81, 102)'
      },
      banner: {
        background: 'linear-gradient(150deg,rgba(96, 81, 150,.8) 0%,rgba(96, 81, 150,.6) 100%)',
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

export const themeLight = createMuiTheme({
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
      input: '#ffffff'
    },
    componentStyles: {
      navigation: {
        main: {
        },
        dialog: {
          background: 'linear-gradient(150deg,rgba(64, 81, 102,0) 0%,rgba(64, 81, 102,0.2) 100%), linear-gradient(150deg,#ffffff 0%,#ffffff 100%)',
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
        background: 'linear-gradient(150deg,rgba(255,255,255,.4) 0%,rgba(255,255,255,.4) 100%)'
      },
      banner: {
        background: 'linear-gradient(150deg,rgba(255,255,255,.85) 0%,rgba(255,255,255,.85) 100%)',
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

export const themeDark = createMuiTheme({
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
      primary: '#d2d2d2',
      secondary: '#ffffff',
      hint: '#dddddd'
    },
    backgrounds: {
      main: '#202020',
      input: '#202020'
    },
    componentStyles: {
      navigation: {
        main: {
        },
        dialog: {
          background: '#282828',
          text: '#ffffff'
        }
      },
      footer: {
      },
      dialog: {
      },
      input: {
        background: '#282828'
      }
    },
    sectionStyles: {
      hero: {
        background: 'linear-gradient(150deg,rgba(32,32,32,.4) 0%,rgba(32,32,32,.4) 100%)'
      },
      banner: {
        background: 'linear-gradient(150deg,rgba(32,32,32,.85) 0%,rgba(32,32,32,.85) 100%)',
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

import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    neutral: {
      main: '#384146',
      light: '#4b565e',
      dark: '#262b2f',
      contrastText: '#fff',
    },
    primary: {
      main: '#00AF66',
      light: '#b8c3ff',
      dark: '#4DC794',
      contrastText: '#fff',
    },
    secondary: {
      main: '#E5F7F0',
      light: '#4DC794',
      dark: '#4DC794',
      contrastText: '#FFF',
    },
    tertiary: {
      main: '#38656a',
      light: '#6b989d',
      dark: '#1e4d52',
      contrastText: '#fff',
    },
    accent: {
      main: '#00AF66',
      light: '#b8c3ff',
      dark: '#4DC794',
      contrastText: '#fff',
    },
    success: {
      main: '#027a48',
      light: '#05603a',
      dark: '#12b76a',
      contrastText: '#fff',
    },
    error: {
      main: '#b42318',
      light: '#f04438',
      dark: '#912018',
      contrastText: '#fff',
    },
    warning: {
      main: '#b54708',
      light: '#f79009',
      dark: '#93370d',
      contrastText: '#fff',
    },
    info: {
      main: '#026aa2',
      light: '#0ba5ec',
      dark: '#065986',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: 'monospace',
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize: '1rem',
          border: `1px solid #00AF66`,
        },
      },
    },
  },
});

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    tertiary: true;
  }
}
declare module '@mui/material/styles' {
  interface Palette {
    accent: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    accent?: PaletteOptions['primary'];
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    accent: true;
  }
}
declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

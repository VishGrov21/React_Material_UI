import { createMuiTheme } from '@material-ui/core/styles';

// Declaring the variables for the colors
const arcBlue = '#0B72B9';
const arcOrange = '#FFBA60';

export default createMuiTheme({
  palette: {
    common: {
      blue: `${arcBlue}`,
      orange: `${arcOrange}`,
    },
    primary: {
      main: `${arcBlue}`,
    },
    secondary: {
      main: `${arcOrange}`,
    },
  },
  typography: {
    tab: {
      fontFamily: 'Raleway',
      textTransform: 'none',
      fontWeight: '500',
      fontSize: '1.2rem',
    },
  },
  button: {
    textTransform: 'none',
    estimate: {
      fontFamily: 'pacifico',
      color: 'white',
      fontSize: '1rem',
    },
  },
});

import red from '@material-ui/core/colors/red';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#fff',
    },
    error: {
      main: red.A400,
    },
    primary: {
      main: '#2196BD',
    },
    secondary: {
      main: '#FFC107',
    },
  },
});

export default theme;

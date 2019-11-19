// tslint:disable:no-magic-numbers
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  dropdown: {
    '&:hover': {
      background: 'red',
    },
    alignItems: 'center',
    display: 'flex',
  },
}));

export default useStyles;

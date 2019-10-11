// tslint:disable:no-magic-numbers
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  rating: {
    alignItems: 'center',
    display: 'flex',
  },
  ratingValue: {
    color: 'grey',
    fontSize: '12px',
    fontWeight: 600,
    marginLeft: '6px'
  },
}));

export default useStyles;

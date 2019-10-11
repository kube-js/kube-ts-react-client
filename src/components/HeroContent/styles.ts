// tslint:disable:no-magic-numbers
import { makeStyles, Theme } from '@material-ui/core/styles';
// Photo by Alexis Brown on Unsplash
import heroImage from '../../images/heroImage.jpg';

const useStyles = makeStyles((theme: Theme) => ({
  heroContainer: {
    backgroundImage: `url(${heroImage})`,
    backgroundSize: 'cover',
    padding: theme.spacing(10, 0, 6),
  },
  heroContent: {
    margin: '0 auto',
  },
  root: {
    flexGrow: 1,
  },
  searchBox: {
    
  }
}));

export default useStyles;

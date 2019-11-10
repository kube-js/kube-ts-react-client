// tslint:disable:no-magic-numbers
import {
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
      marginTop: theme.spacing(2),
      minHeight: '150px',
      padding: theme.spacing(2),
    },
  })
);

export default useStyles;

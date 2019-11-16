// tslint:disable:no-magic-numbers
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      border: '1px solid rgba(0, 0, 0, .125)',
      color: theme.palette.text.primary,
      marginTop: theme.spacing(3),
      padding: theme.spacing(2),
    },
  })
);

export default useStyles;

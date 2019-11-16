import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    itemImage: {
      height: 60,
      width: 100,
    },
    root: {
      border: '1px solid rgba(0, 0, 0, .125)',
      // tslint:disable-next-line:no-magic-numbers
      marginTop: theme.spacing(3),
      overflowX: 'auto',
      width: '100%',
    },
    table: {},
  })
);

export default useStyles;

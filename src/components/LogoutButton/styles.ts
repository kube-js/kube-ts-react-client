import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      // tslint:disable-next-line:no-magic-numbers
      margin: theme.spacing(1, 1.5),
    },
  })
);

export default useStyles;

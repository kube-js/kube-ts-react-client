// tslint:disable:no-magic-numbers
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import _isNil from 'ramda/src/isNil';
import React from 'react';
import Autocomplete from '../../atoms/Autocomplete';
import useStyles from './styles';

const HeroContent = () => {
  const classes = useStyles();

  return (
    <div className={classes.heroContainer}>
      <Container className={classes.heroContent} maxWidth="sm">
        <Grid item md={12} sm={12}>
          <Typography
            component="h2"
            variant="h3"
            align="center"
            color="textPrimary"
            gutterBottom
            style={{ color: '#fff' }}
          >
            Learn without limits
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="textSecondary"
            paragraph
            style={{ color: '#fff' }}
          >
            Find any course and topic and start learning today.
          </Typography>
          <div className={classes.searchBox}>
            <Autocomplete />
          </div>
        </Grid>
      </Container>
    </div>
  );
};

// tslint:disable-next-line:max-file-line-count
export default HeroContent;

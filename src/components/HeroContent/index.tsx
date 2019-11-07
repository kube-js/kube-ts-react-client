// tslint:disable:no-magic-numbers
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import _isNil from 'ramda/src/isNil';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Autocomplete from '../../atoms/Autocomplete';
import useStyles from './styles';

const HeroContent = () => {
  const classes = useStyles();
  const { t } = useTranslation();

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
            {t('heroContent.mainHeading')}
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="textSecondary"
            paragraph
            style={{ color: '#fff' }}
          >
            {t('heroContent.subHeading')}
          </Typography>
          <div className={classes.searchBox}>
            <Autocomplete id="heroContent" type="heroContent" />
          </div>
        </Grid>
      </Container>
    </div>
  );
};

// tslint:disable-next-line:max-file-line-count
export default HeroContent;

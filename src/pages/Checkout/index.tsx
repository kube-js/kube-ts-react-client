// tslint:disable:no-magic-numbers
import { Container, Grid, Typography } from '@material-ui/core';
import _isNil from 'ramda/src/isNil';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Elements } from 'react-stripe-elements';
import PaymentForm from '../../components/PaymentForm';
import useStyles from './styles';

const CheckoutView = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <Container
        component="div"
        className={classes.topSection}
        maxWidth={false}
      >
        <Container component="div" maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={9}>
              <Typography variant="h1" className={classes.mainHeadline}>
                {t('checkout.mainHeadline')}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Container>
      <Container>
        <Elements>
          <PaymentForm />
        </Elements>
      </Container>
    </div>
  );
};

// tslint:disable-next-line:max-file-line-count
export default CheckoutView;

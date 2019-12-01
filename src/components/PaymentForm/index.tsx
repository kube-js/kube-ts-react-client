// tslint:disable:no-magic-numbers
import { Button, Grid, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CardCVCElement,
  CardExpiryElement,
  CardNumberElement,
  injectStripe,
} from 'react-stripe-elements';
import StripeElementWrapper from '../../atoms/StripeElementWrapper';
import useStyles from './styles';

// reference: https://github.com/mui-org/material-ui/issues/16037
// https://gist.github.com/lfalke/1c5e7168424c8b2a65dcfba425fcc310

const PaymentForm = (props: any) => {
  const classes = useStyles();
  const [paying, setPaying] = useState(false);
  const [name, setName] = useState('');

  const { t } = useTranslation();
  const handleSubmit = async (ev: any) => {
    ev.preventDefault();
    if (props.stripe) {
      setPaying(true);
      props.stripe
        .createToken({type: 'card', name: 'Jenny Rosen'})
        // tslint:disable-next-line:no-console
        .then((payload: any) => console.log('[token]', payload))
        .finally(() => {
          setPaying(false);
        });
    } else {
      // tslint:disable-next-line:no-console
      console.log("Stripe.js hasn't loaded yet.");
    }
  };

  return (
    <form className={classes.form} noValidate onSubmit={handleSubmit}>
      <Grid container spacing={1} className={classes.root}>
        <Grid item xs={12} sm={9}>
          <Paper className={classes.paymentSection}>
            <div className={classes.cardNumber}>
              <StripeElementWrapper
                id="number"
                label={t('payment.cardNumber')}
                name="number"
                component={CardNumberElement}
              />
            </div>

            <div className={classes.cvcAndExpiry}>
              <div className={classes.expiry}>
                <StripeElementWrapper
                  id="expiry"
                  label={t('payment.expiry')}
                  name="expiry"
                  component={CardExpiryElement}
                />
              </div>
              <div className={classes.cvc}>
                <StripeElementWrapper
                  id="cvc"
                  label={t('payment.cvc')}
                  name="cvc"
                  component={CardCVCElement}
                />
              </div>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3} className={classes.gridSidebar}>
          <Paper className={classes.summarySidebar}>
            <Button
              disabled={paying}
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              size="large"
            >
              {t('checkout.buyNow')}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </form>
  );
};
// tslint:disable-next-line:max-file-line-count
export default injectStripe(PaymentForm);

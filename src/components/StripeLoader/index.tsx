import React, { useEffect, useState } from 'react';
import config from '../../config';

const StripeLoader = ({ children: Component, locale, ...props }: any) => {
  const [stripe, setStripe] = useState(null);
  // tslint:disable-next-line:no-magic-numbers
  const language = Boolean(locale) ? String(locale).substr(0, 2) : 'en';
  
  useEffect(() => {
    const stripeKey = config.stripe.publishableKey;
    const options = { locale: language };
    if (typeof window.Stripe === 'function') {
      setStripe((window as any).Stripe(stripeKey, options));
    } else {
      (document.querySelector('#stripe-js') as any).addEventListener(
        'load',
        () => {
          // Create Stripe instance once Stripe.js loads
          setStripe((window as any).Stripe(stripeKey, options));
        }
      );
    }
  }, []);

  return <Component {...props} stripe={stripe} />;
};

export default StripeLoader;

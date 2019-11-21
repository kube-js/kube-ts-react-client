// tslint:disable:no-magic-numbers
import { Container, Grid, Typography } from '@material-ui/core';
import _isNil from 'ramda/src/isNil';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import CartCheckoutSidebar from '../../components/CartCheckoutSidebar';
import CartItems from '../../components/CartItems';
import { removeCartItem } from '../../redux/cart/actionCreators';
import { State } from '../../redux/rootReducer';
import useStyles from './styles';

const CartView = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const { items } = useSelector((state: State) => state.cart);

  const dispatch = useDispatch();

  const courseItems = items.map(item => ({ ...item, price: 19.99 }));

  const removeItem = (id: string) => (e: any) => {
    e.preventDefault();
    dispatch(removeCartItem(id));
  };

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
                {t('cart.mainHeadline')}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Container>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={items.length > 0 ? 9 : 12}>
            <CartItems items={courseItems} removeItem={removeItem} />
          </Grid>
          {items.length > 0 ? (
            <Grid item xs={12} sm={3}>
              <CartCheckoutSidebar items={courseItems} />
            </Grid>
          ) : null}
        </Grid>
      </Container>
    </div>
  );
};

// tslint:disable-next-line:max-file-line-count
export default CartView;

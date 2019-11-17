// tslint:disable:no-magic-numbers
import { Container, Grid, Typography } from '@material-ui/core';
import _isNil from 'ramda/src/isNil';
import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { removeCartItem } from '../../redux/cart/actionCreators';
import { State } from '../../redux/rootReducer';
import CartCheckoutSidebar from '../CartCheckoutSidebar';
import CartItems from '../CartItems';
import useStyles from './styles';

const CartView = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const { search } = useLocation();

  const params = new URLSearchParams(search);

  const newItemId = params.get('newItemId');

  const initialState = !newItemId;

  const [editMode, setEditMode] = useState(initialState);

  const toggleEditMode = (e: any) => {
    e.preventDefault();

    return setEditMode(!editMode);
  };

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
          {editMode ? (
            <>
              <Grid item xs={12} sm={9}>
                <CartItems items={courseItems} removeItem={removeItem} />
              </Grid>
              <Grid item xs={12} sm={3}>
                <CartCheckoutSidebar items={courseItems} />
              </Grid>
            </>
          ) : null}
        </Grid>
      </Container>
    </div>
  );
};

// tslint:disable-next-line:max-file-line-count
export default memo(CartView);

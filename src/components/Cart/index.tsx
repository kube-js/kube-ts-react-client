// tslint:disable:no-magic-numbers
import { Container, Grid, Typography } from '@material-ui/core';
import _isNil from 'ramda/src/isNil';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import CartCheckoutSidebar from '../CartCheckoutSidebar';
import CartItems from '../CartItems';
import useStyles from './styles';

// TODO: get data from redux
const items: any[] = [
  {
    author: 'Martin Cook',
    id: 1,
    price: 19.99,
    slug: 'designing-microservices-architecture',
    title: 'Designing microservices architecture',
  },
  {
    author: 'Thomas Tik',
    id: 2,
    price: 19.99,
    slug: 'designing-microservices-architecture',
    title: 'Designing microservices architecture',
  },
  {
    author: 'Thomas Tik',
    id: 3,
    price: 19.99,
    slug: 'designing-microservices-architecture',
    title: 'Designing microservices architecture',
  },
];

const CartView = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  // const { course, getCourseDetailsLoading } = useSelector(
  //   (state: State) => state.courseDetails
  // );

  // const dispatch = useDispatch();

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
          <Grid item xs={12} sm={9}>
            <CartItems items={items} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <CartCheckoutSidebar items={items} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

// tslint:disable-next-line:max-file-line-count
export default memo(CartView);

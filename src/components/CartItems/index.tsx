import { Button, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
// tslint:disable:no-magic-numbers
import TableRow from '@material-ui/core/TableRow';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import _isNil from 'ramda/src/isNil';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router';
import courseImagePlaceholder from '../../images/course_400x180.png';
import { EnhancedCourse } from '../../redux/discoveryItems/actionCreators';
import assetsUrl from '../../utils/helpers/assetsUrl';
import sumBy from '../../utils/helpers/sumBy';
import useStyles from './styles';

export interface Options {
  readonly items: EnhancedCourse[];
  readonly removeItem: (id: string) => (e: any) => void;
}

const CartItems = ({ items, removeItem }: Options) => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();

  const goTo = (url: string) => (e: any) => {
    e.preventDefault();
    history.push(url);
  };

  const courses = items.length === 1 ? t('cart.item') : t('cart.items');
  const total = sumBy('price')(items);

  const { search } = useLocation();

  const params = new URLSearchParams(search);

  const newItemId = params.get('newItemId');

  const initialState = !newItemId;

  const [isEditable, setIsEditable] = useState(initialState);

  const enableEditing = (e: any) => {
    e.preventDefault();

    return setIsEditable(true);
  };

  const addedItem = items.find(item => item.id === newItemId);
  let addedItemImageUrl;

  if (addedItem !== undefined) {
    addedItemImageUrl =
      addedItem !== undefined && _isNil(addedItem.imageUrl)
        ? courseImagePlaceholder
        : assetsUrl(addedItem.imageUrl);
  }

  return (
    <Paper className={classes.root} square>
      <Table className={classes.table} aria-label="table">
        {isEditable || addedItem === undefined ? (
          <>
            {items.length > 0 ? (
              <TableHead>
                <TableRow>
                  <TableCell colSpan={3}></TableCell>
                  <TableCell align="right">{t('cart.price')}</TableCell>
                </TableRow>
              </TableHead>
            ) : null}
            <TableBody>
              {items.map((item: any) => {
                const imageUrl = _isNil(item.imageUrl)
                  ? courseImagePlaceholder
                  : assetsUrl(item.imageUrl);

                return (
                  <TableRow key={item.title}>
                    <TableCell>
                      <img
                        alt={item.title}
                        src={imageUrl}
                        className={classes.itemImage}
                      />
                    </TableCell>
                    <TableCell>
                      <a
                        onClick={goTo(`/courses/${item.slug}`)}
                        style={{ cursor: 'pointer' }}
                      >
                        <Typography variant="subtitle1">{item.title}</Typography>
                      </a>
                      <p>
                        {t('cart.instructor')}: {item.user.firstName}{' '}
                        {item.user.lastName}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Button size="small" onClick={removeItem(item.id)}>
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                    <TableCell align="right">{item.price}</TableCell>
                  </TableRow>
                );
              })}
              {items.length > 0 ? (
                <TableRow>
                  <TableCell colSpan={3} />
                  <TableCell align="right">
                    {t('cart.total')} ({items.length} {courses}): £{total}
                  </TableCell>
                </TableRow>
              ) : null}

              {items.length === 0 ? (
                <TableRow>
                  <TableCell>
                    <Typography variant="h6">
                      {t('cart.yourCartIsEmpty')}
                    </Typography>
                    <Button size="small" onClick={goTo('/')}>
                      <ShoppingCartIcon /> {t('cart.keepShopping')}
                    </Button>
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </>
        ) : null}
        {!isEditable && addedItem !== undefined ? (
          <TableBody>
            <TableRow>
              <TableCell>
                <div className={classes.addedToBasket}>
                  <div className={classes.addedToBasketImageWrapper}>
                    <img
                      alt={addedItem.title}
                      src={addedItemImageUrl}
                      className={classes.itemImage}
                    />
                  </div>
                  <div className={classes.addedToBasketContent}>
                    <CheckIcon />
                    <Typography>{t('cart.addedToCart')}</Typography>
                  </div>
                </div>
              </TableCell>
              <TableCell colSpan={2}>
                <a onClick={goTo(addedItem.slug)} style={{ cursor: 'pointer' }}>
                  {addedItem.title}
                </a>
              </TableCell>
              <TableCell align="right">
                <Button size="small" onClick={enableEditing}>
                  <EditIcon /> {t('cart.editCart')}
                </Button>
              </TableCell>
              <TableCell align="right">
                {t('cart.total')} ({items.length} {courses}): £{total}
              </TableCell>
            </TableRow>
          </TableBody>
        ) : null}
      </Table>
    </Paper>
  );
};

// tslint:disable-next-line:max-file-line-count
export default CartItems;

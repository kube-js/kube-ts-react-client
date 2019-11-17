import { Button, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
// tslint:disable:no-magic-numbers
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import _isNil from 'ramda/src/isNil';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import courseImagePlaceholder from '../../images/course_400x180.png';
import assetsUrl from '../../utils/helpers/assetsUrl';
import sumBy from '../../utils/helpers/sumBy';
import useStyles from './styles';

const CartItems = ({ items, removeItem }: any) => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();

  const goTo = (slug: string) => (e: any) => {
    e.preventDefault();
    history.push(`/courses/${slug}`);
  };

  const courses = items.length === 1 ? t('cart.item') : t('cart.items');
  const total = sumBy('price')(items);

  return (
    <Paper className={classes.root} square>
      <Table className={classes.table} aria-label="table">
        <TableHead>
          <TableRow>
            <TableCell colSpan={3}></TableCell>
            <TableCell align="right">{t('cart.price')}</TableCell>
          </TableRow>
        </TableHead>
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
                <TableCell colSpan={2}>
                  <a
                    onClick={goTo(item.slug)}
                    style={{ cursor: 'pointer' }}
                  >
                    {item.title}
                  </a>
                  <Button size="small" onClick={removeItem(item.id)}>
                    <DeleteIcon />
                  </Button>
                </TableCell>
                <TableCell align="right">{item.price}</TableCell>
              </TableRow>
            );
          })}
          <TableRow>
            <TableCell colSpan={3} />
            <TableCell align="right">
              {t('cart.total')} ({items.length} {courses}): £{total}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};

export default CartItems;

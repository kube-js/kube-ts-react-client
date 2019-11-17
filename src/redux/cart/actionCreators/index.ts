import { EnhancedCourse } from '../../discoveryItems/actionCreators';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../actions/index';

export const addCartItem = (item: EnhancedCourse) => ({
  payload: {
    item,
  },
  type: CART_ADD_ITEM,
});

export const removeCartItem = (id: string) => ({
  payload: {
    id,
  },
  type: CART_REMOVE_ITEM,
});

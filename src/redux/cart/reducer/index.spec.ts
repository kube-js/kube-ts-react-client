import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../actions';
import usersReducer from './index';

describe('@cartReducer', () => {
  const initialState = {
    items: [],
  };

  it('returns initial state', () => {
    const result = usersReducer();

    expect(result).toEqual(initialState);
  });

  it('returns state for CART_ADD_ITEM', () => {
    const item = {
      id: '1',
    } as any;

    const action = {
      payload: {
        item,
      },
      type: CART_ADD_ITEM,
    };

    const items = [item];

    const result = usersReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      items,
    });
  });

  it('returns state for CART_REMOVE_ITEM', () => {
    const itemOne: any = {
      id: '1',
    };
    const itemTwo: any = {
      id: '2',
    };

    const action = {
      payload: {
        id: '1',
      },
      type: CART_REMOVE_ITEM,
    };

    const items = [itemOne, itemTwo];

    const result = usersReducer({ ...items, items }, action);

    expect(result).toEqual({
      ...initialState,
      items: [itemTwo],
    });
  });
});

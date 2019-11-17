import { EnhancedCourse } from '../../discoveryItems/actionCreators';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../actions';

export interface ReduxAction {
  readonly type?: string;
  readonly payload?: any;
}

export interface CartState {
  readonly items: EnhancedCourse[];
}

const initialState: CartState = {
  items: [],
};

const coursesReducer = (
  state: CartState = initialState,
  action: ReduxAction = {}
) => {
  switch (action.type) {
    case CART_ADD_ITEM: {
      if (
        state.items.find(item => item.id === action.payload.item.id) !==
        undefined
      ) {
        return state;
      }

      return {
        items: [...state.items, action.payload.item],
      };
    }

    case CART_REMOVE_ITEM: {
      return {
        items: state.items.filter(item => item.id !== action.payload.id),
      };
    }

    default:
      return state;
  }
};

export default coursesReducer;

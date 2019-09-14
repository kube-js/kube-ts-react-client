import Course from '../../../types/items/Course';
import {
  GET_CATEGORIES_FAILED,
  GET_CATEGORIES_REQUESTED,
  GET_CATEGORIES_SUCCEEDED,
} from '../actions';

export interface ReduxAction {
  readonly type?: string;
  readonly payload?: any;
}

export interface CategoriesState {
  readonly after?: string;
  readonly before?: string;
  readonly hasAfter?: boolean;
  readonly hasBefore?: boolean;
  readonly getCategoriesError?: any;
  readonly getCategoriesLoading?: boolean;
  readonly items?: Course[];
}

const initialState: CategoriesState = {
  after: undefined,
  before: undefined,
  getCategoriesError: null,
  getCategoriesLoading: false,
  hasAfter: false,
  hasBefore: false,
  items: [],
};

const categoriesReducer = (
  state: CategoriesState = initialState,
  action: ReduxAction = {}
) => {
  switch (action.type) {
    case GET_CATEGORIES_REQUESTED: {
      return { ...state, getCategoriesError: null, getCategoriesLoading: true };
    }

    case GET_CATEGORIES_SUCCEEDED: {
      const { items , cursor} = action.payload;

      return {
        ...state,
        items,
        ...cursor,
        getCategoriesError: null,
        getCategoriesLoading: false,
      };
    }

    case GET_CATEGORIES_FAILED: {
      return {
        ...initialState,
        getCategoriesError: action.payload.error,
        getCategoriesLoading: false,
      };
    }
  
    default:
      return state;
  }
};

export default categoriesReducer;

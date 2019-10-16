import { AutocompleteResults } from '../actionCreators';
import {
  AUTOCOMPLETE_FAILED,
  AUTOCOMPLETE_REQUESTED,
  AUTOCOMPLETE_SUCCEEDED,
} from '../actions';

export interface ReduxAction {
  readonly type?: string;
  readonly payload?: any;
}

export interface AutocompleteState extends AutocompleteResults {
  readonly autocompleteError?: any;
  readonly autocompleteLoading?: boolean;
}

const initialState: AutocompleteState = {
  autocompleteError: null,
  autocompleteLoading: false,
  courses: [],
  users: [],
};

const autocompleteReducer = (
  state: AutocompleteState = initialState,
  action: ReduxAction = {}
) => {
  switch (action.type) {
    case AUTOCOMPLETE_REQUESTED: {
      return {
        ...state,
        autocompleteError: null,
        autocompleteLoading: true,
      };
    }

    case AUTOCOMPLETE_SUCCEEDED: {
      return {
        ...state,
        ...action.payload,
        autocompleteError: null,
        autocompleteLoading: false,
      };
    }

    case AUTOCOMPLETE_FAILED: {
      return {
        ...initialState,
        autocompleteError: action.payload.error,
        autocompleteLoading: false,
      };
    }

    default:
      return state;
  }
};

export default autocompleteReducer;

import { DiscoveryItemsResult } from '../actionCreators';
import {
  GET_DISCOVERY_ITEMS_FAILED,
  GET_DISCOVERY_ITEMS_REQUESTED,
  GET_DISCOVERY_ITEMS_SUCCEEDED,
} from '../actions';

export interface ReduxAction {
  readonly type?: string;
  readonly payload?: any;
}

export interface DiscoveryItemsState extends DiscoveryItemsResult {
  readonly getDiscoveryItemsError?: any;
  readonly getDiscoveryItemsLoading?: boolean;
}

const initialState: DiscoveryItemsState = {
  bestSellers: {
    categories: [],
    courses: [],
  },
  getDiscoveryItemsError: null,
  getDiscoveryItemsLoading: false,
  mostViewed: {
    courses: [],
  },
};

const discoveryItemsReducer = (
  state: DiscoveryItemsState = initialState,
  action: ReduxAction = {}
) => {
  switch (action.type) {
    case GET_DISCOVERY_ITEMS_REQUESTED: {
      return {
        ...state,
        getDiscoveryItemsError: null,
        getDiscoveryItemsLoading: true,
      };
    }

    case GET_DISCOVERY_ITEMS_SUCCEEDED: {

      return {
        ...state,
        ...action.payload,
        getDiscoveryItemsError: null,
        getDiscoveryItemsLoading: false,
      };
    }

    case GET_DISCOVERY_ITEMS_FAILED: {
      return {
        ...initialState,
        getDiscoveryItemsError: action.payload.error,
        getDiscoveryItemsLoading: false,
      };
    }

    default:
      return state;
  }
};

export default discoveryItemsReducer;

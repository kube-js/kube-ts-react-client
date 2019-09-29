import {
  GET_DISCOVERY_ITEMS_FAILED,
  GET_DISCOVERY_ITEMS_REQUESTED,
  GET_DISCOVERY_ITEMS_SUCCEEDED,
} from '../actions';
import discoveryItemsReducer from './index';

describe('@discoveryItemsReducer', () => {
  const error = new Error('test');

  const initialState = {
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

  it('returns initial state', () => {
    const result = discoveryItemsReducer();

    expect(result).toEqual(initialState);
  });

  it('returns state for GET_DISCOVERY_ITEMS_REQUESTED', () => {
    const action = { type: GET_DISCOVERY_ITEMS_REQUESTED };

    const result = discoveryItemsReducer(undefined, action);

    expect(result).toEqual({
      ...initialState,
      getDiscoveryItemsError: null,
      getDiscoveryItemsLoading: true,
    });
  });

  it('returns state for GET_DISCOVERY_ITEMS_SUCCEEDED', () => {
    const payload = {
      bestSellers: {
        categories: [{ id: '5' }],
        courses: [
          {
            id: '2',
          },
        ],
      },
      mostViewed: {
        courses: [
          {
            id: '1',
          },
        ],
      },
    };

    const action = {
      payload: {
        ...payload,
        getDiscoveryItemsError: null,
        getDiscoveryItemsLoading: false,
      },
      type: GET_DISCOVERY_ITEMS_SUCCEEDED,
    };

    const result = discoveryItemsReducer(
      {
        ...initialState,
        getDiscoveryItemsError: error,
        getDiscoveryItemsLoading: true,
      },
      action
    );

    expect(result).toEqual({
      ...payload,
      getDiscoveryItemsError: null,
      getDiscoveryItemsLoading: false,
    });
  });

  it('returns state for GET_DISCOVERY_ITEMS_FAILED', () => {
    const payload = { error };

    const action = { type: GET_DISCOVERY_ITEMS_FAILED, payload };

    const result = discoveryItemsReducer(
      {
        ...initialState,
        getDiscoveryItemsLoading: true,
      },
      action
    );

    expect(result).toEqual({
      ...initialState,
      getDiscoveryItemsError: error,
      getDiscoveryItemsLoading: false,
    });
  });
  // tslint:disable-next-line:max-file-line-count
});

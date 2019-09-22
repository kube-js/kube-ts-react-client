import { Result } from '@js-items/foundation/dist/functions/GetItems';
import User from '../../../types/items/User';
import {
  GET_USERS_FAILED,
  GET_USERS_REQUESTED,
  GET_USERS_SUCCEEDED,
} from '../actions/index';

export const getUsersRequested = () => ({
  type: GET_USERS_REQUESTED,
});

export const getUsersSucceeded = (result: Result<User>) => ({
  payload: result,
  type: GET_USERS_SUCCEEDED,
});

export const getUsersFailed = (error: any) => ({
  payload: {
    error,
  },
  type: GET_USERS_FAILED,
});
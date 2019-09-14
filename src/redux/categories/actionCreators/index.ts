import { Result } from '@js-items/foundation/dist/functions/GetItems';
import Category from '../../../types/items/Category';
import {
  GET_CATEGORIES_FAILED,
  GET_CATEGORIES_REQUESTED,
  GET_CATEGORIES_SUCCEEDED,
} from '../actions/index';

export const getCategoriesRequested = () => ({
  type: GET_CATEGORIES_REQUESTED,
});

export const getCategoriesSucceeded = (result: Result<Category>) => ({
  payload: result,
  type: GET_CATEGORIES_SUCCEEDED,
});

export const getCategoriesFailed = (error: any) => ({
  payload: {
    error,
  },
  type: GET_CATEGORIES_FAILED,
});
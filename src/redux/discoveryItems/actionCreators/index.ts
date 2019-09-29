import Category from '../../../types/items/Category';
import Course from '../../../types/items/Course';
import User from '../../../types/items/User';
import {
  GET_DISCOVERY_ITEMS_FAILED,
  GET_DISCOVERY_ITEMS_REQUESTED,
  GET_DISCOVERY_ITEMS_SUCCEEDED,
} from '../actions/index';

export interface EnhancedCourse extends Course {
  readonly user: User;
}

export interface BestSellersResult {
  readonly courses: EnhancedCourse[];
  readonly categories: Category[];
}

export interface MostViewedResult {
  readonly courses: EnhancedCourse[];
}

export interface DiscoveryItemsResult {
  readonly bestSellers: BestSellersResult;
  readonly mostViewed: MostViewedResult;
}

export const getDiscoveryItemsRequested = () => ({
  type: GET_DISCOVERY_ITEMS_REQUESTED,
});

export const getDiscoveryItemsSucceeded = (result: DiscoveryItemsResult) => ({
  payload: result,
  type: GET_DISCOVERY_ITEMS_SUCCEEDED,
});

export const getDiscoveryItemsFailed = (error: any) => ({
  payload: {
    error,
  },
  type: GET_DISCOVERY_ITEMS_FAILED,
});

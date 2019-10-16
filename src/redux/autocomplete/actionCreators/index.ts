import Course from '../../../types/items/Course';
import User from '../../../types/items/User';
import {
  AUTOCOMPLETE_FAILED,
  AUTOCOMPLETE_REQUESTED,
  AUTOCOMPLETE_SUCCEEDED,
} from '../actions/index';

export interface AutocompleteResults {
  readonly courses: Course[];
  readonly users: User[];
}

export const autocompleteRequested = (term: string) => ({
  payload: { term },
  type: AUTOCOMPLETE_REQUESTED,
});

export const autocompleteSucceeded = (result: AutocompleteResults) => ({
  payload: result,
  type: AUTOCOMPLETE_SUCCEEDED,
});

export const autocompleteFailed = (error: any) => ({
  payload: {
    error,
  },
  type: AUTOCOMPLETE_FAILED,
});

import { toCamel } from 'convert-keys';
import { call, debounce, put } from 'redux-saga/effects';
import createApi, { Api, Options as ApiOptions } from '../../../api';
import { AUTOCOMPLETE_DEBOUNCE_TIME } from '../../../constants';
import http from '../../../services/http';
import {
  autocompleteFailed,
  AutocompleteResults,
  autocompleteSucceeded,
} from '../actionCreators';
import { AUTOCOMPLETE_REQUESTED } from '../actions';

export interface Options {
  readonly createApi: (options: ApiOptions) => Api;
}

export const autocompleteCreator = (options: Options) =>
  function* autocomplete({ payload: { term } }: { payload: { term: string } }) {
    try {
      const api = options.createApi({
        httpClient: http,
      });

      const result: AutocompleteResults = yield call(api.autocomplete as any, {
        term,
      });

      yield put(autocompleteSucceeded(toCamel(result)));
    } catch (error) {
      // FYI: https://github.com/sindresorhus/ky/issues/107
      const { message } = yield error.response.json();

      yield put(autocompleteFailed(message));
    }
  };

export const createAutocompleteSaga = (options: Options) =>
  function* autocompleteSaga() {
    yield debounce<any>(
      AUTOCOMPLETE_DEBOUNCE_TIME,
      AUTOCOMPLETE_REQUESTED,
      autocompleteCreator(options)
    );
  };

export default createAutocompleteSaga({ createApi });

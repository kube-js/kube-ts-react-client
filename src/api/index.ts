import Facade from '@js-items/foundation/dist/Facade';
import { toCamel, toSnake } from 'convert-keys';
import { ResponsePromise } from 'ky';
import config from '../config';
import {
  RegisterOptions,
  RemindPasswordOptions,
  ResendVerifyTokenOptions,
  ResetPasswordOptions,
  VerifyAccountOptions,
} from '../redux/auth/actionCreators';
import { AutocompleteResults } from '../redux/autocomplete/actionCreators';
import { CourseDetailsResult } from '../redux/courseDetails/actionCreators';
import { DiscoveryItemsResult } from '../redux/discoveryItems/actionCreators';
import http from '../services/http';
import Category from '../types/items/Category';
import Course from '../types/items/Course';
import User from '../types/items/User';
import categoriesFactory from './categories/factory';
import coursesFactory from './courses/factory';
import usersFactory from './users/factory';

export interface Options {
  readonly httpClient: typeof http;
  readonly token?: string;
}

export interface LoginOptions {
  readonly email: string;
  readonly password: string;
}

export interface AuthResponse {
  readonly user: any;
  readonly token: string;
  readonly roles: string[];
}

export interface BaseResponse {
  readonly message: string;
}

export interface AuthApi {
  readonly login: (options: LoginOptions) => Promise<AuthResponse>;
  readonly register: (options: RegisterOptions) => Promise<AuthResponse>;
  readonly remindPassword: (
    options: RemindPasswordOptions
  ) => Promise<BaseResponse>;
  readonly resetPassword: (
    options: ResetPasswordOptions
  ) => Promise<BaseResponse>;
  readonly resendVerifyToken: (
    options: ResendVerifyTokenOptions
  ) => Promise<BaseResponse>;
  readonly verifyAccount: (
    options: VerifyAccountOptions
  ) => Promise<BaseResponse>;
}

export type SearchParams =
  | string
  | { [key: string]: string | number }
  | URLSearchParams;

export type DiscoveryType = 'homepage' | 'course';
export interface BaseGetOptions {
  readonly type: DiscoveryType;
  readonly searchParams?: SearchParams;
}

export type GetDiscoveryItems<T> = (options: BaseGetOptions) => Promise<T>;

export interface AutocompleteOptions {
  readonly term: string;
}

export type Autocomplete = (
  options: AutocompleteOptions
) => Promise<AutocompleteResults>;

export interface Api {
  readonly auth: AuthApi;
  readonly categories: Facade<Category>;
  readonly courses: Facade<Course>;
  readonly users: Facade<User>;
  readonly getDiscoveryItems: GetDiscoveryItems<
    CourseDetailsResult | DiscoveryItemsResult
  >;
  readonly autocomplete: Autocomplete;
}

export const normalisePromise = <T>(promise: ResponsePromise): Promise<T> =>
  promise.json().then(toCamel as any);

const createApi = ({ httpClient, token }: Options): Api => {
  const baseConfig = {
    headers: {
      authorization: token as string,
    },
  };

  return {
    auth: {
      login: (options: LoginOptions) =>
        normalisePromise<AuthResponse>(
          httpClient.post('auth/login', { json: toSnake(options) })
        ),
      register: (options: RegisterOptions) =>
        normalisePromise<AuthResponse>(
          httpClient.post('auth/register', { json: toSnake(options) })
        ),
      remindPassword: (options: RemindPasswordOptions) =>
        normalisePromise<BaseResponse>(
          httpClient.post('auth/remind-password', { json: toSnake(options) })
        ),
      resendVerifyToken: (options: ResendVerifyTokenOptions) =>
        normalisePromise<BaseResponse>(
          httpClient.post('auth/resend-verify-token', {
            json: toSnake(options),
          })
        ),
      resetPassword: (options: ResetPasswordOptions) =>
        normalisePromise<BaseResponse>(
          httpClient.post('auth/reset-password', { json: toSnake(options) })
        ),
      verifyAccount: (options: VerifyAccountOptions) =>
        normalisePromise<BaseResponse>(
          httpClient.post('auth/verify-account', {
            json: toSnake(options),
          })
        ),
    },
    autocomplete: ({ term }: AutocompleteOptions) =>
      normalisePromise<AutocompleteResults>(
        httpClient.get('autocomplete', { searchParams: { q: term } })
      ),
    categories: categoriesFactory({
      kyConfig: {
        ...baseConfig,
        prefixUrl: config.apiUrl,
      },
    }),
    courses: coursesFactory({
      kyConfig: {
        ...baseConfig,
        prefixUrl: config.apiUrl,
      },
    }),
    getDiscoveryItems: <T>({
      searchParams,
    }: BaseGetOptions): Promise<T> =>
      normalisePromise(
        httpClient.get('discovery-items', {
          searchParams,
        })
      ),
    users: usersFactory({
      kyConfig: {
        ...baseConfig,
        prefixUrl: config.apiUrl,
      },
    }),
  };
};

// tslint:disable-next-line:max-file-line-count
export default createApi;

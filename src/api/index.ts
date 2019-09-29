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

export interface DiscoveryItemsOptions {
  readonly searchParams?: SearchParams;
}

export interface Api {
  readonly auth: AuthApi;
  readonly categories: Facade<Category>;
  readonly courses: Facade<Course>;
  readonly users: Facade<User>;
  readonly getDiscoveryItems: (
    options: DiscoveryItemsOptions
  ) => Promise<DiscoveryItemsResult>;
}

export const normalisePromise = <T>(promise: ResponsePromise): Promise<T> =>
  promise.json().then(toCamel as any);

const createApi = ({ httpClient, token }: Options): Api => {
  const baseConfig = {
    headers: {
      // TODO: extract just token into state - not `Bearer token`
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
    getDiscoveryItems: ({ searchParams }: DiscoveryItemsOptions) =>
      normalisePromise<DiscoveryItemsResult>(
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

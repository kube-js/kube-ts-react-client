import http from '../services/http';
import { RegisterOptions } from '../redux/auth/actionCreators';
import { toSnake, toCamel } from 'convert-keys';
import { ResponsePromise } from 'ky';

export interface Options {
  readonly httpClient: typeof http;
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

export interface AuthApi {
  readonly login: (options: LoginOptions) => Promise<AuthResponse>;
  readonly register: (options: RegisterOptions) => Promise<AuthResponse>;
}

export interface Api {
  readonly auth: AuthApi;
}

export const normalisePromise = <T>(promise: ResponsePromise): Promise<T> =>
  promise.json().then((response: any) => toCamel(response));

const createApi = ({ httpClient }: Options): Api => ({
  auth: {
    login: (options: LoginOptions) =>
      normalisePromise<AuthResponse>(
        httpClient.post('auth/login', { json: toSnake(options) })
      ),
    register: (options: RegisterOptions) =>
      normalisePromise<AuthResponse>(
        httpClient.post('auth/register', { json: toSnake(options) })
      ),
  },
});

export default createApi({
  httpClient: http,
});

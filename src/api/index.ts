import { toCamel, toSnake } from 'convert-keys';
import { ResponsePromise } from 'ky';
import { RegisterOptions } from '../redux/auth/actionCreators';
import http from '../services/http';

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
  promise.json().then(toCamel as any);

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

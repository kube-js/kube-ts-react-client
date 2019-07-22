import http from '../services/http';

export interface Options {
  readonly httpClient: typeof http;
}

export interface LoginOptions {
  readonly email: string;
  readonly password: string;
}

export interface LoginResponse {
  readonly user: any;
  readonly token: string;
}

export interface AuthApi {
  readonly login: (options: LoginOptions) => Promise<LoginResponse>;
}

export interface Api {
  readonly auth: AuthApi;
}

const createApi = ({ httpClient }: Options): Api => ({
  auth: {
    login: ({ email, password }: LoginOptions) =>
      httpClient.post('auth/login', { json: { email, password } }).json(),
  },
});

export default createApi({
  httpClient: http,
});

import getStringValue from '../utils/helpers/getStringValue';

export interface Config {
  apiUrl: string;
}

const config: Config = {
  apiUrl: getStringValue(
    (window as any)._env_.REACT_APP_API_URL,
    'http://localhost:9000/api/v1'
  ),
};

export default config;

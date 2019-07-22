import getStringValue from "../utils/helpers/getStringValue";

export interface Config {
  apiUrl: string;
}

const config: Config = {
  apiUrl: getStringValue(process.env.REACT_APP_API_URL, 'http://localhost:9000/api/v1'),
};

export default config;

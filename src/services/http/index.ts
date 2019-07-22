import ky from 'ky';
import config from '../../config';

const http = ky.create({ prefixUrl: config.apiUrl });

export default http;
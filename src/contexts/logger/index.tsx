import { createContext } from 'react';
import config from '../../config/index';
import loggerFactory from '../../services/logger';

const loggerFacade = loggerFactory(config.logger);

const LoggerContext = createContext(loggerFacade);

export default LoggerContext;

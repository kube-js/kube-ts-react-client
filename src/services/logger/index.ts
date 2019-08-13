import dummyFactory, { DummyLoggerOptions } from './dummy/factory';
import { LoggerFacade } from './Facade';
import sentryFactory, { SentryLoggerOptions } from './sentry/factory';

export type LoggerType = 'sentry' | 'dummy';

export interface LoggerFactoryOptions {
  readonly type: LoggerType;
  readonly sentry: SentryLoggerOptions;
  readonly dummy: DummyLoggerOptions;
}

const loggerFactory = ({ dummy, type, sentry }: LoggerFactoryOptions): LoggerFacade => {
  switch (type) {
    case 'sentry':
      return sentryFactory(sentry);
    case 'dummy':
    default:
      return dummyFactory(dummy);
  }
};

export default loggerFactory;

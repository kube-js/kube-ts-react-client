import * as Sentry from '@sentry/browser';
import { LoggerFacade, Severity } from '../Facade';

export interface SentryLoggerOptions {
  readonly dsn: string;
}

const sentryFactory = ({ dsn }: SentryLoggerOptions): LoggerFacade => {
  Sentry.init({
    dsn,
  });

  return {
    captureException: (exception: any) => Sentry.captureException(exception),
    captureMessage: (message: string, level?: Severity) =>
      Sentry.captureMessage(message, level),
  };
};

export default sentryFactory;

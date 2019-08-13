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
    captureException: (error: any, errorInfo: any) => {
      Sentry.withScope(scope => {
        scope.setExtras(errorInfo);
        Sentry.captureException(error);
      });
    },
    captureMessage: (message: string, level?: Severity) =>
      Sentry.captureMessage(message, level),
  };
};

export default sentryFactory;

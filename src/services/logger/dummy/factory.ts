// tslint:disable:no-console
import { LoggerFacade, Severity } from '../Facade';

export interface DummyLoggerOptions {
  readonly silent: boolean;
}

const dummyFactory = ({ silent }: DummyLoggerOptions): LoggerFacade => ({
  captureException: (exception: any) => silent || console.error(exception),
  captureMessage: (message: string, level?: Severity) =>
    silent ||
    console.log({
      level,
      message,
    }),
});

export default dummyFactory;

export declare enum Severity {
  Fatal = 'fatal',
  Error = 'error',
  Warning = 'warning',
  Log = 'log',
  Info = 'info',
  Debug = 'debug',
  Critical = 'critical',
}

export interface LoggerFacade {
  readonly captureMessage: (message: string, level?: Severity) => void;
  readonly captureException: (message: string) => void;
}

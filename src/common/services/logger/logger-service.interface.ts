export const LOGGER_SERVICE = Symbol('LOGGER_SERVICE');

export interface ILoggerService {
  debug(action: string, data?: object): void;
  info(action: string, data?: object): void;
  warn(action: string, data?: object): void;
  error(action: string, data?: object): void;
}

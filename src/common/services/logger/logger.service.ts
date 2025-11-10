import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { ILoggerService } from './logger-service.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService implements ILoggerService {
  constructor(@InjectPinoLogger() private readonly _logger: PinoLogger) {}

  debug = (action: string, data?: object): void => {
    if (data) {
      this._logger.debug(`${action}: ${JSON.stringify(data)}`);
      return;
    }

    this._logger.debug(`${action}`);
  };

  info = (action: string, data?: object): void => {
    if (data) {
      this._logger.info(`${action}: ${JSON.stringify(data)}`);
      return;
    }

    this._logger.info(`${action}`);
  };

  warn = (action: string, data?: object): void => {
    if (data) {
      this._logger.warn(`${action}: ${JSON.stringify(data)}`);
      return;
    }

    this._logger.warn(`${action}`);
  };

  error = (action: string, data?: object): void => {
    if (data) {
      this._logger.error(`${action}: ${JSON.stringify(data)}`);
      return;
    }

    this._logger.error(`${action}`);
  };
}

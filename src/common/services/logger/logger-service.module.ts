import { Module } from '@nestjs/common';
import { useClass } from '../../../common/helpers/use-class.helper';
import { LOGGER_SERVICE } from './logger-service.interface';
import { LoggerService } from './logger.service';
import { LoggerModule } from 'nestjs-pino';
import { ENV_SERVICE, IEnvService } from '../env/env-service.interface';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      inject: [ENV_SERVICE],
      useFactory: (_envService: IEnvService) => {
        return {
          pinoHttp: {
            transport: {
              target: 'pino-pretty',
              options: {
                singleLine: true,
                colorize: ['development'].includes(_envService.api.nodeEnv),
                ignore: 'pid,hostname,time',
              },
            },
          },
        };
      },
    }),
  ],
  providers: [useClass(LOGGER_SERVICE, LoggerService)],
  exports: [LOGGER_SERVICE],
})
export class LoggerServiceModule {}

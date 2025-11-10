import { Module } from '@nestjs/common';
import { useClass } from '../../../common/helpers/use-class.helper';
import { ENV_SERVICE } from './env-service.interface';
import { EnvService } from './env.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV
        ? `.env.${process.env.NODE_ENV}`
        : '.env.dev',
    }),
  ],
  providers: [useClass(ENV_SERVICE, EnvService)],
  exports: [ENV_SERVICE],
})
export class EnvServiceModule {}

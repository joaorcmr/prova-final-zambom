import { Global, Module } from '@nestjs/common';
import { useClass } from '../../../common/helpers/use-class.helper';
import { ENV_SERVICE } from './env-service.interface';
import { EnvService } from './env.service';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV
        ? `.env.${process.env.NODE_ENV}`
        : '.env',
    }),
  ],
  providers: [useClass(ENV_SERVICE, EnvService)],
  exports: [ENV_SERVICE],
})
export class EnvServiceModule {}

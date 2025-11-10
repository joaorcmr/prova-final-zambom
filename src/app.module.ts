import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ENV_SERVICE,
  IEnvService,
} from './common/services/env/env-service.interface';
import { CommonModule } from './common/common.module';
import { join } from 'path';
import { MovieModule } from './modules/movie/movie.module';

@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forRootAsync({
      inject: [ENV_SERVICE],
      useFactory: async (_envService: IEnvService) => {
        return {
          type: 'postgres',
          host: _envService.database.host,
          username: _envService.database.username,
          password: _envService.database.password,
          database: _envService.database.name,
          port: _envService.database.port,
          ssl:
            process.env.DATABASE_SSL === 'true'
              ? { rejectUnauthorized: false }
              : false,
          entities: [join(__dirname, './common/entities/**/*.entity{.js,.ts}')],
          synchronize: false,
          logging: false,
        };
      },
    }),
    MovieModule,
  ],
})
export class AppModule {}

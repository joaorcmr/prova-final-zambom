import { Module } from '@nestjs/common';
import { MovieServiceModule } from './services/movie-service.module';
import { MovieController } from './controllers/movie.controller';
import { CommonModule } from '../../common/common.module';

@Module({
  imports: [CommonModule, MovieServiceModule],
  controllers: [MovieController],
})
export class MovieModule {}

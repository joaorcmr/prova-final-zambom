import { Module } from '@nestjs/common';
import { MovieRepositoryModule } from 'src/common/repositories/movie/movie-repository.module';
import { MOVIE_SERVICE } from './movie-service.interface';
import { MovieService } from './movie.service';
import { useClass } from 'src/common/helpers/use-class.helper';

@Module({
  imports: [MovieRepositoryModule],
  providers: [useClass(MOVIE_SERVICE, MovieService)],
  exports: [MOVIE_SERVICE],
})
export class MovieServiceModule {}

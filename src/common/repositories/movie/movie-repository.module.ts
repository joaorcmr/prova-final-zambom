import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MOVIE_REPOSITORY } from './movie-repository.interface';
import { useClass } from 'src/common/helpers/use-class.helper';
import { MovieEntity } from 'src/common/entities/movie.entity';
import { MovieRepository } from './movie.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity])],
  providers: [useClass(MOVIE_REPOSITORY, MovieRepository)],
  exports: [MOVIE_REPOSITORY],
})
export class MovieRepositoryModule {}

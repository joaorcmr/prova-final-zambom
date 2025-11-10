import { Inject, Injectable } from '@nestjs/common';
import {
  IMovieRepository,
  MOVIE_REPOSITORY,
} from 'src/common/repositories/movie/movie-repository.interface';
import { IMovieService } from './movie-service.interface';
import { GetMoviesResponseDTO } from '../dtos/get-movies.dto';
import { DataSource } from 'typeorm';
import {
  CreateMovieRequestDTO,
  CreateMovieResponseDTO,
} from '../dtos/create-movies.dto';

@Injectable()
export class MovieService implements IMovieService {
  constructor(
    private readonly _dataSource: DataSource,
    @Inject(MOVIE_REPOSITORY)
    private readonly movieRepository: IMovieRepository,
  ) {}

  find = async (): Promise<GetMoviesResponseDTO[]> => {
    const movies = await this.movieRepository.find({});

    return movies.map((movie) => ({
      id: movie.id,
      name: movie.title,
      description: movie.description,
      rating: movie.rating,
      director: movie.director,
      createdAt: movie.createdAt,
    }));
  };

  findOne = async (id: string): Promise<GetMoviesResponseDTO> => {
    const movie = await this.movieRepository.findOne({ id });

    return {
      id: movie.id,
      name: movie.title,
      description: movie.description,
      rating: movie.rating,
      director: movie.director,
      createdAt: movie.createdAt,
    };
  };

  create = async (
    movie: CreateMovieRequestDTO,
  ): Promise<CreateMovieResponseDTO> => {
    const queryRunner = this._dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const manager = queryRunner.manager;

    try {
      const newMovie = await this.movieRepository.create(movie, { manager });
      await queryRunner.commitTransaction();

      return {
        id: newMovie.id,
        name: newMovie.title,
        description: newMovie.description,
        rating: newMovie.rating,
        director: newMovie.director,
        createdAt: newMovie.createdAt,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  };

  update = async (id: string, movie: CreateMovieRequestDTO): Promise<void> => {
    const queryRunner = this._dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const manager = queryRunner.manager;

    try {
      await this.movieRepository.update({ id }, movie, { manager });
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  };

  delete = async (id: string): Promise<void> => {
    const queryRunner = this._dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const manager = queryRunner.manager;

    try {
      await this.movieRepository.delete({ id }, { manager });
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  };
}

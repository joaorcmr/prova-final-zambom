import { MovieEntity } from '../../../common/entities/movie.entity';
import {
  DeepPartial,
  EntityManager,
  FindOptionsOrder,
  FindOptionsWhere,
} from 'typeorm';

export const MOVIE_REPOSITORY = Symbol('MOVIE_REPOSITORY');

export interface IMovieRepository {
  find(
    where: FindOptionsWhere<MovieEntity>,
    options?: {
      relations?: string[];
      manager?: EntityManager;
      order?: FindOptionsOrder<MovieEntity>;
    },
  ): Promise<MovieEntity[]>;
  findOne(
    where: FindOptionsWhere<MovieEntity>,
    options?: {
      relations?: string[];
      manager?: EntityManager;
    },
  ): Promise<MovieEntity>;
  create(
    data: DeepPartial<MovieEntity>,
    options?: { manager?: EntityManager },
  ): Promise<MovieEntity>;
  update(
    where: DeepPartial<MovieEntity>,
    data: DeepPartial<MovieEntity>,
    options?: { manager?: EntityManager },
  ): Promise<number>;
  delete(
    where: DeepPartial<MovieEntity>,
    options?: { manager?: EntityManager },
  ): Promise<number>;
}

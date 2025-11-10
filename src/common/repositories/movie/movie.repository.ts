import {
  Repository,
  FindOptionsWhere,
  EntityManager,
  DeepPartial,
  FindOptionsOrder,
} from 'typeorm';
import { IMovieRepository } from './movie-repository.interface';
import { MovieEntity } from 'src/common/entities/movie.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MovieRepository implements IMovieRepository {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly _movieRepository: Repository<MovieEntity>,
  ) {}

  find = async (
    where: FindOptionsWhere<MovieEntity>,
    options?: {
      relations?: string[];
      manager?: EntityManager;
      order?: FindOptionsOrder<MovieEntity>;
    },
  ): Promise<MovieEntity[]> => {
    const manager = options?.manager || this._movieRepository.manager;
    return manager.find(MovieEntity, {
      where,
      relations: options?.relations,
      order: options?.order,
    });
  };

  findOne = async (
    where: FindOptionsWhere<MovieEntity>,
    options?: { relations?: string[]; manager?: EntityManager },
  ): Promise<MovieEntity> => {
    const manager = options?.manager || this._movieRepository.manager;
    return manager.findOne(MovieEntity, {
      where,
      relations: options?.relations,
    });
  };

  create = async (
    data: DeepPartial<MovieEntity>,
    options?: { manager?: EntityManager },
  ): Promise<MovieEntity> => {
    const manager = options?.manager || this._movieRepository.manager;
    const entity = manager.create(MovieEntity, data);
    return manager.save(MovieEntity, entity);
  };

  update = async (
    where: DeepPartial<MovieEntity>,
    data: DeepPartial<MovieEntity>,
    options?: { manager?: EntityManager },
  ): Promise<number> => {
    const manager = options?.manager || this._movieRepository.manager;
    const { affected } = await manager.update(MovieEntity, where, data);
    return affected;
  };

  delete = async (
    where: DeepPartial<MovieEntity>,
    options?: { manager?: EntityManager },
  ): Promise<number> => {
    const manager = options?.manager || this._movieRepository.manager;
    const { affected } = await manager.delete(MovieEntity, where);
    return affected;
  };
}

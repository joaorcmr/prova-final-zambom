import { GetMoviesResponseDTO } from '../dtos/get-movies.dto';
import {
  CreateMovieRequestDTO,
  CreateMovieResponseDTO,
} from '../dtos/create-movies.dto';

export const MOVIE_SERVICE = Symbol('MOVIE_SERVICE');

export interface IMovieService {
  find(): Promise<GetMoviesResponseDTO[]>;
  findOne(id: string): Promise<GetMoviesResponseDTO>;
  create(movie: CreateMovieRequestDTO): Promise<CreateMovieResponseDTO>;
  update(id: string, movie: CreateMovieRequestDTO): Promise<void>;
  delete(id: string): Promise<void>;
}

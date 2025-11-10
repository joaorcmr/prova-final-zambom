import { Controller, Inject, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/common/guards/firebase-auth.guard';
import {
  IMovieService,
  MOVIE_SERVICE,
} from '../services/movie-service.interface';

@Controller('movies')
@UseGuards(FirebaseAuthGuard)
export class MovieController {
  constructor(
    @Inject(MOVIE_SERVICE)
    private readonly movieService: IMovieService,
  ) {}
}

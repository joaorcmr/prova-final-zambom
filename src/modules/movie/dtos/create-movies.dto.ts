export class CreateMovieRequestDTO {
  name?: string;
  description?: string;
  rating?: number;
  director?: string;
}

export class CreateMovieResponseDTO {
  id: string;
  name?: string;
  description?: string;
  rating?: number;
  director?: string;
  createdAt: Date;
}

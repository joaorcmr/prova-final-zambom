import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('movies')
export class MovieEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    name: 'created_at',
  })
  createdAt: Date;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 1,
    default: 0,
    name: 'rating',
  })
  rating: number;

  @Column({ type: 'varchar', length: 255, name: 'director' })
  director: string;
}

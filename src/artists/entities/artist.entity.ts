import { CreateArtistDto } from '../dto/create-artist.dto';
import { randomUUID } from 'crypto';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('artist')
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  constructor(createArtistDto: CreateArtistDto) {
    this.id = randomUUID();
    Object.assign(this, createArtistDto);
  }
}

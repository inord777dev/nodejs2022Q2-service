import { CreateArtistDto } from '../dto/create-artist.dto';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('artist')
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  constructor(createArtistDto: CreateArtistDto) {
    this.id = uuidv4();
    Object.assign(this, createArtistDto);
  }
}

import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from '../dto/create-track.dto';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('track')
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  artistId: string | null; // refers to Artist

  @Column()
  albumId: string | null; // refers to Album

  @Column()
  duration: number; // integer number

  constructor(createTrackDto: CreateTrackDto) {
    this.id = uuidv4();
    Object.assign(this, createTrackDto);
  }
}

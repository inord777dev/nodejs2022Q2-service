import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from '../dto/create-track.dto';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artist } from 'src/artists/entities/artist.entity';
import { Album } from 'src/albums/entities/album.entity';

@Entity('track')
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @ManyToOne(() => Artist, (artist) => artist.tracks, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artistId' })
  artist: Artist;

  @Column({ nullable: true })
  artistId: string | null;

  @ManyToOne(() => Album, (album) => album.tracks, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'albumId' })
  album: Album;

  @Column({ nullable: true })
  albumId: string | null;

  @Column()
  duration: number; // integer number

  constructor(createTrackDto: CreateTrackDto) {
    this.id = uuidv4();
    Object.assign(this, createTrackDto);
  }
}

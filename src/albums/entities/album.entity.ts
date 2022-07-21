import { CreateAlbumDto } from '../dto/create-album.dto';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';

@Entity('album')
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  year: number;

  @ManyToOne(() => Artist, (artist) => artist.albums)
  artist: Artist;

  @OneToMany(() => Track, (track) => track.album)
  tracks: Track[];

  constructor(createAlbumDto: CreateAlbumDto) {
    this.id = uuidv4();
    Object.assign(this, createAlbumDto);
  }
}

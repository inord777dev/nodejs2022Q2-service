import { CreateAlbumDto } from '../dto/create-album.dto';
import { randomUUID } from 'crypto';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('album')
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  year: number;

  @Column()
  artistId: string | null; // refers to Artist

  constructor(createAlbumDto: CreateAlbumDto) {
    this.id = randomUUID();
    Object.assign(this, createAlbumDto);
  }
}

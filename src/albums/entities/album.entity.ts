import { CreateAlbumDto } from '../dto/create-album.dto';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

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
    this.id = uuidv4();
    Object.assign(this, createAlbumDto);
  }
}

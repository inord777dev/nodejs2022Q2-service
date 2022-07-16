import { CreateAlbumDto } from '../dto/create-album.dto';
import { randomUUID } from 'crypto';

export class Album {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist

  constructor(createAlbumDto: CreateAlbumDto) {
    this.id = randomUUID();
    Object.assign(this, createAlbumDto);
  }
}

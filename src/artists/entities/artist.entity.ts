import { CreateArtistDto } from '../dto/create-artist.dto';
import { randomUUID } from 'crypto';

export class Artist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;

  constructor(createArtistDto: CreateArtistDto) {
    this.id = randomUUID();
    Object.assign(this, createArtistDto);
  }
}

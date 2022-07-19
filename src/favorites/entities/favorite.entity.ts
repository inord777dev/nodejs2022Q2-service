import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('favorite')
export class Favorite {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

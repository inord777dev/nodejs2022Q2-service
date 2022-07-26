import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('favorite')
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  // @ManyToOne(() => User, (user) => user.favorites, {
  //   onDelete: 'SET NULL',
  // })
  // @JoinColumn()
  // user: User;

  // @Column({ nullable: true })
  // userId: string;

  @ManyToMany(() => Album)
  @JoinTable()
  albums: Album[]; // favorite artists ids

  @ManyToMany(() => Artist)
  @JoinTable()
  artists: Artist[]; // favorite albums ids

  @ManyToMany(() => Track)
  @JoinTable()
  tracks: Track[]; // favorite tracks ids
}

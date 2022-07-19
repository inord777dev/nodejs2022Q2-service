import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { User } from 'src/users/entities/user.entity';
import { StoreService } from './store.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Album, Artist, Favorite, Track, User])],
  providers: [StoreService],
  exports: [StoreService],
})
export class StoreModule {}
